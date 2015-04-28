var WelcomeStepModel = require('./welcome-step'),
	DesignStepView = require('../components/design-step.jsx');

module.exports = WelcomeStepModel.extend({
	defaults: _.extend({}, WelcomeStepModel.prototype.defaults, { name: "Pick a design", welcomeView: DesignStepView, themes: JPS.themes })
});