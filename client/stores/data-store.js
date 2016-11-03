var AppDispatcher = require( '../dispatcher/app-dispatcher' ),
	EventEmitter = require( 'events' ).EventEmitter,
	JPSConstants = require( '../constants/jetpack-onboarding-constants' );

/*
 * This is a refcounted save monitor which warns if you try to leave the page while the data is still saving
 */

const CHANGE_EVENT = 'change';

var _currentSaves = 0;

function incrementSaveCounter() {
	_currentSaves = _currentSaves + 1;
}

function decrementSaveCounter() {
	_currentSaves = _currentSaves - 1;
}

const DataStore = _.extend( {}, EventEmitter.prototype, {
	isSaving: function() {
		return _currentSaves > 0;
	},

	addChangeListener: function( callback ) {
		this.on( CHANGE_EVENT, callback );
	},

	removeChangeListener: function( callback ) {
		this.removeListener( CHANGE_EVENT, callback );
	},

	emitChange: function() {
		this.emit( CHANGE_EVENT );
	},
} );

jQuery( window ).on( 'beforeunload', function() {
	if ( DataStore.isSaving() ) {
		return 'Your site changes are still saving.';
	}
} );

AppDispatcher.register( function( action ) {
	switch ( action.actionType ) {
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
} );

module.exports = DataStore;
