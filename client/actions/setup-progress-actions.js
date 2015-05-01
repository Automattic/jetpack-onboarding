var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants'),
	FlashActions = require('./flash-actions');

module.exports = {
	setCurrentStep: function(slug) {
		FlashActions.unset();
		AppDispatcher.dispatch({
	      actionType: JPSConstants.STEP_SELECT,
	      slug: slug
	    });
	}
};