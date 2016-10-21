var React = require('react'),
	SkipButton = require('../skip-button'),
	SiteStore = require('stores/site-store'),
	SiteActions = require('actions/site-actions'),
	Paths = require('../../constants/jetpack-onboarding-paths'),
	ContentBox = require('../page/section'),
	WelcomeSection = require('../page/container'),
	SetupProgressActions = require('actions/setup-progress-actions'),
	SpinnerStore = require('stores/spinner-store'),
	Button = require('@automattic/dops-components/client/components/button');

function getJetpackState() {
	return {
		site_title: SiteStore.getTitle(),
		jetpackConfigured: SiteStore.getJetpackConfigured(),
		jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled(),
		modulesEnabled: SiteStore.getActiveModuleSlugs(),
		settingsUrl: SiteStore.getJetpackSettingsUrl()
	};
}

var JetpackJumpstart = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getJetpackState() );
	},

	getInitialState: function() {
		var state = getJetpackState();
		state.showMoreModules = false;
		state.jetpackConnecting = false;
		return state;
	},

	handleJetpackConnect: function( event ) {
		event.preventDefault();
		const path = JPS.bloginfo.type === 'business' ?
			Paths.BUSINESS_ADDRESS_SLUG :
			Paths.REVIEW_STEP_SLUG;

		this.setState( { jetpackConnecting: true } );
		SiteActions
			.configureJetpack( path )
			.always(function() {
				this.setState( { jetpackConnecting: false } );
			}.bind( this ) );
	},

	handleNext: function( event ) {
		event.preventDefault();
		SetupProgressActions.completeStepNoRecord( Paths.JETPACK_MODULES_STEP_SLUG );
		SetupProgressActions.selectNextStep();
	},

	handleSkip: function() {
		SetupProgressActions.skipStep();
		if ( JPS.bloginfo.type !== 'business' ) {
			return SetupProgressActions.setCurrentStep( Paths.REVIEW_STEP_SLUG );
		}
		return SetupProgressActions.setCurrentStep( Paths.BUSINESS_ADDRESS_SLUG );
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__jetpack">
				<h1>Let&apos;s launch <em>{ this.state.site_title }</em></h1>
				<p className="welcome__callout welcome__jetpack--callout">
					Connect your Jetpack profile to improve security, track stats, and grow traffic
				</p>
				{
					this.state.jetpackConfigured
						?	<div>
								<p>Congratulations! You&apos;ve enabled Jetpack and unlocked dozens of powerful features.</p>
								<p><a href={ this.state.settingsUrl }>Check out the settings page…</a></p>
								<div className="welcome__submit">
									<Button primary onClick={ this.handleNext }>Next Step</Button>
								</div>
							</div>
						:	<div className='welcome__submit'>
								<Button
									disabled={ this.state.jetpackConnecting }
									onClick={ this.handleJetpackConnect }
									primary>
									{ this.state.jetpackConnecting ? 'Connecting' : 'Connect' } to WordPress.com
								</Button>
								{ ! this.state.jetpackConnecting && <SkipButton handleSkip={ this.handleSkip } /> }
							</div>
				}
				<div className='jetpack_connect_info'>
					<h2>Grow and Track Your Community</h2>
					<img src={ `${ JPS.base_url }/img/stats-example-sm.png` } />
					<p>Jetpack provides Stats, insights and visitor information.</p>
					<p>Use Jetpack tools like Publicize, Sharing, Subscribing and Related Posts to increase traffic, and onsite engagement.</p>
				</div>
				<div className='jetpack_connect_info'>
					<h2>Increase Security and Site Speed</h2>
					<img src={ `${ JPS.base_url }/img/feature-photon-sm.jpg` } />
					<p>Gain peace of mind with Protect, the tool that has blocked billions of login attacks on millions of sites.</p>
					<p>Photon utilizes the state-of-the-art WordPress.com content delivery network to load your gorgeous images super fast optimized for any device, and it’s completely free.</p>
				</div>
			</WelcomeSection>
		);
	}
});

module.exports = JetpackJumpstart;
