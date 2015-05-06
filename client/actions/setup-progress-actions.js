var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants'),
	Paths = require('../constants/jetpack-start-paths'),
	FlashActions = require('./flash-actions'),
	SiteActions = require('./site-actions'),
	SpinnerActions = require('./spinner-actions.js'),
	WPAjax = require('../utils/wp-ajax');

var SetupProgressActions = {
	resetData: function() {
		// resets all wizard data on the server
		SpinnerActions.show();
		WPAjax.
			post(JPS.site_actions.reset_data).
			done( function ( data ) {
				FlashActions.notice("Reset data");
				AppDispatcher.dispatch({
			      actionType: JPSConstants.RESET_DATA
			    });
			}).
			fail( function ( msg ) {
				FlashActions.error("Failed to save data: " + msg);
			}).
			always( function() {
				SpinnerActions.hide();
			});
	},

	setCurrentStep: function(slug) {
		FlashActions.unset();
		AppDispatcher.dispatch({
	      actionType: JPSConstants.STEP_SELECT,
	      slug: slug
	    });
	},

	// moves on to the next step, but doesn't mark it as "skipped"
	selectNextStep: function() {
		FlashActions.unset();
		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_NEXT
	    });
	},

	completeAndNextStep: function(slug) {
		FlashActions.unset();
		AppDispatcher.dispatch({
	      actionType: JPSConstants.STEP_COMPLETE_AND_NEXT,
	      slug: slug
	    });
	},

	// mark current step as skipped and move on
	skipStep: function() {
		FlashActions.unset();
		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_SKIP
	    });
	},

	submitTitleStep: function() {
		SiteActions.saveTitle().done(function() {
			AppDispatcher.dispatch({
		      actionType: JPSConstants.STEP_COMPLETE,
		      slug: Paths.SITE_TITLE_STEP_SLUG
		    });
		});
	},

	submitLayoutStep: function(layout) {
		SiteActions.setLayout(layout).done(function() {
			AppDispatcher.dispatch({
		      actionType: JPSConstants.STEP_COMPLETE,
		      slug: Paths.LAYOUT_STEP_SLUG
		    });
		});
	},

	submitDesignStep: function(themeId) {
		SiteActions.setActiveTheme(themeId).done(function() {
			AppDispatcher.dispatch({
		      actionType: JPSConstants.STEP_COMPLETE,
		      slug: Paths.DESIGN_STEP_SLUG
		    });
		});	
	},

	saveDesignStep: function() {
		AppDispatcher.dispatch({
	      actionType: JPSConstants.STEP_COMPLETE,
	      slug: Paths.DESIGN_STEP_SLUG
	    });
	},

	submitTrafficStep: function() {
		SiteActions.activateJetpackModule('publicize').done(function() {
			AppDispatcher.dispatch({
		      actionType: JPSConstants.STEP_COMPLETE,
		      slug: Paths.TRAFFIC_STEP_SLUG
		    });
		});	
	},

	submitStatsMonitoringStep: function() {
		SiteActions.activateJetpackModule('stats').done(function() {
			AppDispatcher.dispatch({
		      actionType: JPSConstants.STEP_COMPLETE,
		      slug: Paths.STATS_MONITORING_STEP_SLUG
		    });
		});	
	}
};

module.exports = SetupProgressActions;