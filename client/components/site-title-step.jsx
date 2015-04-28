var React = require('react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	getInitialState: function() {
		// yeah yeah, I know that setting state from props is an antipattern, but I didn't
		// want it persisted to the backbone model until the user hits "Done"
		return {
			title: this.props.model.get('title')
		};
	},

	handleChangeTitle: function(e) {
		this.setState({title: e.currentTarget.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();

		data = {
			action: JPS.steps.set_title.url_action,
			nonce: JPS.nonce,
			title: this.state.title
		};
		
		jQuery.post(ajaxurl, data)
			.success( function() { 
				this.props.model.set('title', this.state.title);
				this.setState({message: "Saved"});
				// jQuery('#welcome__site-title notice').html("Saved").fadeOut(2000);
			}.bind(this) )
			.fail( function() {
				this.setState({message: "Failed"});
				// jQuery('#welcome__site-title notice').html("Fail").fadeOut(2000);
			}.bind(this) );

		//skip to next section unless this section has been completed before?
	},

	render: function() {
		var feedbackMessage;

		if ( this.state.message != null ) {
			feedbackMessage = (<div className="notice updated">{this.state.message}</div>);
		} else {
			feedbackMessage = null;
		}


		return (
			<div className="welcome__section" id="welcome__site-title">
				{feedbackMessage}
				<h4>Set your site title</h4>

				<form onSubmit={this.handleSubmit}>
					<input type="text" name="site_title" id="site-title" autoComplete="off" onChange={this.handleChangeTitle} value={this.state.title}
					       placeholder="Site Title (this can be changed later)"/>					       

					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" value="Save"/>
						<a className="skip" href="#">Skip this step</a>
					</p>
				</form>
				<div className="welcome__helper">
					Stuck? Here are some ideas to get you going:
					<ul>
						<li>
							<small><em>Your company name: "ACME Consulting"</em></small>
						</li>
						<li>
							<small>
								<em>What you do: "Quality gardening tools by ACME"</em>
							</small>
						</li>
						<li>
							<small>
								<em>What you will write about: "Richard\'s Travel Blog"</em>
							</small>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});