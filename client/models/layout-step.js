var WelcomeStepModel = require('./welcome-step'),
	LayoutStepView = require('../components/layout-step');

module.exports = WelcomeStepModel.extend({
	//TODO - check current site title, etc.
	defaults: _.extend({},WelcomeStepModel.prototype.defaults, { name: "Pick a layout", welcomeView: LayoutStepView })
});