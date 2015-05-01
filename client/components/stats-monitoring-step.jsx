var React = require('react'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions');

var StatsMonitoringStep = React.createClass({

	getInitialState: function() {
		return {
			jetpackConfigured: SiteStore.getJetpackConfigured()
		};
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		SiteActions.configureJetpack();
	},

	render: function() {
		var component;

		if ( ! this.state.jetpackConfigured ) {
			component = (
				<div className="welcome__connect">
					Enable Jetpack and connect to WordPress.com for powerful analytics and site monitoring.
					<br /><br />
					<a href="#" className="download-jetpack" onClick={this.handleJetpackConnect}>Enable Jetpack</a>
					<p className="submit">
						<a className="skip" href="#">Skip this step</a>
					</p>
				</div>
			);
		} else {
			component = (
				<div>
					You have successfully connected Jetpack for stats, monitoring, and more!
					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" value="Continue" />
					</p>
				</div>
			);
		}

		return (
			<div className="welcome__section" id="welcome__stats">
				<h4>Enable stats and monitoring</h4>
				{component}
			</div>
		);
	}
});

module.exports = StatsMonitoringStep;