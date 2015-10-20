var AppDispatcher = require('../dispatcher/app-dispatcher'),
	EventEmitter = require('events').EventEmitter,
	JPSConstants = require('../constants/jetpack-onboarding-constants');

var CHANGE_EVENT = 'change';

var spinnerEnabled = false,
	spinnerMessage = null;

function show(message) {
	spinnerEnabled = true;
	spinnerMessage = message;
}

function hide() {
	spinnerEnabled = false;
	spinnerMessage = null;
}

var SpinnerStore = _.extend({}, EventEmitter.prototype, {
	showing: function() {
		return spinnerEnabled;
	},

	getMessage: function() {
		return spinnerMessage;
	},

	addChangeListener: function(callback) {
		this.on( CHANGE_EVENT, callback );
	},

	removeChangeListener: function(callback) {
		this.removeListener( CHANGE_EVENT, callback );
	},

	emitChange: function() {
	    this.emit( CHANGE_EVENT );
	},
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case JPSConstants.SHOW_SPINNER:
		show(action.message);
		SpinnerStore.emitChange();
		break;

    case JPSConstants.HIDE_SPINNER:
     	hide();
     	SpinnerStore.emitChange();
     	break;

    default:
      // no op
  }
});

module.exports = SpinnerStore;