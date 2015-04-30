var React = require('react'),
	Flash = require('./flash.jsx'),
	WelcomeStep = require('../models/welcome-step');
	
/**
 * The view for the current welcome step
 **/
var WelcomeSection = React.createClass({
	propTypes: {
		currentStep: React.PropTypes.instanceOf(WelcomeStep)
	},

	render: function() {
		return (
			<div className="getting-started__sections">
				<Flash />
				{this.props.currentStep.welcomeView()}
			</div>
		);
	}
});

module.exports = WelcomeSection;