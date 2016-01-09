var React = require('react'),
	Button = require('@automattic/dops-components/client/components/button'),
	SiteStore = require('stores/site-store'),
	Paths = require('../../constants/jetpack-onboarding-paths'),
	Dashicon = require('../dashicon'),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	WelcomeSection = require('../page/container');

function getSiteState() {
	return {
		site_title: SiteStore.getTitle(),
		contactUrl: SiteStore.getContactPageEditURL(),
		welcomeUrl: SiteStore.getWelcomePageEditURL(),
		newsUrl: SiteStore.getNewsPageEditURL(),
		isJPConnected: SiteStore.getJetpackConfigured(),
		layout: SiteStore.getLayout(),
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

	handleSkipTo: function( slug, event ) {
		event.preventDefault();
		SetupProgressActions.setCurrentStep( slug );
	},

	handleDismiss: function( event ) {
		event.preventDefault();
		jQuery( '#welcome-panel .welcome-panel-close' ).trigger( 'click' );
	},

	render: function() {
		let contactProps = {};
		if ( this.state.contactUrl ) {
			contactProps.href = this.state.contactUrl;
		} else {
			contactProps.href = '#';
			contactProps.onClick = this.handleSkipTo.bind(this, Paths.CONTACT_PAGE_STEP_SLUG );
		}
		return (
			<WelcomeSection id="welcome__review">
				<div className="welcome__dismiss">
					<a href="#" onClick={ this.handleDismiss }><Dashicon name="dismiss" /><span className='screen-reader-text'>Dismiss</span></a></div>

				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>
				<p className="welcome__callout welcome__review--callout">Great Work!</p>

				<div className="welcome__review-cols">
					<div className="welcome__review-col">
						<ul className="welcome__review-list">
							<li><Dashicon name="yes" /> Title and description <a href="#" onClick={ this.handleSkipTo.bind(this, Paths.SITE_TITLE_STEP_SLUG ) }>(edit)</a></li>
							<li><Dashicon name="yes" /> Homepage layout <a href="#" onClick={ this.handleSkipTo.bind(this, Paths.IS_BLOG_STEP_SLUG ) }>(edit)</a>
							{ this.state.layout !== 'blog' ?
								<ul>
									<li><a href={ this.state.welcomeUrl }>Edit your Welcome page</a></li>
								{ ( this.state.layout !== 'website' ) ?
									<li><a href={ this.state.newsUrl }>Edit your News and Updates page</a></li> : null
								}
								</ul> :
								null
							}
							</li>
							<li><Dashicon name="yes" /> <em>Contact Us</em> page <a { ...contactProps }>(edit)</a></li>
							<li><Dashicon name="yes" />
							{ this.state.isJPConnected ?
								<a href={ JPS.steps.advanced_settings.jetpack_dash }>Jetpack: </a> :
								<a href="#" onClick={ this.handleSkipTo.bind(this, Paths.JETPACK_MODULES_STEP_SLUG ) }>Connect Jetpack: </a>
							}
							increase visitors and improve security</li>
						</ul>
					</div>

					<div className="welcome__review-col welcome__review-themes">
						<img src={ `${ JPS.base_url }/img/jpo-themes.png` } />
						<p><Button href={ JPS.steps.advanced_settings.customize_url } >Customize your site</Button></p>
					</div>
				</div>
			</WelcomeSection>
		);
	}
});

module.exports = AdvancedSettingsStep;
