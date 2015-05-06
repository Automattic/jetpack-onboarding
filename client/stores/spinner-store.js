var AppDispatcher = require('../dispatcher/app-dispatcher'),
	EventEmitter = require('events').EventEmitter;
	JPSConstants = require('../constants/jetpack-start-constants');

var CHANGE_EVENT = 'change';
var message, severity;

var spinnerEnabled = false;

function show() {
	spinnerEnabled = true;
}

function hide() {
	spinnerEnabled = false;
}

SpinnerStore = _.extend({}, EventEmitter.prototype, {
	showing: function() {
		return spinnerEnabled;
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
		show();
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