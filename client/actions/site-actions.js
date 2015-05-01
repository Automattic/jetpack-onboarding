var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants'),
	SiteStore = require('../stores/site-store'),
	FlashActions = require('./flash-actions.js');

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
		
		jQuery.post( ajaxurl, data )
			.success( function( response ) {
				if ( ! response.success ) {
					FlashActions.error("Error setting title: "+response.data);
				} else {
					FlashActions.notice("Saved title");
					AppDispatcher.dispatch({
						actionType: JPSConstants.SITE_SAVE_TITLE,
						title: title
				    });
				}
			})
			.fail( function() {
				FlashActions.error("Failed to set title");
			});	
	},

	setActiveTheme: function( themeId, activateUrl ) {

		jQuery.get( activateUrl )
			.success( function () {
				FlashActions.notice("Set theme to "+themeId);

				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_SET_THEME,
					themeId: themeId
			    });
			} )
			.fail( function () {
				FlashActions.error("Server error setting theme");
			} ); 
	},

	setLayout: function( layoutName ) {
		var data = {
			action: JPS.site_actions.set_layout,
			nonce: JPS.nonce,
			layout: layoutName,
			completed: true
		};
		
		jQuery.post(ajaxurl, data)
			.success( function( response ) { 

				if ( ! response.success ) {
					FlashActions.error("Error setting layout: "+response.data);
				} else {
					FlashActions.notice("Set layout to "+layoutName);
					AppDispatcher.dispatch({
						actionType: JPSConstants.SITE_SET_LAYOUT,
						layout: layoutName
				    });
				}

			} )
			.fail( function() {
				FlashActions.error("Server error");
			} );
	},

	configureJetpack: function() {
		var data = {
			action: JPS.site_actions.configure_jetpack,
			nonce: JPS.nonce
		};
		
		jQuery.post(ajaxurl, data)
			.success( function( response ) { 

				if ( ! response.success ) {
					FlashActions.error("Error enabling Jetpack: "+response.data);
					return;
				}

				if ( response.data.next ) {
					window.location.replace(response.data.next); // no need to propagate response, this should redirect off the page...
				} else {
					FlashActions.notice("Jetpack Enabled");
					AppDispatcher.dispatch({
						actionType: JPSConstants.SITE_JETPACK_CONFIGURED,
						themeId: themeId
				    });
				}
				
			} )
			.fail( function() {
				FlashActions.error("Server error");
			} );
	}
};

module.exports = SiteActions;