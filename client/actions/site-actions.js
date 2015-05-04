var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants'),
	SiteStore = require('../stores/site-store'),
	FlashActions = require('./flash-actions.js'),
	WPAjax = require('../utils/wp-ajax');

var SiteActions = {
	setTitle: function(title) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_SET_TITLE,
			title: title
	    });
	},

	saveTitle: function() {
		var data = {
			action: JPS.site_actions.set_title,
			nonce: JPS.nonce,
			title: SiteStore.getTitle()
		};
		
		return WPAjax.post( JPS.site_actions.set_title, { title: SiteStore.getTitle() } )
			.done( function ( msg ) {
				FlashActions.notice("Saved title");
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_SAVE_TITLE,
					title: title
			    });
			}).fail( function (msg ) {
				FlashActions.error("Error setting title: "+msg);
			});
	},

	setActiveTheme: function( themeId ) {

		return WPAjax.post( JPS.site_actions.set_theme, { themeId: themeId } )
			.done( function ( msg ) {
				FlashActions.notice("Set theme to "+themeId);
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_SET_THEME,
					themeId: themeId
			    });
			}).fail( function ( msg ) {
				FlashActions.error("Server error setting theme: "+msg);
			});
	},

	setLayout: function( layoutName ) {

		return WPAjax.post( JPS.site_actions.set_layout, { layout: layoutName } )
			.done( function ( msg ) {
				FlashActions.notice("Set layout to "+layoutName);
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_SET_LAYOUT,
					layout: layoutName
			    });
			}).fail( function (msg ) {
				FlashActions.error("Error setting layout: "+msg);
			});
	},

	configureJetpack: function(return_to_step) {
		return WPAjax.post( JPS.site_actions.configure_jetpack, {return_to_step: return_to_step} )
			.done( function ( data ) {
				FlashActions.notice("Jetpack Enabled");
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_JETPACK_CONFIGURED
			    });

				if ( data.next ) {
					//XXX TODO: make sure thing happens AFTER any other callbacks, 
					// e.g. to save wizard state or post analytics
					window.location.replace(data.next); // no need to propagate response, this should redirect off the page...
				} 
			}).fail( function (msg ) {
				FlashActions.error("Error enabling Jetpack: "+msg);
			});
	},

	activateJetpackModule: function(module_slug) {
		return WPAjax.post( JPS.site_actions.activate_jetpack_modules, { modules: [module_slug] })
			.done( function ( data ) {
				FlashActions.notice("Enabled "+module_slug);
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_JETPACK_MODULE_ENABLED,
					slug: module_slug
			    });

			}).fail( function (msg ) {
				FlashActions.error("Error activating Jetpack module: "+msg);
			});
	}
};

module.exports = SiteActions;