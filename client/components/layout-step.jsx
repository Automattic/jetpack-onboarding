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
				<p className="step-description">WordPress can be a blog, a fully-fledged web site, or a combination of the two.</p>
				<form onSubmit={this.handleSubmit}>
					<label>
						<input type="radio" name="site_layout" value="website" checked={this.state.layout === 'website'} onChange={this.handleSetLayout}/> Website
						<p className="description">Choose this one if you're creating a site for your company that will rarely change</p>
					</label>
					<br/>
					<label>
						<input type="radio" name="site_layout" value="site-blog" checked={this.state.layout === 'site-blog'} onChange={this.handleSetLayout}/> Website with a blog
						<p className="description">Choose this one if you're creating a company or personal site that will also have a blog or news section</p>
					</label>
					<br/>
					<label>
						<input type="radio" name="site_layout" value="blog" checked={this.state.layout === 'blog'} onChange={this.handleSetLayout}/> Just a blog
						<p className="description">Choose this one if you want a site that will constantly show new content (articles, photos, videos, etc.)</p>
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