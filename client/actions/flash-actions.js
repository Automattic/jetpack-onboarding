var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-onboarding-constants');

var FlashActions = {
	notice: function(msg) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SET_FLASH,
			message: msg,
			severity: JPSConstants.FLASH_SEVERITY_NOTICE
		});
	},

	error: function(msg) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SET_FLASH,
			message: msg,
			severity: JPSConstants.FLASH_SEVERITY_ERROR
		});
	},

	unset: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.UNSET_FLASH
		});
	}
};

module.exports = FlashActions;