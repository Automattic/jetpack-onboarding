var WelcomeStepModel = require('./welcome-step'),
	SiteTitleStepView = require('../components/site-title-step');

module.exports = WelcomeStepModel.extend({
	//TODO - check current site title, etc.
	defaults: _.extend({},WelcomeStepModel.prototype.defaults, { name: "Site Title", welcomeView: SiteTitleStepView })
});