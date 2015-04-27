var WelcomeStepModel = require('./welcome-step'),
	DummyWelcomeStepView = require('../components/dummy-welcome-step.jsx');

// placeholder for welcome steps that are always completed by the time we view them
module.exports = WelcomeStepModel.extend({
	defaults: {
		completed: true, viewed: true, skipped: false, configured: true, welcomeView: DummyWelcomeStepView
	},

	repeatable: function() { return false; },
});