var React = require('react'),
	SetupProgressStore = require('stores/setup-progress-store'),
	SetupProgressActions = require('actions/setup-progress-actions'),
	Button = require('@automattic/dops-components/client/components/button');

function getSetupProgress() {
	return {
		completed: SetupProgressStore.getCurrentStep().completed
	};
}

var SkipButton = React.createClass({
	componentDidMount: function() {
		SetupProgressStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSetupProgress());
	},

	getInitialState: function() {
		return getSetupProgress();
	},

	handleSkip: function (e) {
		e.preventDefault();
		SetupProgressActions.skipStep();
	},

	render: function() {
		var completed = ( this.state.completed );
		if ( completed ) {
			return null;
		} else {
			return (
				<Button className="welcome__skip-step" href="#" onClick={this.handleSkip}>Not now</Button>
			);
		}
	}
});

module.exports = SkipButton;
