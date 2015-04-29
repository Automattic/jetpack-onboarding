var React = require('react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	handleSubmit: function( e ) {
		e.preventDefault();
		var value = jQuery(e.currentTarget).find('input[name=site_layout]:checked').val();
		console.log('value is '+value);
		
		data = {
			action: JPS.steps.set_layout.url_action,
			nonce: JPS.nonce,
			layout: value
		};
		
		jQuery.post(ajaxurl, data)
			.success( function() { 
				this.props.model.set('title', this.state.title);
				this.setState({message: "Saved"});
			}.bind(this) )
			.fail( function() {
				this.setState({message: "Failed"});
			}.bind(this) );

	},

	render: function() {
		return (
			<div className="welcome__section" id="welcome__layout">
				<h4>Pick a layout</h4>

				<form onSubmit={this.handleSubmit}>
					<label>
						<input type="radio" name="site_layout" value="website" defaultChecked/> Website
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