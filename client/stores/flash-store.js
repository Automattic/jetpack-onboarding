var AppDispatcher = require('../dispatcher/app-dispatcher'),
	EventEmitter = require('events').EventEmitter,
	JPSConstants = require('../constants/jetpack-onboarding-constants');

var CHANGE_EVENT = 'change';
var message, severity;

function setFlash(newMessage, newSeverity) {
	message = newMessage;
	severity = newSeverity;
}

var FlashStore = _.extend({}, EventEmitter.prototype, {
	getFlash: function() {
		var severityString;

		switch(severity) {
			case JPSConstants.FLASH_SEVERITY_ERROR:
				severityString = 'error';
				break;
			case JPSConstants.FLASH_SEVERITY_NOTICE:
				severityString = 'notice';
				break;
			default:
				//noop
		}
		return {message: message, severity: severityString};

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

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case JPSConstants.SET_FLASH:
		setFlash(action.message, action.severity);
		FlashStore.emitChange();
		break;

    case JPSConstants.UNSET_FLASH:
     	setFlash(null, null);
     	FlashStore.emitChange();
     	break;

    default:
      // no op
  }
});

module.exports = FlashStore;