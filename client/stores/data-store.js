var AppDispatcher = require('../dispatcher/app-dispatcher'),
	EventEmitter = require('events').EventEmitter,
	JPSConstants = require('../constants/jetpack-onboarding-constants');

/*
 * This is a refcounted save monitor which warns if you try to leave the page while the data is still saving
 */

var _currentSaves = 0, jpoTimeout, CHANGE_EVENT = 'change';

function incrementSaveCounter() {
	_currentSaves = _currentSaves + 1;
}

function decrementSaveCounter() {
	_currentSaves = _currentSaves - 1;
}

var DataStore = _.extend({}, EventEmitter.prototype, {
	isSaving: function() {
		return _currentSaves > 0;
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
	    this.emit(CHANGE_EVENT);
	},
});

jQuery(window).on('beforeunload', function() {
	if(DataStore.isSaving()) {
		jpoTimeout = setTimeout(function() {
	        // alert('You stayed');
	        // noop
	    }, 1000);
	    return "Your site changes are still saving.";
	}
});

jQuery(window).on('unload', function() {
	clearTimeout(jpoTimeout);
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case JPSConstants.SAVE_STARTED:
    	incrementSaveCounter();
		DataStore.emitChange();
		break;

    case JPSConstants.SAVE_FINISHED:
    	decrementSaveCounter();
     	DataStore.emitChange();
     	break;

    default:
      // no op
  }
});

module.exports = DataStore;