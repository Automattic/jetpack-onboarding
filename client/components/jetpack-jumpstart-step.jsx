var React = require('react'),
	SkipButton = require('./skip-button'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	Paths = require('../constants/jetpack-start-paths'), 
	ContentBox = require('./content-box'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	SpinnerStore = require('../stores/spinner-store'),
	Button = require('@automattic/dops-react/js/components/button');

function getJetpackState() {
	return {
		site_title: SiteStore.getTitle(),
		jetpackConfigured: SiteStore.getJetpackConfigured(),
		jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled(),
		modulesEnabled: SiteStore.getActiveModuleSlugs()	
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

	handleChangeModuleStatus: function (e) {
		var $target = jQuery(e.currentTarget),
			module_slug = $target.data('module-slug');

		if ( SiteStore.isJetpackModuleEnabled(module_slug) ) {
			SiteActions.deactivateJetpackModule(module_slug);
		} else {
			SiteActions.activateJetpackModule(module_slug);
		}
	},

	handleEnableAllModules: function(e) {
		e.preventDefault();
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
			<div key={'modules-'+module.slug} className="welcome__jumpstart_module">
				<input id={moduleId} type="checkbox" checked={isActive} data-module-slug={module.slug} onChange={this.handleChangeModuleStatus}/>
				<label htmlFor={moduleId}><strong>{module.name}</strong></label>
				<small className="jumpstart_module__description" dangerouslySetInnerHTML={{__html: module.description}}></small>
				{isActive && module.configure_url && (
					<small><a target="_configure" href={module.configure_url}>configure</a></small>
				)}
			</div>
		);
	},

	render: function() {
		var moduleOverlay, moduleOverlayBody;


		if ( ! this.state.jetpackConfigured && !SpinnerStore.showing() ) {
			moduleOverlay = (
				<div className="welcome__jumpstart_overlay"></div>
			);
			moduleOverlayBody = (
				<div className="welcome__jumpstart_overlay__body">
					<p>These modules require a WordPress.com account - it's free!</p>
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
				<h3>Let's launch <em>{this.state.site_title}</em></h3>
				<h4>Enable Jetpack features</h4>
				{this.state.jetpackConfigured && (
					<div>
						<span className="jetpack-logo">Powered by<br /><a href="http://192.168.59.103/wp-admin/admin.php?page=jetpack" title="Jetpack" className="current"><span>Jetpack</span></a></span>
						<p className="step-description">Congratulations! You've enabled Jetpack and unlocked dozens of powerful features.</p>
						<p className="step-description">Check the boxes below to enable our most popular features.</p>
					</div>
				)}
				<div className="welcome__connect">
					<div className="welcome__jumpstart_wrapper">
						{moduleOverlay}
						{moduleOverlayBody}
						
						{this.state.jetpackConfigured && (
							<div className="submit">
								<Button style={{float: 'right'}} color="blue" onClick={this.handleNext}>Next Step &rarr;</Button>
								<div className="clear"></div>
							</div>
						)}

						<ContentBox>
							<h3>Popular features

								&nbsp;&nbsp;<Button disabled={this.state.jumpstartEnabled} color="blue" onClick={this.handleEnableAllModules}>{this.state.jumpstartEnabled ? 'Enabled' : 'Enable all (recommended)'}</Button>
							</h3>
							{moduleDescriptions}
						</ContentBox>
						
						{this.state.showMoreModules ? (
							<p className="more">
								<a href="#" onClick={this.handleShowFewerModules}>hide additional features</a>
							</p>
						) : (
							<p className="more">
								<a href="#" onClick={this.handleShowMoreModules}>show additional features</a>
							</p>
						)}

						{this.state.showMoreModules && (
							<ContentBox>
								<h3>Additional modules</h3>
								{moreModuleDescriptions}
							</ContentBox>
						)}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = JetpackJumpstart;