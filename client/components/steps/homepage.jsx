var React = require( 'react' ),
	classNames = require( 'classnames' ),
	SiteStore = require( 'stores/site-store' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	WelcomeSection = require( '../page/container' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' );

function getSiteLayoutState() {
	return {
		site_title: SiteStore.getTitle(),
		layout: SiteStore.getLayout(),
		siteScreenshot: `${ JPS.base_url }/img/layout__site-blog.png`,
		blogScreenshot: `${ JPS.base_url }/img/layout__blog.png`,
	};
}

var HomepageStep = React.createClass( {

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
				<h1>Let&apos;s launch <em>{ this.state.site_title }</em></h1>
				<p className="welcome__callout welcome__homepage--callout">What should visitors see on your homepage?</p>
				<form onSubmit={ this.handleSubmit }>
					<div className="welcome__homepage-cols">
						<div className={ classNames( { 'welcome__homepage-col': true, 'is-selected': this.state.layout === 'blog' } ) }>
							<label>
								<input type="radio" name="site_layout" value="blog" checked={ this.state.layout === 'blog' } onChange={ this.handleSetLayout } className='screen-reader-text' />
								<img src={ this.state.blogScreenshot } />
								<p>Most recent news or updates</p>
							</label>
						</div>
						<div className={ classNames( { 'welcome__homepage-col': true, 'is-selected': this.state.layout === 'site-blog' } ) }>
							<label>
								<input type="radio" name="site_layout" value="site-blog" checked={ this.state.layout === 'site-blog' } onChange={ this.handleSetLayout } className='screen-reader-text'/>
								<img src={ this.state.siteScreenshot } />
								<p>A static welcome page</p>
							</label>
						</div>
					</div>

					<p className="welcome__submit">
						<Button primary type="submit">Next Step &rarr;</Button>
					</p>
				</form>
			</WelcomeSection>
		);
	}
} );

module.exports = HomepageStep;