/*
 * Store which manages and persists site information
 */

var AppDispatcher = require('../dispatcher/app-dispatcher'),
  EventEmitter = require('events').EventEmitter,
  JPSConstants = require('../constants/jetpack-start-constants'),
  assign = require('object-assign');

var CHANGE_EVENT = 'change';

var layout = 'website'; //XXX DEBUG temporary

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

function setLayout(layoutName) {
  layout = layoutName; // XXX TODO: get this value dynamically from the server!
}

function setJetpackConfigured() {
  JPS.jetpack.configured = true
}

var SiteStore = assign({}, EventEmitter.prototype, {

  getTitle: function() {
  	return JPS.bloginfo.name;
  },

  getThemes: function() {
    return JPS.themes;
  },

  getJetpackConfigured: function() {
    return JPS.jetpack.configured;
  },

  getLayout: function() {
    return layout;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

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

    case JPSConstants.SITE_JETPACK_CONFIGURED:
      setJetpackConfigured();
      SiteStore.emitChange();
      break;

    case JPSConstants.SITE_SET_LAYOUT:
      setLayout(action.layout);
      SiteStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = SiteStore;