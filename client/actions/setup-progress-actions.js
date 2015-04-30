var AppDispatcher = require('../dispatcher/app-dispatcher');
var JPSConstants = require('../constants/jetpack-start-constants');

module.exports = {
	setCurrentStep: function(slug) {
		AppDispatcher.dispatch({
	      actionType: JPSConstants.STEP_SELECT,
	      slug: slug
	    });
	},
	
	complete: function(slug) {
		AppDispatcher.dispatch({
	      actionType: JPSConstants.STEP_COMPLETE,
	      slug: slug
	    });
	}
};