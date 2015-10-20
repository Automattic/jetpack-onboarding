var React = require('react'),
	Button = require('@automattic/dops-components/client/components/button'),
	SiteStore = require('../stores/site-store'),
	WelcomeSection = require('./welcome-section');

function getSiteState() {
	return {
		site_title: SiteStore.getTitle()
	};
}

var SettingsItem = React.createClass({
	styles: {
		item: {
			padding: '1em',
			marginBottom: '1em',
			listStyle: 'none',
			background: '#f5f5f5',
			border: '1px solid #ddd'
		},

		heading: {
			margin: 0,
			fontSize: '1.2em',
			fontWeight: 800
		}
	},

	render: function() {
		return (
			<li style={this.styles.item}>
				<h5 style={this.styles.heading}>{this.props.title}</h5>
				{this.props.children}				
			</li>
		);
	}
});

var AdvancedSettingsStep = React.createClass({

	styles: {
		wrapper: {
			marginLeft: 0
		}
	},

  	getInitialState: function() {
		return getSiteState();
	},

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getSiteState());
  	},

	render: function() {
		return (
			<WelcomeSection>
				<h3>Let's launch <em>{this.state.site_title}</em></h3>
				<h4>Advanced settings</h4>

				<ul style={this.styles.wrapper}>
					<SettingsItem title="Fine-tune your site's layout and appearance">
						Customize your site’s colors, fonts, sidebars and other settings.
						<br />
						<Button color="blue" href={JPS.steps.advanced_settings.customize_url}>Customize my site</Button>
						&nbsp;&nbsp;
						<Button color="blue" href={JPS.steps.advanced_settings.themes_url}>Browse and add themes</Button>
					</SettingsItem>

					{(SiteStore.getLayout() === 'blog' || SiteStore.getLayout() === 'site-blog') && (
						<SettingsItem title="Create your first blog post">
							An epic essay or just "Hello World!"
							<br />
							<Button color="blue" href={JPS.steps.advanced_settings.new_blog_post_url}>Write a new blog post</Button>
							&nbsp;&nbsp;
							<Button color="blue" href={JPS.steps.advanced_settings.manage_posts_url}>Manage posts</Button>
						</SettingsItem>
					)}
					<SettingsItem title="Create a static page">
						"About me", "Our Services" or anything else you can imagine.
						<br />
						<Button color="blue" href={JPS.steps.advanced_settings.new_page_url}>Create a new page</Button>
						&nbsp;&nbsp;
						<Button color="blue" href={JPS.steps.advanced_settings.manage_pages_url}>Manage pages</Button>
					</SettingsItem>
					<SettingsItem title="Extend your site's functionality">
						WordPress offers thousands of plugins from Jetpack and the WordPress community.
						<br />
						<Button color="blue" href={JPS.steps.advanced_settings.plugins_url}>Manage plugins</Button>
						&nbsp;&nbsp;
						{SiteStore.getJetpackConfigured() && (
							<Button color="blue" href={JPS.steps.advanced_settings.jetpack_modules_url}>Manage Jetpack modules</Button>
						)} 
					</SettingsItem>
					<SettingsItem title="Learn more">
						<a href="https://codex.wordpress.org/First_Steps_With_WordPress">First Steps with WordPress</a> - an online guide from the creators of WordPress
					</SettingsItem>
				</ul>
			</WelcomeSection>
		);
	}
});

module.exports = AdvancedSettingsStep;