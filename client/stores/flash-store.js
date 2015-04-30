var AppDispatcher = require('../dispatcher/app-dispatcher'),
	EventEmitter = require('events').EventEmitter;
	JPSConstants = require('../constants/jetpack-start-constants'),
	assign = require('object-assign');

var CHANGE_EVENT = 'change';
var message, severity;

function setFlash(newMessage, newSeverity) {
	message = newMessage;
	severity = newSeverity;
}

FlashStore = assign({}, EventEmitter.prototype, {
	getFlash: function() {
		return {message: message, severity: severity};
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

    default:
      // no op
  }
});

module.exports = FlashStore;