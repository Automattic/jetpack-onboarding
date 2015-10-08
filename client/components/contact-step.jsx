var React = require('react'),
	SiteStore = require('../stores/site-store'),
	Button = require('@automattic/dops-react/js/components/button'),
	WelcomeSection = require('./welcome-section'),
	styles = require('../styles'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSiteContactState() {
	return {
		site_title: SiteStore.getTitle(),
		contactPageURL: SiteStore.getContactPageURL()
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

	render: function() {
		if ( ! this.state.contactPageURL){
			return(
				<WelcomeSection id="welcome__layout">
					<h3>Let's launch <em>{this.state.site_title}</em></h3>
					<h4>Help visitors get in touch, great for buisnesses, blogs and personal sites</h4>

						<p style={styles.content}>Build a <em>starter</em> "Contact Us" page?
						<br/>
						<small>(requires a free Jetpack connection)</small>
					</p>

					<form style={styles.inline} onSubmit={this.handleBuildContact}>
						<Button color="green">Yes &rarr;</Button>
						</form>
						<form style={styles.inline} onSubmit={this.handleSubmit}>
						<Button>No Thanks &rarr;</Button>
					</form>
				</WelcomeSection>
			);
		} else {
			return(
				<WelcomeSection id="welcome__layout">

					<h3>Let's launch <em>{this.state.site_title}</em></h3>
					<h4>Help visitors get in touch, great for buisnesses, blogs and personal sites</h4>
					<p style={styles.content}>View your starter <a href={this.state.contactPageURL} target="_blank">Contact Us</a> page.
						<br/>
						<small>(The form requires a free Jetpack connection)</small>
					</p>
				</WelcomeSection>
			);
		}
	}
});

module.exports = ContactPageStep;