var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-onboarding-constants');

var DataActions = {
	requestStarted: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SAVE_STARTED
		});
	},

	requestFinished: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SAVE_FINISHED
		});
	}
};

module.exports = DataActions;