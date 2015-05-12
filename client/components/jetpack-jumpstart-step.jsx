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
		e.preventDefault();
		var $target = jQuery(e.currentTarget),
			module = $target.data('module-slug');

		if ( SiteStore.isJetpackModuleEnabled(module) ) {
			console.log("deactivating "+module);
			SiteActions.deactivateJetpackModule(module);
		} else {
			console.log("activating "+module);
			SiteActions.activateJetpackModule(module);
		}
	},

	handleEnableAllModules: function(e) {
		e.preventDefault();
		e.stopPropagation();
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

	handleShowFewerModules: function (e) {
		e.preventDefault();
		this.setState({showMoreModules: false});
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
					<small><a target="_configure" href={module.configure_url}>configure</a></small>
				)}
			</div>
		)
	},

	render: function() {
		console.log("rendered");
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

		var moduleDescriptions = SiteStore.getJumpstartModules().map(this._renderModule);
		var moreModuleDescriptions = SiteStore.getJetpackAdditionalModules().map(this._renderModule);

		return (
			<div className="welcome__section">
				<h4>Enable popular features</h4>
				{this.state.jetpackConfigured && (
					<div>
						<span className="jetpack-logo">Powered by<br /><a href="http://192.168.59.103/wp-admin/admin.php?page=jetpack" title="Jetpack" className="current"><span>Jetpack</span></a></span>
						<p className="step-description">Congratulations! You've connected your site to WordPress.com and unlocked dozens of powerful features.</p>
						<p className="step-description">We've highlighted some of the most popular WordPress-connected modules for you.</p>
					</div>
				)}
				<div className="welcome__connect">
					<div className="welcome__jumpstart_wrapper">
						{moduleOverlay}
						{moduleOverlayBody}
						
						<div className="submit">
							<input style={{float: 'right'}} type="submit" name="save" className="button button-primary button-large" onClick={this.handleNext} value="Next Step &rarr;" />
							<div className="clear"></div>
						</div>

						<div className="welcome__jumpstart_modules">
							
							<div className="modules">
								<h3>Popular modules
									&nbsp;&nbsp;<button disabled={this.state.jumpstartEnabled} className="button button-primary" onClick={this.handleEnableAllModules}>{this.state.jumpstartEnabled ? 'Enabled' : 'Enable all (recommended)'}</button>
								</h3>

								<div className="inside">
									{moduleDescriptions}
									<div className="clear"></div>
								</div>
							</div>
							
							{this.state.showMoreModules ? (
								<p className="more">
									<a href="#" onClick={this.handleShowFewerModules}>hide additional modules</a>
								</p>
							) : (
								<p className="more">
									<a href="#" onClick={this.handleShowMoreModules}>show additional modules</a>
								</p>
							)}

							{this.state.showMoreModules && (
								<div className="modules">
									<h3>Additional modules</h3>
									<div className="inside">
										{moreModuleDescriptions}
										<div className="clear"></div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = JetpackJumpstart;