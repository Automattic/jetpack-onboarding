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

var HomepageStep = React.createClass({

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

	handleSetLayout: function( e ) {
		this.setState( { layout: jQuery( e.currentTarget ).val() } );
	},

	handleSubmit: function( e ) {
		e.preventDefault();
		SetupProgressActions.submitLayoutStep( this.state.layout );
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__homepage">
				<h3>Let&apos;s launch <em>{ this.state.site_title }</em></h3>
				<h4>Select a Layout</h4>
				<p className="welcome__callout welcome__homepage--callout">WordPress can be a blog, a web site with a hierarchy of static pages, or a combination of the two.</p>
				<form onSubmit={ this.handleSubmit }>
					Am I a static or blog page?
				</form>
			</WelcomeSection>
		);
	}
});

module.exports = HomepageStep;