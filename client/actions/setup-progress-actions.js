var AppDispatcher = require('../dispatcher/app-dispatcher');
var JPSConstants = require('../constants/jetpack-start-constants');

module.exports = {
	complete: function(step) {
		AppDispatcher.dispatch({
	      actionType: JPSConstants.STEP_COMPLETE,
	      step: slug
	    });
	}
};