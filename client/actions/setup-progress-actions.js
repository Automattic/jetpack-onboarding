var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants'),
	Paths = require('../constants/jetpack-start-paths'),
	FlashActions = require('./flash-actions'),
	SiteActions = require('./site-actions'),
	SpinnerActions = require('./spinner-actions.js'),
	WPAjax = require('../utils/wp-ajax'),
	SetupProgressStore = require('../stores/setup-progress-store');

var SetupProgressActions = {
	resetData: function() {
		WPAjax.
			post(JPS.site_actions.reset_data).
			fail( function ( msg ) {
				FlashActions.error("Failed to save data: " + msg);
			});
		AppDispatcher.dispatch({
	      	actionType: JPSConstants.RESET_DATA
	    });
	},

	completeStep: function(slug) {
		
		var step = SetupProgressStore.getStepFromSlug(slug);

		if ( ! step.completed ) {
			WPAjax.
			  	post(JPS.step_actions.complete, { step: slug }).
				fail( function(msg) {
					FlashActions.error(msg);
				});
		} 

		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_COMPLETE,
			slug: slug
	    });
	},

	// mark current step as skipped and move on
	skipStep: function() {
		FlashActions.unset();
		
		var step = SetupProgressStore.getCurrentStep();

		if ( ! step.skipped ) {
		    WPAjax.
				post(JPS.step_actions.skip, { step: step.slug }).
				fail( function(msg) {
					FlashActions.error(msg);
				});
		}

		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_SKIP
	    });
	},

	getStarted: function() {
	    WPAjax.
			post(JPS.step_actions.start).
			fail( function(msg) {
				FlashActions.error(msg);
			});

		AppDispatcher.dispatch({
	      actionType: JPSConstants.STEP_GET_STARTED
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

	submitTitleStep: function() {
		SiteActions.saveTitleAndDescription().done(function() {
			this.completeStep(Paths.SITE_TITLE_STEP_SLUG);
		}.bind(this));
	},

	submitLayoutStep: function(layout) {
		SiteActions.setLayout(layout).done(function() {
			this.completeStep(Paths.LAYOUT_STEP_SLUG);
		}.bind(this));
	},

	submitJetpackJumpstart: function() {
		SiteActions.enableJumpstart().done(function() {
			this.completeStep(Paths.JETPACK_MODULES_STEP_SLUG);
		}.bind(this));
	},

	saveDesignStep: function() {
		this.completeStep(Paths.DESIGN_STEP_SLUG);
	},

	submitTrafficStep: function() {
		SiteActions.activateJetpackModule('publicize').done(function() {
			this.completeStep(Paths.TRAFFIC_STEP_SLUG);
		}.bind(this));	
	},

	submitStatsMonitoringStep: function() {
		SiteActions.activateJetpackModule('stats').done(function() {
			this.completeStep(Paths.STATS_MONITORING_STEP_SLUG);
		}.bind(this));	
	}
};

module.exports = SetupProgressActions;