var WelcomeStepModel = require('./welcome-step'),
	AdvancedSettingsStepView = require('../components/advanced-settings-step.jsx');

module.exports = WelcomeStepModel.extend({
	defaults: _.extend({}, WelcomeStepModel.prototype.defaults, { name: "Advanced settings", welcomeView: AdvancedSettingsStepView })
});