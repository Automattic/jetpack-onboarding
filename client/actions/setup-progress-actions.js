var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants'),
	Paths = require('../constants/jetpack-start-paths'),
	FlashActions = require('./flash-actions'),
	SiteActions = require('./site-actions');

module.exports = {
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

	submitTrafficStep: function() {
		SiteActions.configureJetpack(Paths.TRAFFIC_STEP_SLUG).done(function() {
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