var React = require('react'),
	SiteStore = require('../stores/site-store'),
	Button = require('@automattic/dops-components/client/components/button'),
	WelcomeSection = require('./welcome-section'),
	styles = require('../styles'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSiteLayoutState() {
	return {
		site_title: SiteStore.getTitle(),
		layout: SiteStore.getLayout()
	};
}

var LayoutStep = React.createClass({

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
				<h4>Are you going to update your site with news or blog posts?</h4>
				<form onSubmit={this.handleSubmit}>

					<p className="submit">
						<Button>Nope</Button>
						<Button color="green">Yes</Button>
					</p>
				</form>
			</WelcomeSection>
		);
	}
});

module.exports = LayoutStep;