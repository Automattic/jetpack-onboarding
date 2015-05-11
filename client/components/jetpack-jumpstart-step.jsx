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
		var state = getJetpackState();
		state.showMoreModules = false;
		return state;
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

	handleShowMoreModules: function (e) {
		e.preventDefault();
		
		SiteActions.loadAllJetpackModules().done(function() {
			this.setState({showMoreModules: true});
		}.bind(this));
	},

	_renderModule: function(module) {
		var isActive = SiteStore.isJetpackModuleEnabled(module.slug);
		var moduleId = 'jp-module-'+module.slug;

		return (
			<div className="welcome__jumpstart_module">
				<input id={moduleId} type="checkbox" checked={isActive} data-module-slug={module.slug} onChange={this.handleChangeModuleStatus}/>
				<label htmlFor={moduleId}><strong>{module.name}</strong></label>
				<small className="jumpstart_module__description" dangerouslySetInnerHTML={{__html: module.description}}></small>
				{isActive && module.configure_url && (
					<small><a href={module.configure_url}>configure</a></small>
				)}
			</div>
		)
	},

	render: function() {
		var moduleOverlay, moduleOverlayBody;


		if ( ! this.state.jetpackConfigured ) {
			moduleOverlay = (
				<div className="welcome__jumpstart_overlay"></div>
			);
			moduleOverlayBody = (
				<div className="welcome__jumpstart_overlay__body">
					<p>These recommended modules require a connection to WordPress.com</p>
					<a href="#" className="download-jetpack" onClick={this.handleJetpackConnect}>Connect to WordPress.com</a>
					<p>
						<SkipButton />
					</p>
				</div>
			);
		}

		var moduleDescriptions = SiteStore.getJumpstartModules().map(this._renderModule.bind(this));
		var moreModuleDescriptions = SiteStore.getJetpackAdditionalModules().map(this._renderModule.bind(this))

		return (
			<div className="welcome__section">
				<h4>Enable recommended modules</h4>
				{this.state.jetpackConfigured && (
					<p className="step-description">Congratulations! You've connected your site to WordPress.com and unlocked dozens of powerful features.</p>
				)}
				<div className="welcome__connect">
					<div className="welcome__jumpstart_wrapper">
						{moduleOverlay}
						{moduleOverlayBody}
						<div className="submit" style={{textAlign: 'left', margin: '0px 10px'}}>
							<button disabled={this.state.jumpstartEnabled} className="button button-primary button-large" onClick={this.handleEnableAllModules}>{this.state.jumpstartEnabled ? 'All recommended modules active' : 'Enable recommended modules'}</button>
							<input style={{float: 'right'}} type="submit" name="save" className="button button-primary button-large" onClick={this.handleNext} value="Next Step &rarr;" />
							<div className="clear"></div>
						</div>
						<div className="welcome__jumpstart_modules">
							{moduleDescriptions}
							{! this.state.showMoreModules && (
								<p className="more">
									<a href="#" onClick={this.handleShowMoreModules}>show more</a>
								</p>
							)}
							{this.state.showMoreModules && moreModuleDescriptions}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = JetpackJumpstart;