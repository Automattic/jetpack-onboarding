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
		state.jetpackConnecting = false;
		return state;
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		this.setState( { jetpackConnecting: true } );
		SiteActions
			.configureJetpack( Paths.REVIEW_STEP_SLUG )
			.always(function() {
				this.setState( { jetpackConnecting: false } );
			}.bind( this ) );
	},

	handleNext: function (e) {
		e.preventDefault();

		SetupProgressActions.completeAndNextStep(Paths.JETPACK_MODULES_STEP_SLUG);
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__jetpack">
				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>
				<p className="welcome__callout welcome__jetpack--callout">Connect your Jetpack profile to improve security, track stats, and grow traffic</p>
				{ this.state.jetpackConfigured ?
					<div>
						<p>Congratulations! You&apos;ve enabled Jetpack and unlocked dozens of powerful features.</p>
						<p><a href={ this.state.settingsUrl }>Check out the settings page…</a></p>
						<div className="welcome__submit">
							<Button primary onClick={this.handleNext}>Next Step</Button>
						</div>
					</div> :
					<div className='welcome__submit'>
						<Button disabled={this.state.jetpackConnecting} onClick={ this.handleJetpackConnect } primary>{ this.state.jetpackConnecting ? 'Connecting' : 'Connect' } to WordPress.com</Button>
						{ !this.state.jetpackConnecting && <SkipButton /> }
					</div>
				}
			</WelcomeSection>
		);
	}
});

module.exports = JetpackJumpstart;
