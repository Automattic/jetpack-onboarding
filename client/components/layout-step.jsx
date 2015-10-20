var React = require('react'),
	SiteStore = require('../stores/site-store'),
	Button = require('@automattic/dops-components/client/components/button'),
	WelcomeSection = require('./welcome-section'),
	styles = require('../styles'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSiteLayoutState() {
	return {
		site_title: SiteStore.getTitle(),
		layout: SiteStore.getLayout()
	};
}

var LayoutStep = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getSiteLayoutState());
  	},

	getInitialState: function() {
		return getSiteLayoutState();
	},

	handleSetLayout: function( e ) {
		this.setState({ layout: jQuery(e.currentTarget).val() });
	},

	handleSubmit: function( e ) {
		e.preventDefault();
		SetupProgressActions.submitLayoutStep(this.state.layout);
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__layout">
			
				<h3>Let's launch <em>{this.state.site_title}</em></h3>
				<h4>Select a Layout</h4>
				<p style={styles.content}>WordPress can be a blog, a web site with a hierarchy of static pages, or a combination of the two.</p>
				<form onSubmit={this.handleSubmit}>
					<label>
						<input type="radio" name="site_layout" value="website" checked={this.state.layout === 'website'} onChange={this.handleSetLayout}/> Static Website
						<p className="description">A web site with a hierarchy of pages</p>
					</label>
					<br/>
					<label>
						<input type="radio" name="site_layout" value="site-blog" checked={this.state.layout === 'site-blog'} onChange={this.handleSetLayout}/> Static Website with a blog
						<p className="description">A web site with pages that also has a blog or news section</p>
					</label>
					<br/>
					<label>
						<input type="radio" name="site_layout" value="blog" checked={this.state.layout === 'blog'} onChange={this.handleSetLayout}/> Just a blog
						<p className="description">A web site that will constantly show new content (articles, photos, videos, etc.)</p>
					</label>

					<p className="submit">
						<Button color="blue">Next Step &rarr;</Button>
					</p>
				</form>
			</WelcomeSection>
		);
	}
});

module.exports = LayoutStep;