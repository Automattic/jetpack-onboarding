/*
 * Store which manages and persists site information
 */

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var JPSConstants = require('../constants/jetpack-start-constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

function setTitle(newTitle) {
	JPS.bloginfo.name = newTitle;
}

function setActiveTheme(activeThemeId) {
  JPS.themes.forEach( function( theme ) {
    if ( theme.id == activeThemeId ) {
      theme.active = true;
    } else {
      theme.active = false;
    }
  } );
}

var SiteStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getTitle: function() {
  	return JPS.bloginfo.name;
  },

  getThemes: function() {
    return JPS.themes;
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

    case JPSConstants.SITE_SET_THEME:
      setActiveTheme(action.themeId);
      SiteStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = SiteStore;