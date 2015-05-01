var React = require('react'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions');

var GetTrafficStep = React.createClass({

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
					Enable Jetpack and connect to WordPress.com so you can publicize your content on Facebook, Twitter and more!
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
					//XXX TODO: enable publicize
					You have successfully connected Jetpack for stats, monitoring, and more!
					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" value="Continue" />
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