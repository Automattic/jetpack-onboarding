var React = require('react'),
	SkipButton = require('./skip-button.jsx'),
	SiteActions = require('../actions/site-actions'),
	SiteStore = require('../stores/site-store'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSiteTitleState() {
	return {
		title: SiteStore.getTitle()
	};
}

var SiteTitleStep = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getSiteTitleState());
  	},

	getInitialState: function() {
		return getSiteTitleState();
	},

	handleChangeTitle: function(e) {
		SiteActions.setTitle(e.currentTarget.value);
	},

	handleSubmit: function(e) {
		e.preventDefault();
		SetupProgressActions.submitTitleStep();
	},

	render: function() {
		// var currentStep = SetupProgressStore.getCurrentStep();
		// console.log(currentStep);
		return (
			<div className="welcome__section" id="welcome__site-title">
				<h4>Set your site title</h4>

				<form onSubmit={this.handleSubmit}>
					<input type="text" name="site_title" id="site-title" autoComplete="off" onChange={this.handleChangeTitle} value={this.state.title}
					       placeholder="Site Title (this can be changed later)"/>					       

					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" value="Save"/>
						<SkipButton />
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

module.exports = SiteTitleStep;