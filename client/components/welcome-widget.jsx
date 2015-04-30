var React = require('react'),
	WelcomeSection = require('./welcome-section.jsx'),
	WelcomeMenu = require('./welcome-menu.jsx'),
	SetupProgressStore = require('../stores/setup-progress-store');

function getSetupProgress() {
	return { currentStep: SetupProgressStore.getCurrentStep(), allSteps: SetupProgressStore.getAllSteps(), progressPercent: SetupProgressStore.getProgressPercent() };
}

module.exports = React.createClass({
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

  	render: function() {
	    return (
			<div className="getting-started">
				<div className="getting-started__intro">
					<h3>You're almost done!</h3>

					<p className="getting-started__subhead">Take these steps to supercharge your WordPress site.</p>
				</div>

				<WelcomeSection currentStep={this.state.currentStep}/>
				<WelcomeMenu currentStep={this.state.currentStep} allSteps={this.state.allSteps} progressPercent={this.state.progress}/>
			</div>
    	);
	}
});