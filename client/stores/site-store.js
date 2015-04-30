/*
 * Store which manages and persists site information
 */

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var JPSConstants = require('../constants/jetpack-start-constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var title = JPS.bloginfo.name;

function setTitle(newTitle) {
	title = newTitle;
}

var SiteStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getTitle: function() {
  	return title;
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case JPSConstants.SITE_SET_TITLE:
      setTitle(action.title);
      SiteStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = SiteStore;