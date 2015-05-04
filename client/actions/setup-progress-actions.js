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

	selectNextStep: function() {
		FlashActions.unset();
		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_NEXT,
			slug: Paths.STATS_MONITORING_STEP_SLUG
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
		SiteActions.configureJetpack().done(function() {
			AppDispatcher.dispatch({
		      actionType: JPSConstants.STEP_COMPLETE,
		      slug: Paths.TRAFFIC_STEP_SLUG
		    });
		});	
	},

	submitStatsMonitoringStep: function() {
		SiteActions.configureJetpack().done(function() {
			AppDispatcher.dispatch({
		      actionType: JPSConstants.STEP_COMPLETE,
		      slug: Paths.STATS_MONITORING_STEP_SLUG
		    });
		});	
	}
};