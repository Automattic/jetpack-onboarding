console.log('requiring welcome widget');
var React = require('react'),
	WelcomeMenu = require('./welcome-menu.jsx'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	Flash = require('./flash.jsx');

function getSetupProgress() {
	return { currentStep: SetupProgressStore.getCurrentStep(), allSteps: SetupProgressStore.getAllSteps(), progressPercent: SetupProgressStore.getProgressPercent() };
}

var WelcomeWidget = React.createClass({
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
  		var currentView;
  		if ( this.state.currentStep ) {
  			currentView = (<this.state.currentStep.welcomeView />);
  		} else {
  			currentView = (<h3>Nothing</h3>);
  		}

	    return (
			<div className="getting-started">
				<div className="getting-started__intro">
					<h3>You're almost done!</h3>

					<p className="getting-started__subhead">Take these steps to supercharge your WordPress site.</p>
				</div>

				<div className="getting-started__sections">
					<Flash />
					{currentView}
				</div>

				<WelcomeMenu currentStep={this.state.currentStep} allSteps={this.state.allSteps} progressPercent={this.state.progressPercent}/>
			</div>
    	);
	}
});

module.exports = WelcomeWidget;