var React = require( 'react' ),
	SiteStore = require( 'stores/site-store' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	WelcomeSection = require( '../page/container' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' );

function getSiteContactState() {
	return {
		site_title: SiteStore.getTitle(),
		contactPageURL: SiteStore.getContactPageURL(),
		contactPageScreenshot : `${ JPS.base_url }/img/jpo-contact.jpg`
	};
}

var ContactPageStep = React.createClass( {

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getSiteContactState() );
	},

	getInitialState: function() {
		return getSiteContactState();
	},

	handleBuildContact: function( e ) {
		e.preventDefault();
		SetupProgressActions.createContactPage();
	},

	handleSubmit: function( e ) {
		e.preventDefault();
		SetupProgressActions.skipContactPageBuild();
	},

	handleContinue: function( e ) {
		e.preventDefault();
		SetupProgressActions.selectNextStep();
	},

	render: function() {
		return(
			<WelcomeSection id="welcome__contact">
				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>

				{ this.state.contactPageURL ?
					this._renderWithContactPage() :
					this._renderWithoutContactPage()
				}
			</WelcomeSection>
		);
	},

	_renderWithContactPage: function() {
		return (
			<div>
				<p className="welcome__callout welcome__contact--callout welcome__contact-exists--callout">View your starter <a href={ this.state.contactPageURL } target="_blank">Contact Us</a> page.</p>
				<p className="welcome__contact-submit">
					<Button primary onClick={ this.handleContinue }>Next Step &rarr;</Button>
				</p>
			</div>
		);
	},

	_renderWithoutContactPage: function() {
		return (
			<div className="welcome__contact">
				<p className="welcome__callout welcome__contact--callout welcome__contact-build--callout">Build a <em>starter</em> "Contact Us" page?</p>
				<img src={ this.state.contactPageScreenshot } />
				<div className="welcome__submit">
					<Button primary onClick={ this.handleBuildContact }>Yes</Button>
					<Button onClick={ this.handleSubmit }>No Thanks</Button>
				</div>
			</div>
		);
	}
});

module.exports = ContactPageStep;
