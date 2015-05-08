var React = require('react'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSetupState() {
	return {};
}

var GetStarted = React.createClass({
	componentDidMount: function() {
		SetupProgressStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getSetupState());
  	},

	getInitialState: function() {
		return getSetupState();
	},

	handleGetStarted: function(e) {
		e.preventDefault();
		SetupProgressActions.getStarted();
	},

	render: function() {
		return (
			<div className="getting-started__intro">
				<h3>You're almost done!</h3>
				<p className="getting-started__subhead">
					Take these steps to supercharge your WordPress site.
				</p>
				<p className="getting-started__action">
					<a href="#" className="button button-primary button-large" onClick={this.handleGetStarted}>Get Started &rarr;</a>
				</p>
			</div>
		)
	}
});

module.exports = GetStarted;