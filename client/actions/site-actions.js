var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants'),
	SiteStore = require('../stores/site-store'),
	FlashActions = require('./flash-actions.js');

module.exports = {
	setTitle: function(title) {
		//XXX TODO: save title here??
		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_SET_TITLE,
			title: title
	    });
	},

	saveTitle: function() {

		data = {
			action: JPS.steps.set_title.url_action,
			nonce: JPS.nonce,
			title: SiteStore.getTitle()
		};
		
		jQuery.post(ajaxurl, data)
			.success( function() {
				FlashActions.notice("Saved");
			})
			.fail( function() {
				FlashActions.error("Failed");
			});	
	},

	setActiveTheme: function(themeId) {

		//XXX TODO: persistence

		AppDispatcher.dispatch({
			actionType: JPSConstants.SITE_SET_THEME,
			themeId: themeId
	    });
	}
};