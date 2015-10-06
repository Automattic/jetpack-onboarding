var React = require('react'),
	SiteStore = require('../stores/site-store'),
	Button = require('@automattic/dops-react/js/components/button'),
	WelcomeSection = require('./welcome-section'),
	styles = require('../styles'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSiteLayoutState() {
	return {
		site_title: SiteStore.getTitle()
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
    	this.setState(getSiteLayoutState());
  	},

	getInitialState: function() {
		return getSiteLayoutState();
	},

	handleSetLayout: function( e ) {
		this.setState({ layout: jQuery(e.currentTarget).val() });
	},

	handleSubmit: function( e ) {
		e.preventDefault();
		SetupProgressActions.submitLayoutStep(this.state.layout);
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__layout">
			
				<h3>Let's launch <em>{this.state.site_title}</em></h3>
				<h4>Help visitors get in touch, great for buisnesses, blogs and personal sites</h4>
				<p style={styles.content}>Jetpack site customization tools <small>(requires a free Jetpack connection)</small></p>

				<form onSubmit={this.handleSubmit}>
					<label>
						<input type="checkbox" name="contact_page" checked="checked" onChange={this.handleSetLayout}/> Build a starter "Contact Us" page
					</label>
					<br/>

					<p className="submit">
						<Button color="blue">Next Step &rarr;</Button>
					</p>
				</form>
			</WelcomeSection>
		);
	}
});

module.exports = ContactPageStep;