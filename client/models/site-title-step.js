var WelcomeStepModel = require('./welcome-step'),
	SiteTitleStepView = require('../components/site-title-step.jsx');

module.exports = WelcomeStepModel.extend({
	//TODO - check current site title, etc.
	defaults: _.extend({},WelcomeStepModel.prototype.defaults, { name: "Site Title", welcomeView: SiteTitleStepView, title: JPS.bloginfo.name }),
	
	initialize: function() {
		this.attributes.completed = (JPS.bloginfo.name != null);
	},

	validate: function(attrs, options) {
		if (attrs.title == null || attrs.title == '') {
			return "Title can't be empty";
		}
	}
});