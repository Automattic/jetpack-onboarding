var React = require('react'),
	Button = require('@automattic/dops-components/client/components/button'),
	SiteStore = require('stores/site-store'),
	Paths = require('../../constants/jetpack-onboarding-paths'),
	Dashicon = require('../dashicon'),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	WelcomeSection = require('../page/container');

function getSiteState() {
	return {
		site_title: SiteStore.getTitle()
	};
}

var AdvancedSettingsStep = React.createClass({

	getInitialState: function() {
		return getSiteState();
	},

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSiteState());
	},

	handleSkipTo: function( slug ) {
		return function( event ) {
			event.preventDefault();
			SetupProgressActions.skipToStep( slug );
		};
	},

	handleDismiss: function( event ) {
		event.preventDefault();
		jQuery( '#welcome-panel .welcome-panel-close' ).trigger( 'click' );
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__review">
				<div className="welcome__dismiss"><a href="#" onClick={ this.handleDismiss }><Dashicon name="dismiss" /> Dismiss</a></div>

				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>
				<p className="welcome__callout welcome__review--callout">Great Work!</p>

				<div className="welcome__review-cols">
					<div className="welcome__review-col">
						<ul className="welcome__review-list">
							<li><Dashicon name="yes" /> Navigation and description <a href="#" onClick={ this.handleSkipTo( Paths.SITE_TITLE_STEP_SLUG ) }>(edit)</a></li>
							<li><Dashicon name="yes" /> Homepage layout <a href="#" onClick={ this.handleSkipTo( Paths.IS_BLOG_STEP_SLUG ) }>(edit)</a></li>
							<li><Dashicon name="yes" /> <em>Contact Us</em> page <a href="#" onClick={ this.handleSkipTo( Paths.CONTACT_PAGE_STEP_SLUG ) }>(edit)</a></li>
							<li><Dashicon name="yes" /> Jetpack <a href="#" onClick={ this.handleSkipTo( Paths.JETPACK_MODULES_STEP_SLUG ) }>(edit)</a></li>
						</ul>
					</div>

					<div className="welcome__review-col welcome__review-themes">
						<img src={ `${ JPS.base_url }/img/review__themes.png` } />
						<p><Button href={ JPS.steps.advanced_settings.themes_url } primary>Choose a Theme</Button></p>
					</div>
				</div>
			</WelcomeSection>
		);
	}
});

module.exports = AdvancedSettingsStep;