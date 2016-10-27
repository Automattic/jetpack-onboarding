var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-onboarding-constants'),
	SiteStore = require('stores/site-store'),
	FlashActions = require('./flash-actions.js'),
	SpinnerActions = require('./spinner-actions.js'),
	WPAjax = require('../utils/wp-ajax');

var SiteActions = {
	setTitle: function(title) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_SET_TITLE,
			title: title
	    });
	},

	setType: function(type) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_SET_TYPE,
			type: type
	    });
	},

	setDescription: function(description) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_SET_DESCRIPTION,
			description: description
	    });
	},

	saveTitleAndDescription: function( title, description ) {

		WPAjax.
			post( JPS.site_actions.set_title, { title: title, description: description } ).
			fail( function ( msg ) {
				FlashActions.error("Error setting title: "+msg);
			});

		jQuery('#wp-admin-bar-site-name .ab-item').html(title);

		// FlashActions.notice( "Set title to '"+title+"' and description to '"+description+"'" );
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_SAVE_TITLE_AND_DESCRIPTION,
			title: title,
			description: description
	    });

		return jQuery.Deferred().resolve(); // XXX HACK
	},

	saveBusinessAddress: function( businessAddress ) {
		WPAjax.
			post( JPS.site_actions.add_business_address, businessAddress ).
			fail( function ( msg ) {
				FlashActions.error("Error setting title: "+msg);
			});

		const { business_address_1, business_address_2, business_city, business_name, business_state, business_zip } = businessAddress;

		JPS.bloginfo = Object.assign( {}, JPS.bloginfo, { business_address_1, business_address_2, business_city, business_name, business_state, business_zip } );

		// FlashActions.notice( "Set title to '"+title+"' and description to '"+description+"'" );
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_ADD_BUSINESS_ADDRESS,
			address: businessAddress
	    });

		return jQuery.Deferred().resolve(); // XXX HACK
	},
	
	redirectToWooCommerceSetup: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_REDIRECT_TO_WOOCOMMERCE_SETUP
		});
	},

	installWooCommerce: function() {
		SpinnerActions.show( "Installing WooCommerce" );
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_INSTALL_WOOCOMMERCE
		});
		return WPAjax.
			post( JPS.site_actions.install_woocommerce ).
			done( function ( ) {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_INSTALL_WOOCOMMERCE_SUCCESS
				});
			}).
			fail( function ( msg ) {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_INSTALL_WOOCOMMERCE_FAIL
				});
				FlashActions.error( msg );
			}).
			always( function() {
				SpinnerActions.hide();
			});
	},

	setContactPageId: function(contactPageID) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_CONTACT_PAGE_ID,
			contactPageID: contactPageID
		});
	},

	_installTheme: function ( theme ) {
		if ( ! theme.installed ) {
			SpinnerActions.show("Installing '"+theme.name+"'");
			return WPAjax.
				post( JPS.site_actions.install_theme, { themeId: theme.id } ).
				done( function ( ) {
					theme.installed = true;
					AppDispatcher.dispatch({
						actionType: JPSConstants.SITE_INSTALL_THEME,
						theme: theme
				    });
				}).
				fail( function ( msg ) {
					FlashActions.error("Server error installing theme: "+msg);
				}).
				always( function() {
					SpinnerActions.hide();
				});
		} else {
			return jQuery.Deferred().resolve();
		}
	},

	_activateTheme: function ( theme ) {
		WPAjax.
			post( JPS.site_actions.set_theme, { themeId: theme.id } ).
			fail( function ( msg ) {
				FlashActions.error("Server error setting theme: "+msg);
			});

		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_SET_THEME,
			themeId: theme.id
	    });
	},

	setActiveTheme: function( theme ) {

		this._installTheme(theme).
			done( function() {
				this._activateTheme(theme);
			}.bind(this));

		return jQuery.Deferred().resolve(); // XXX HACK
	},

	setLayout: function( layoutName ) {

		WPAjax.
			post( JPS.site_actions.set_layout, { layout: layoutName } ).
			done( function ( page_info ){
				AppDispatcher.dispatch( {
					actionType: JPSConstants.SITE_CREATE_LAYOUT_PAGES,
					data: page_info
				} );
			} ).
			fail( function (msg ){
				FlashActions.error("Error setting layout: "+msg);
			} );

		// FlashActions.notice("Set layout to "+layoutName);
		AppDispatcher.dispatch( {
			actionType: JPSConstants.SITE_SET_LAYOUT,
			layout: layoutName
		} );

		return jQuery.Deferred().resolve(); // XXX HACK
	},

	createContactUsPage: function( contactPage ) {

		return WPAjax.
			post( JPS.site_actions.build_contact_page, { buildContactPage: contactPage } ).
			done( function( page_info ) {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_CREATE_CONTACT_US_PAGE,
					data: page_info
				});
			}).
			fail( function( msg ) {
				FlashActions.error("Error creating contact us page: "+msg);
			});
	},

	skipContactPageBuild: function() {
		// FlashActions.notice( "Build the contact us page" );
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_CREATE_CONTACT_US_PAGE
		});

		return jQuery.Deferred().resolve(); // XXX HACK
	},

	configureJetpack: function(return_to_step) {


/****************

complete step

*********************/

		return WPAjax.
			post( JPS.site_actions.configure_jetpack, { return_to_step: return_to_step } ).
			done( function ( data ) {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_JETPACK_CONFIGURED
			    });

				if ( data.next ) {
					window.location.replace(data.next);
				}
			}).
			fail( function ( msg ) {
				FlashActions.error("Error enabling Jetpack: "+msg);
			});
	},

	activateJetpackModule: function(module_slug) {

		WPAjax.
			post( JPS.site_actions.activate_jetpack_modules, { modules: [module_slug] }).
			fail( function ( msg ) {
				FlashActions.error("Error activating Jetpack module: "+msg);
			});

		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_JETPACK_MODULE_ENABLED,
			slug: module_slug
	    });

		return jQuery.Deferred().resolve(); // XXX HACK
	},

	deactivateJetpackModule: function(module_slug) {

		WPAjax.
			post( JPS.site_actions.deactivate_jetpack_modules, { modules: [module_slug] }).
			fail( function ( msg ) {
				FlashActions.error("Error deactivating Jetpack module: "+msg);
			});

		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_JETPACK_MODULE_DISABLED,
			slug: module_slug
	    });

		return jQuery.Deferred().resolve(); // XXX HACK
	},

	loadAllJetpackModules: function() {
		if ( SiteStore.getJetpackAdditionalModules().length === 0 ) {
			return WPAjax.
				post( JPS.site_actions.list_jetpack_modules ).
				done( function ( all_modules ) {
					AppDispatcher.dispatch({
						actionType: JPSConstants.SITE_JETPACK_ADD_MODULES,
						modules: all_modules
				    });
				}).
				fail( function ( msg ) {
					FlashActions.error("Error fetching all Jetpack modules: "+msg);
				});
		} else {
			return jQuery.Deferred().resolve(); // XXX HACK
		}
	},

	enableJumpstart: function() {
		WPAjax.
			post( JPS.site_actions.activate_jetpack_modules, { modules: SiteStore.getJumpstartModuleSlugs() }).
			fail( function ( msg ) {
				FlashActions.error("Error activating Jetpack modules: "+msg);
			});

		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_JETPACK_JUMPSTART_ENABLED
	    });

		return jQuery.Deferred().resolve(); // XXX HACK
	}
};

module.exports = SiteActions;