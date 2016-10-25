/*
 * Store which manages and persists site information
 */

var AppDispatcher = require('../dispatcher/app-dispatcher'),
  EventEmitter = require('events').EventEmitter,
  JPSConstants = require('../constants/jetpack-onboarding-constants'),
  WPAjax = require('../utils/wp-ajax');

var CHANGE_EVENT = 'change';

var layout = JPS.steps.layout.current;

function setType(newType) {
  JPS.bloginfo.type = newType;
}

function setTitle(newTitle) {
  JPS.bloginfo.name = newTitle;
}

function setDescription(newDescription) {
  JPS.bloginfo.description = newDescription;
}

function setActiveTheme(activeThemeId) {
  JPS.themes.forEach( function( theme ) {
	if ( theme.id === activeThemeId ) {
	  theme.active = true;
	} else {
	  theme.active = false;
	}
  } );
}

function installedTheme(theme) {
  JPS.themes.unshift(theme);
  JPS.themes = JPS.themes.slice(0, 3);
}

function setJetpackModuleActivated(slug) {
  if ( _.indexOf( JPS.jetpack.active_modules, slug ) === -1 ) {
	JPS.jetpack.active_modules.push(slug);
  }
}

function setJetpackModuleDectivated(slug) {
  var index = _.indexOf( JPS.jetpack.active_modules, slug );
  if ( index >= 0) {
	JPS.jetpack.active_modules.splice(index, 1);
  }
}

function setJetpackAdditionalModules(modules) {
  JPS.jetpack.additional_modules = _.filter(modules, function(module) {
	return _.indexOf(JPS.jetpack.jumpstart_modules.map(function(mod){return mod.slug;}), module.slug) === -1;
  });
}

function setLayout(layoutName) {
  layout = layoutName; // XXX TODO: get this value dynamically from the server!
}

function setJetpackConfigured() {
  JPS.jetpack.configured = true;
}

function setJetpackJumpstartActivated() {
  JPS.jetpack.jumpstart_modules.forEach( function( module ) {
	setJetpackModuleActivated( module.slug );
  });
}

function setContactUsPage( pageInfo ) {
  JPS.steps.contact_page = pageInfo;
}

function setLayoutPages( pageInfo ) {
  JPS.steps.layout.welcomeEditUrl = pageInfo.welcome;
  JPS.steps.layout.postsEditUrl = pageInfo.posts;
}

function setShopStatus() {
  JPS.bloginfo = Object.assign( {}, JPS.bloginfo, { is_shop: true } );
}

function setWooCommerceStatus() {
  JPS.woocommerce_status = true;
  JPS.bloginfo = Object.assign( {}, JPS.bloginfo, { redirect_to_woocommerce_setup: true } );
}

function setWooCommerceRedirectStatus() {
  JPS.bloginfo = Object.assign( {}, JPS.bloginfo, { redirect_to_woocommerce_setup: false } );
}

var SiteStore = _.extend({}, EventEmitter.prototype, {

  getTitle: function() {
	return JPS.bloginfo.name;
  },

  getType: function() {
	return JPS.bloginfo.type;
  },

  getDescription: function() {
	return JPS.bloginfo.description;
  },

  getContactPageURL: function() {
	return JPS.steps.contact_page && JPS.steps.contact_page.url;
  },

  getContactPageEditURL: function() {
	if ( JPS.steps.contact_page && JPS.steps.contact_page.editUrl ) {
	  return JPS.steps.contact_page.editUrl.replace('&amp;','&');
	}
  },

  getWelcomePageEditURL: function() {
	if ( JPS.steps.layout && JPS.steps.layout.welcomeEditUrl ) {
	  return JPS.steps.layout.welcomeEditUrl.replace('&amp;','&');
	}
  },

  getNewsPageEditURL: function() {
	if ( JPS.steps.layout && JPS.steps.layout.postsEditUrl ) {
	  return JPS.steps.layout.postsEditUrl.replace('&amp;','&');
	}
  },

  getThemes: function() {
	return JPS.themes;
  },

  getActiveThemeId: function() {
	for(var i=0; i < JPS.themes.length; i++) {
	  var theme = JPS.themes[i];
	  if ( theme.active ) {
		return theme.id;
	  }
	}
	return null;
  },
  
  getWooCommerceStatus: function() {
	return JPS.woocommerce_status;
  },

  getWooCommerceSetupUrl: function() {
	return JPS.steps.advanced_settings.woocommerce_setup_url;
  },

  getJetpackConfigured: function() {
	return JPS.jetpack.configured;
  },

  getActiveModuleSlugs: function() {
	return JPS.jetpack.active_modules;
  },

  isJetpackModuleEnabled: function(slug) {
	return ( _.indexOf( JPS.jetpack.active_modules, slug ) >= 0 );
  },

  getJetpackAdditionalModules: function() {
	return JPS.jetpack.additional_modules;
  },

  getJumpstartModuleSlugs: function() {
	return JPS.jetpack.jumpstart_modules.map(function(module) { return module.slug; });
  },

  getJumpstartModules: function() {
	return JPS.jetpack.jumpstart_modules;
  },

  getJetpackSettingsUrl: function() {
	return JPS.steps.advanced_settings && JPS.steps.advanced_settings.jetpack_modules_url;
  },

  getPluginsUrl: function() {
	return JPS.steps.advanced_settings.plugins_url;
  },

  getPopularThemes: function() {
	return WPAjax.post(JPS.site_actions.get_popular_themes, {}, {quiet: true});
  },

  getJetpackJumpstartEnabled: function() {
	for(var i=0; i < JPS.jetpack.jumpstart_modules.length; i++) {
	  var module = JPS.jetpack.jumpstart_modules[i];
	  if ( ! this.isJetpackModuleEnabled( module.slug ) ) {
		return false;
	  }
	}
	return true;
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
	case JPSConstants.SITE_SET_TYPE:
	  setType(action.type);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_SET_TITLE:
	  setTitle(action.title);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_SET_DESCRIPTION:
	  setDescription(action.description);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_SAVE_TITLE_AND_DESCRIPTION:
	  setTitle(action.title);
	  setDescription(action.description);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_SET_THEME:
	  setActiveTheme(action.themeId);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_INSTALL_THEME:
	  installedTheme(action.theme);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_JETPACK_CONFIGURED:
	  setJetpackConfigured();
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_JETPACK_ADD_MODULES:
	  setJetpackAdditionalModules(action.modules);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_JETPACK_MODULE_ENABLED:
	  setJetpackModuleActivated(action.slug);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_JETPACK_MODULE_DISABLED:
	  setJetpackModuleDectivated(action.slug);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_JETPACK_JUMPSTART_ENABLED:
	  setJetpackJumpstartActivated();
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_SET_LAYOUT:
	  setLayout(action.layout);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_CREATE_CONTACT_US_PAGE:
	  setContactUsPage(action.data);
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_CREATE_LAYOUT_PAGES:
	  setLayoutPages( action.data );
	  SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_INSTALL_WOOCOMMERCE:
      setShopStatus();
      SiteStore.emitChange();
	  break;

	case JPSConstants.SITE_INSTALL_WOOCOMMERCE_SUCCESS:
	  setWooCommerceStatus();
	  SiteStore.emitChange();
	  break;

    case JPSConstants.SITE_REDIRECT_TO_WOOCOMMERCE_SETUP:
      setWooCommerceRedirectStatus();
      SiteStore.emitChange();
      break;

	default:
	  // no op
  }
});

module.exports = SiteStore;
