var React = require('react'),
	SiteStore = require('../stores/site-store');

var AdvancedSettingsStep = React.createClass({

	render: function() {
		return (
			<div className="welcome__section" id="welcome__advanced">
				<h4>Advanced settings</h4>

				<ul className="welcome__advanced">
					<li>
						<h5>Fine-tune your site's layout and appearance</h5>
						Customize your site’s colors, fonts, sidebars and other settings.
						<br />
						<a className="button button-primary button-large" href={JPS.steps.advanced_settings.customize_url}>Customize my site</a>
						&nbsp;
						&nbsp;
						<a className="button button-primary button-large" href={JPS.steps.advanced_settings.themes_url}>Browse and add themes</a>
						
					</li>
					{(SiteStore.getLayout() == 'blog' || SiteStore.getLayout() == 'site-blog') && (
						<li>
							<h5>Create your first blog post</h5>
							An epic essay or just "Hello World!"
							<br />
							<a className="button button-primary button-large" href={JPS.steps.advanced_settings.new_blog_post_url}>Write a new blog post</a>
							&nbsp;&nbsp;
							<a className="button button-primary button-large" href={JPS.steps.advanced_settings.manage_posts_url}>Manage posts</a>
						</li>
					)}
					<li>
						<h5>Create a static page</h5>
						"About me", "Our Services" or anything else you can imagine.
						<br />
						<a className="button button-primary button-large" href={JPS.steps.advanced_settings.new_page_url}>Create a new page</a>
						&nbsp;&nbsp;
						<a className="button button-primary button-large" href={JPS.steps.advanced_settings.manage_pages_url}>Manage pages</a>
					</li>
					<li>
						<h5>Extend your site's functionality</h5>
						WordPress offers thousands of plugins from Jetpack and the WordPress community.
						<br />
						<a className="button button-primary button-large" href={JPS.steps.advanced_settings.plugins_url}>Manage plugins</a>
						&nbsp;
						&nbsp;
						{SiteStore.getJetpackConfigured() && (
							<a className="button button-primary button-large" href={JPS.steps.advanced_settings.jetpack_modules_url}>Manage Jetpack modules</a>
						)} 
					</li>
					<li>
						<h5>Learn more</h5>
						<a href="https://codex.wordpress.org/First_Steps_With_WordPress">First Steps with WordPress</a> - an online guide from the creators of WordPress
					</li>
				</ul>
			</div>
		);
	}
});

module.exports = AdvancedSettingsStep;