var React = require('react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {

		var component, feedbackMessage;

		if ( this.state.message != null ) {
			feedbackMessage = (<div className="notice updated">{this.state.message}</div>);
		} else {
			feedbackMessage = null;
		}

		if ( ! this.props.model.get('jetpack_enabled') ) {
			component = (
				<div className="welcome__connect">
					Connect Jetpack to enable free stats, site monitoring, and more.
					<br /><br />
					<a className="download-jetpack" href="#">Connect Jetpack</a>
					<p>
						<a className="skip" href="#">Skip this step</a>
					</p>
				</div>
			);
		} else if ( ! this.props.model.get('jetpack_active') ) {
			component = (
				<div className="welcome__connect">
					You have downloaded JetPack but not yet enabled it
					<br /><br />
					<a href="#" className="download-jetpack">Connect to WordPress.com</a>
					<p className="submit">
						<a className="skip" href="#">Skip this step</a>
					</p>
				</div>
			);
		} else {
			component = (
				<div>
					You have successfully connected Jetpack for stats, monitoring, and more!
					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" value="Continue" />
					</p>
				</div>
			);
		}

		// FIXME - show GUI to configure sharing
		return (
			<div className="welcome__section" id="welcome__traffic">
				{feedbackMessage}
				<h4>Get web traffic</h4>
				{component}
			</div>
		);
	}
});