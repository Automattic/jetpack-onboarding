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
		siteScreenshot: `${ JPS.base_url }/img/jpo-layout-static.jpg`,
		blogScreenshot: `${ JPS.base_url }/img/jpo-layout-news.jpg`,
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
		let layout = jQuery( e.currentTarget ).val();
		this.setState( { layout: layout } );
		SetupProgressActions.submitLayoutStep( layout );
	},

	skipStep: function( e ) {
		e.preventDefault();
		let layout = 'blog';
		this.setState( { layout: layout } );
		SetupProgressActions.submitLayoutStep( layout );
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__homepage">
				<h1>Let&apos;s launch <em>{ this.state.site_title }</em></h1>
				<p className="welcome__callout welcome__homepage--callout">What should visitors see on your homepage?</p>
				<form>
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
					<div className="welcome__submit">
						<Button className="welcome__skip-link" onClick={ this.skipStep }>Skip this step</Button>
					</div>
				</form>
			</WelcomeSection>
		);
	}
} );

module.exports = HomepageStep;
