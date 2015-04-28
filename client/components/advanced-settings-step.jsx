var React = require('react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<div className="welcome__section" id="welcome__advanced">
				<h4>Advanced settings</h4>

				<ul className="welcome__advanced">
					<li>
						<h5>Configure Jetpack Settings</h5>
						View all Jetpack features like customization tools, enhanced security, speed boosts, and more.
						<br />
						<a className="button button-primary button-large" href="#">View Jetpack features</a>
					</li>

					<li>
						<h5>Add Widgets</h5>
						Choose what you’d like visitors to see in your sidebar: Twitter feed, archives, and more...
						<br />
						<a className="button button-primary button-large" href="#">Manage Widgets</a>
					</li>

					<li>
						<h5>Fine Tune Your Site</h5>
						Customize your site’s colors, fonts, frontpage and other settings. Or completely change your theme!
						<br />
						<a className="button button-primary button-large" href="#">Customize</a>
					</li>

					<li>
						<h5>Create a Portfolio</h5>
						Starting an online portfolio is as straightforward as checking an option in your dashboard. 
						<br />
						<a className="button button-primary button-large" href="http://en.blog.wordpress.com/2014/04/11/portfolios-on-wordpress-com/" target="_blank">Learn how</a>
					</li>
				</ul>

			</div>
		);
	}
});