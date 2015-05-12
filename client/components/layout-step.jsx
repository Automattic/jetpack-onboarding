var React = require('react'),
	SkipButton = require('./skip-button.jsx'),
	SiteActions = require('../actions/site-actions'),
	SiteStore = require('../stores/site-store'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSiteLayoutState() {
	return {
		layout: SiteStore.getLayout()
	}
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
			<div className="welcome__section" id="welcome__layout">
				<h4>Select a layout</h4>
				<p className="step-description">WordPress can be a blog, a web site with a hierarchy of static pages, or a combination of the two.</p>
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
						<input type="submit" name="save" className="button button-primary button-large" value="Next Step &rarr;"/>
					</p>
				</form>
			</div>
		);
	}
});

module.exports = LayoutStep;