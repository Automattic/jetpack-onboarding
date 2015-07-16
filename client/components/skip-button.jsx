var React = require('react'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getSetupProgress() {
	return {
		completed: SetupProgressStore.getCurrentStep().completed
	};
}

var SkipButton = React.createClass({

	style: {
		color: '#bbb',
		fontSize: '90%',
		marginLeft: 20,
		borderBottom: '1px dotted #bbb'
	},

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
		var completed = (this.state.completed);
		if ( completed ) {
			return null;
		} else {
			return (<a style={this.style} href="#" onClick={this.handleSkip}>Not now</a>);
		}
	}
});

module.exports = SkipButton;