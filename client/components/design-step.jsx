var React = require('react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		var themes = this.props.model.get('themes').map( function(theme) {
			var style = { 'backgroundImage' : 'url('+theme.img_preview+')', 'backgroundSize' : '100%' };
			return (
				<div className="theme" data-theme="{theme.stylesheet}" style={style}>
					<div className="theme-buttons">
						<a href="{theme.demo_url}" className="button--secondary button--large theme-preview" target="_blank"><span className="small-icon fa fa-external-link"></span>Preview</a>
						<a href="" className="button--primary button--large theme-select"><span className="small-icon fa fa-arrow-circle-o-right"></span>Select Theme</a>
					</div>
				</div>
			);
		} );
		return (
			<div className="welcome__section" id="welcome__design">
				<h4>Pick a design</h4>
				<p className="step-description">To get started, select from one of the themes below. You can always change it later. (There are over 250 themes to choose from.)</p>
				<div className="themes-box">
					{themes}
				</div>
					
				
				<p className="submit">
					<input type="submit" name="save" className="button button-primary button-large" value="Save"/>
					<a className="skip" href="#">Skip this step</a>
				</p>
			</div>
		);
	}
});