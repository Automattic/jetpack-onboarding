var React = require('react'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getJetpackState() {
	return {
		jetpackConfigured: SiteStore.getJetpackConfigured()
	};
}

var GetTrafficStep = React.createClass({
	
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
		return getJetpackState();
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		SetupProgressActions.submitTrafficStep();
	},

	handleNext: function (e) {
		e.preventDefault();
		
		SetupProgressActions.selectNextStep();
	},

	handleSkip: function (e) {
		e.preventDefault();
		SetupProgressActions.skipStep();
	},

	render: function() {
		var component;

		if ( ! this.state.jetpackConfigured ) {
			component = (
				<div className="welcome__connect">
					Enable Jetpack and connect to WordPress.com so you can publicize your content on Facebook, Twitter and more!
					<br /><br />
					<a href="#" className="download-jetpack" onClick={this.handleJetpackConnect}>Enable Jetpack</a>
					<p className="submit">
						<a className="skip" href="#" onClick={this.handleSkip}>Skip this step</a>
					</p>
				</div>
			);
		} else {
			component = (
				<div>
					//XXX TODO: enable publicize
					You have successfully connected Jetpack for stats, monitoring, and more!
					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" onClick={this.handleNext} value="Continue" />
					</p>
				</div>
			);
		}

		return (
			<div className="welcome__section" id="welcome__stats">
				<h4>Get web traffic</h4>
				{component}
			</div>
		);
	}
});

module.exports = GetTrafficStep;