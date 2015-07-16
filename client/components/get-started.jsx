var React = require('react'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	Button = require('@automattic/dops-react/js/components/button');

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
				<p style={{textAlign: 'center'}}>
					<Button color="green" size="big" theme="jetpack" onClick={this.handleGetStarted}>Get Started &rarr;</Button>
				</p>
			</div>
		);
	}
});

module.exports = GetStarted;