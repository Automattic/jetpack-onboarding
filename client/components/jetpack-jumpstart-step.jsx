var React = require('react'),
	Radium = require('radium'),
	SkipButton = require('./skip-button'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	Paths = require('../constants/jetpack-onboarding-paths'), 
	ContentBox = require('./content-box'),
	styles = require('../styles'),
	WelcomeSection = require('./welcome-section'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	SpinnerStore = require('../stores/spinner-store'),
	Button = require('@automattic/dops-components/client/components/button');


var JetpackLogo = React.createClass({
	styles: {
		jetpackLogoWrapper: {
			display: 'block',
			textAlign: 'center',
			height: 70,
			color: 'white',
			marginLeft: 5,
			backgroundColor: '#81a844'
		},
		jetpackLogo: {
			display: 'inline-block',
			position: 'relative',
			width: 214,
			marginRight: 6,
			background: 'url('+JPS.jetpack.logo_url+') center center no-repeat',
			backgroundSize: '183px auto',
			color: '#fff',
			fontWeight: 'normal',
			padding: '5px 0px'
		},
		jetpackLogoName: {
			textIndent: -9999,
			visibility: 'hidden'
		}

	},

	render: function() {
		return (
			<span style={[this.styles.jetpackLogoWrapper, this.props.style]}>
				Powered by<br />
				<a href="/wp-admin/admin.php?page=jetpack" title="Jetpack" style={this.styles.jetpackLogo}>
					<span style={this.styles.jetpackLogoName}>Jetpack</span>
				</a>
			</span>
		);
	}
});

JetpackLogo = Radium(JetpackLogo);

function getJetpackState() {
	return {
		site_title: SiteStore.getTitle(),
		jetpackConfigured: SiteStore.getJetpackConfigured(),
		jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled(),
		modulesEnabled: SiteStore.getActiveModuleSlugs()	
	};
}

var JetpackJumpstart = React.createClass({

	styles: {
		jetpackLogo: {
			float: 'right',
			'@media (max-width: 782px)': {
				float: 'none',
				marginLeft: 0
			}
		},
		jumpstartModule: {
			float: 'left',
			position: 'relative',
			height: 160,
			padding: 10,
			'@media (min-width: 782px)': {
				width: '33%'
			}
		},

		jumpstartModuleDesc: {
			display: 'block',
			marginTop: 5,
			lineHeight: '150%'
		},

		overlayContent: {
			marginTop: 10,
			marginBottom: 10
		},

		overlayBefore: {
			display: 'block',
			position: 'absolute',
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0,0,0,0.2)'
		},

		overlay: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			minHeight: '100%',
			zIndex: 700
		},

		overlayBody: {
			textAlign: 'center',
			position: 'absolute',
			borderRadius: 3,
			boxShadow: '0 0 4px rgba(0,0,0,0.2)',
			zIndex: 800,
			left: '50%',
		  	top: '50%',
		  	padding: 15,
		  	transform: 'translate(-50%,-50%)',
			width: '70%',
			backgroundColor: '#fff'
		},

		moreLink: {
			textAlign: 'center'
		}
	},

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
			<div key={'modules-'+module.slug} style={this.styles.jumpstartModule}>
				<input id={moduleId} type="checkbox" checked={isActive} data-module-slug={module.slug} onChange={this.handleChangeModuleStatus}/>
				<label htmlFor={moduleId}><strong>{module.name}</strong></label>
				<div style={this.styles.jumpstartModuleDesc}>
					<div dangerouslySetInnerHTML={{__html: module.description}}></div>
					{isActive && module.configure_url && (
						<div><a target="_configure" href={module.configure_url}>configure</a></div>
					)}
				</div>
			</div>
		);
	},

	render: function() {
		var moduleOverlayBefore, moduleOverlay, moduleOverlayBody;


		if ( ! this.state.jetpackConfigured && !SpinnerStore.showing() ) {
			moduleOverlayBefore = (
				<div style={this.styles.overlayBefore}></div>
			);
			moduleOverlay = (
				<div style={this.styles.overlay}></div>
			);
			moduleOverlayBody = (
				<div style={this.styles.overlayBody}>
					<p style={this.styles.overlayContent}>These modules require a WordPress.com account - it's free!</p>
					<Button color="green" size="big" theme="jetpack" onClick={this.handleJetpackConnect}>Connect to WordPress.com</Button>
					<p style={this.styles.overlayContent}>
						<SkipButton />
					</p>
				</div>
			);
		}

		var moduleDescriptions = SiteStore.getJumpstartModules().map(this._renderModule);
		var moreModuleDescriptions = SiteStore.getJetpackAdditionalModules().map(this._renderModule);

		return (
			<WelcomeSection>
				<h3>Let's launch <em>{this.state.site_title}</em></h3>
				<h4>Enable Jetpack features</h4>
				{this.state.jetpackConfigured && (
					<div>
						<JetpackLogo style={this.styles.jetpackLogo}/>
						<p style={styles.content}>Congratulations! You've enabled Jetpack and unlocked dozens of powerful features.</p>
						<p style={styles.content}>Check the boxes below to enable our most popular features.</p>
						<div className="clear"></div>
					</div>
				)}
				<div className="welcome__connect">
					<div style={{position: 'relative'}}>
						{moduleOverlayBefore}
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
								&nbsp;&nbsp;<Button disabled={this.state.jumpstartEnabled} color="blue" onClick={this.handleEnableAllModules}>{this.state.jumpstartEnabled ? 'Enabled All' : 'Enable all (recommended)'}</Button>
							</h3>
							{moduleDescriptions}
						</ContentBox>
						
						{this.state.showMoreModules ? (
							<p style={this.styles.moreLink}>
								<a href="#" onClick={this.handleShowFewerModules}>hide additional features</a>
							</p>
						) : (
							<p style={this.styles.moreLink}>
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
			</WelcomeSection>
		);
	}
});

module.exports = Radium(JetpackJumpstart);