var React = require('react'),
	SiteStore = require('../stores/site-store'),
	Button = require('@automattic/dops-components/client/components/button'),
	WelcomeSection = require('./welcome-section'),
	styles = require('../styles'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSiteContactState() {
	return {
		site_title: SiteStore.getTitle(),
		contactPageURL: SiteStore.getContactPageURL(),
		contactPageScreenshot : JPS.base_url + "/img/contact-us-screenshot.png"
	};
}

var ContactPageStep = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSiteContactState());
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
			<WelcomeSection id="welcome__layout">
				<h3>Let's launch <em>{this.state.site_title}</em></h3>
				<h4>Help visitors get in touch, great for businesses, blogs and personal sites</h4>

				{ this.state.contactPageURL ? 
					(this._renderWithContactPage()) : 
					(this._renderWithoutContactPage())
				}
			</WelcomeSection>
		);
	},

	_renderWithContactPage: function() {
		return (
			<div>
				View your starter <a href={this.state.contactPageURL} target="_blank">Contact Us</a> page.
				<br/>
				<small>(The form requires a free Jetpack connection)</small>
				<p className="submit">
					<Button color="blue" onClick={this.handleContinue}>Next Step &rarr;</Button>
				</p>
			</div>
		);
	},

	_renderWithoutContactPage: function() {
		return (
			<div>
				<img style={styles.screenshot} src={this.state.contactPageScreenshot} />
				<p style={styles.content}>Build a <em>starter</em> "Contact Us" page?
					<br/>
					<small>(requires a free Jetpack connection)</small>
				</p>

				<Button color="green" style={{ marginRight: 15 }} onClick={this.handleBuildContact}>Yes</Button>
				<Button onClick={this.handleSubmit}>No Thanks</Button>
			</div>
		);
	}
});

module.exports = ContactPageStep;