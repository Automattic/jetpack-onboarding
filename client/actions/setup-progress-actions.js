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

	completeStep: function(slug) {
		
		var step = SetupProgressStore.getStepFromSlug(slug);

		if ( ! step.completed ) {
			SpinnerActions.show();
			WPAjax.
			  	post(JPS.step_actions.complete, { step: slug }).
			  	done( function(data) {
				    AppDispatcher.dispatch({
						actionType: JPSConstants.STEP_COMPLETE,
						slug: slug
				    });
			  	}).
				fail( function(msg) {
					FlashActions.error(msg);
				}).
				always( function() { 
					SpinnerActions.hide(); 
				});
		} else {
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_COMPLETE,
				slug: slug
		    });
		}
	},

	// mark current step as skipped and move on
	skipStep: function() {
		FlashActions.unset();
		
		var step = SetupProgressStore.getCurrentStep();

		if ( ! step.skipped ) {
			SpinnerActions.show();
		    WPAjax.
				post(JPS.step_actions.skip, { step: step.slug }).
				done( function(data) {
					AppDispatcher.dispatch({
						actionType: JPSConstants.STEP_SKIP
				    });
				}).
				fail( function(msg) {
					FlashActions.error(msg);
				}).
				always( function() { 
					SpinnerActions.hide();
				});
		 } else {
		 	AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_SKIP
		    });
		 }
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
		SiteActions.saveTitle().done(function() {
			this.completeStep(Paths.SITE_TITLE_STEP_SLUG);
		}.bind(this));
	},

	submitLayoutStep: function(layout) {
		SiteActions.setLayout(layout).done(function() {
			this.completeStep(Paths.LAYOUT_STEP_SLUG);
		}.bind(this));
	},

	submitDesignStep: function(themeId) {
		SiteActions.setActiveTheme(themeId).done(function() {
			this.completeStep(Paths.DESIGN_STEP_SLUG);
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