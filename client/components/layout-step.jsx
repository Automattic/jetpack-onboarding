var React = require('react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<div className="welcome__section" id="welcome__layout">
				<h4>Pick a layout</h4>

				<form method="post">
					<label>
						<input type="radio" name="site_layout" value="website" checked/> Website
						<p className="description">Choose this one if you're creating a site for your company that will rarely change</p>
					</label>
					<br/>
					<label>
						<input type="radio" name="site_layout" value="site-blog"/> Website with a blog
						<p className="description">Choose this one if you're creating a company or personal site that will also have a blog or news section</p>
					</label>
					<br/>
					<label>
						<input type="radio" name="site_layout" value="blog"/> Just a blog
						<p className="description">Choose this one if you want a site that will constantly show new content (articles, photos, videos, etc.)</p>
					</label>

					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" value="Save"/>
						<a className="skip" href="#">Skip this step</a>
					</p>
				</form>
			</div>
		);
	}
});