var React = require('react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	handleJetpackErrorResponse: function(message) {
		this.setState({message: 'Failed: '+message, messageType: 'error'});
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		data = {
			action: JPS.steps.stats_and_monitoring.activate_url_action,
			nonce: JPS.nonce
		};
		
		jQuery.post(ajaxurl, data)
			.success( function(response) { 
				if ( ! response.success ) {
					this.handleJetpackErrorResponse(response.data);
					return;
				}

				if ( response.data.next ) {
					alert('redirecting to '+response.data.next);
					window.location.replace(response.data.next);
				} else {
					this.setState({message: 'Connected', messageType: 'notice'});
				}
				
			}.bind(this) )
			.fail( function() {
				this.handleJetpackErrorResponse("Unknown error");
			}.bind(this) );
	},

	render: function() {
		var component, feedbackMessage;

		if ( this.state.message != null ) {
			feedbackMessage = (<div className={this.state.messageType + ' updated'}>{this.state.message}</div>);
		} else {
			feedbackMessage = null;
		}

		if ( ! JPS.steps.stats_and_monitoring.jetpack_configured ) {
			component = (
				<div className="welcome__connect">
					Enable Jetpack and connect to WordPress.com for powerful analytics and site monitoring.
					<br /><br />
					<a href="#" className="download-jetpack" onClick={this.handleJetpackConnect}>Enable Jetpack</a>
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

		return (
			<div className="welcome__section" id="welcome__stats">
				{feedbackMessage}
				<h4>Enable stats and monitoring</h4>
				{component}
			</div>
		);
	}
});