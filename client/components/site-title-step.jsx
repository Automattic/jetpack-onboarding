var React = require('react'),
	SkipButton = require('./skip-button.jsx'),
	SiteActions = require('../actions/site-actions'),
	SiteStore = require('../stores/site-store'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSiteTitleState() {
	return {
		title: SiteStore.getTitle(),
		description: SiteStore.getDescription()
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

	handleChangeDescription: function(e) {
		SiteActions.setDescription(e.currentTarget.value);
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
				<h4>Set your site title and description</h4>

				<form onSubmit={this.handleSubmit}>
					<table className="form-table">
						<tbody>
							<tr>
								<th><label for="site_title">Site Title</label></th>
								<td><input type="text" name="site_title" id="site-title" autoComplete="off" onChange={this.handleChangeTitle} value={this.state.title}
					       placeholder="Site Title (this can be changed later)"/></td>
					      	</tr>
					      	<tr>
								<th><label for="site_description">Site Description</label></th>
								<td><input type="text" name="site_description" id="site-description" autoComplete="off" onChange={this.handleChangeDescription} value={this.state.description}
					       placeholder="Site Description"/></td>
							</tr>
						</tbody>
					</table>

					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" value="Next Step &rarr;"/>
					</p>
				</form>
			</div>
		);
	}
});

module.exports = SiteTitleStep;