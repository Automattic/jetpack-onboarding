var WelcomeStepModel = require('./welcome-step'),
	GetTrafficStepView = require('../components/get-traffic-step.jsx');

module.exports = WelcomeStepModel.extend({
	//TODO - check current site title, etc.
	defaults: _.extend({},WelcomeStepModel.prototype.defaults, { name: "Get some traffic", welcomeView: GetTrafficStepView })
});