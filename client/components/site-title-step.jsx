var React = require('react'),
	BackboneReact = require('backbone-react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<div className="welcome__section" id="welcome__site-title">
				<h4>Set your site title</h4>

				<form>
					<input type="text" name="site_title" id="site-title" autocomplete="off" value={this.props.model.get('title')}
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