var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-onboarding-constants');

var SpinnerActions = {
	show: function(msg) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SHOW_SPINNER,
			message: msg
		});
	},

	hide: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.HIDE_SPINNER,
		});	
	},

	showAsync: function(msg) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SHOW_ASYNC_SPINNER,
			message: msg
		});		
	},

	hideAsync: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.HIDE_ASYNC_SPINNER
		});			
	}
};

module.exports = SpinnerActions;