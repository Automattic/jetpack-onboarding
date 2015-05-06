var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants');

var SpinnerActions = {
	show: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SHOW_SPINNER,
		});
	},

	hide: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.HIDE_SPINNER,
		});	
	}
};

module.exports = SpinnerActions;