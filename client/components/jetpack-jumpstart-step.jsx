var React = require('react'),
	SkipButton = require('./skip-button.jsx'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	Paths = require('../constants/jetpack-start-paths'), 
	SetupProgressActions = require('../actions/setup-progress-actions');

function getJetpackState() {
	return {
		jetpackConfigured: SiteStore.getJetpackConfigured(),
		jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled()
	};
}

var JetpackJumpstart = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getJetpackState());
  	},

	getInitialState: function() {
		return getJetpackState();
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		SiteActions.configureJetpack(Paths.JETPACK_MODULES_STEP_SLUG);
	},

	handleEnableJumpstart: function (e) {
		e.preventDefault();

		SetupProgressActions.submitJetpackJumpstart();
	},

	handleChangeModuleStatus: function (e) {
		var $target = jQuery(e.currentTarget),
			module = $target.data('module-slug');

		if ( SiteStore.isJetpackModuleEnabled(module) ) {
			SiteActions.deactivateJetpackModule(module);
		} else {
			SiteActions.activateJetpackModule(module);
		}
	},

	handleEnableAllModules: function(e) {
		SiteActions.enableJumpstart();
	},

	handleNext: function (e) {
		e.preventDefault();

		SetupProgressActions.completeAndNextStep(Paths.JETPACK_MODULES_STEP_SLUG);
	},

	render: function() {
		var moduleOverlay, moduleOverlayBody;


		if ( ! this.state.jetpackConfigured ) {
			moduleOverlay = (
				<div className="welcome__jumpstart_overlay"></div>
			);
			moduleOverlayBody = (
				<div className="welcome__jumpstart_overlay__body">
					<p>To enable modules, first click the button below to connect your site to WordPress.com</p>
					<a href="#" className="download-jetpack" onClick={this.handleJetpackConnect}>Connect to WordPress.com</a>
					<p>
						<SkipButton />
					</p>
				</div>
			);
		}

		var moduleDescriptions = SiteStore.getJumpstartModules().map( function (module) {
			
			var isActive = SiteStore.isJetpackModuleEnabled(module.slug);

			return (
				<div className="welcome__jumpstart_module">
					<input type="checkbox" checked={isActive} data-module-slug={module.slug} onChange={this.handleChangeModuleStatus}/>
					<strong>{module.name}</strong>
					<small className="jumpstart_module__description" dangerouslySetInnerHTML={{__html: module.description}}></small>
				</div>
			)
		}.bind(this));

		return (
			<div className="welcome__section">
				<h4>Enable recommended modules</h4>
				<div className="welcome__connect">
					<div className="welcome__jumpstart_wrapper">
						{moduleOverlay}
						{moduleOverlayBody}
						<div style={{textAlign: 'left', margin: '0px 10px'}}>
							<button disabled={this.state.jumpstartEnabled} className="button button-primary button-large" onClick={this.handleEnableAllModules}>{this.state.jumpstartEnabled ? 'All modules active' : 'Enable recommended modules'}</button>
							<input style={{float: 'right'}} type="submit" name="save" className="button button-primary button-large" onClick={this.handleNext} value="Next Step &rarr;" />
							<div className="clear"></div>
						</div>
						<div className="welcome__jumpstart_modules">
							{moduleDescriptions}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = JetpackJumpstart;