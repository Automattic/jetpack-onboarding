var React = require( 'react' ),
	SiteStore = require( 'stores/site-store' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	WelcomeSection = require( '../page/container' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' );

function getSiteLayoutState() {
	return {
		site_title: SiteStore.getTitle(),
		layout: SiteStore.getLayout()
	};
}

var LayoutStep = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getSiteLayoutState() );
	},

	getInitialState: function() {
		return getSiteLayoutState();
	},

	handleIsBlog: function(){
		SetupProgressActions.confirmHomepageStep();
	},

	handleNotBlog: function(){
		SetupProgressActions.submitLayoutStep( 'website' );
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__layout">
				<h1>Let&apos;s launch <em>{ this.state.site_title }</em></h1>
				<p className="welcome__callout welcome__layout--callout">Are you going to update your site with news or blog posts?</p>
				<p>
					<Button onClick={ this.handleIsBlog } primary>Yes</Button>
					<Button onClick={ this.handleNotBlog }>Nope</Button>
				</p>
			</WelcomeSection>
		);
	}
});

module.exports = LayoutStep;
