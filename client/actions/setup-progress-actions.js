var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-onboarding-constants'),
	Paths = require('../constants/jetpack-onboarding-paths'),
	FlashActions = require('./flash-actions'),
	SiteActions = require('./site-actions'),
	WPAjax = require('../utils/wp-ajax'),
	SpinnerActions = require('./spinner-actions'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SiteStore = require('../stores/site-store');

var SetupProgressActions = {
	resetData: function() {
		WPAjax.
		post(JPS.site_actions.reset_data).
		fail(function(msg) {
			FlashActions.error("Failed to save data: " + msg);
		});
		AppDispatcher.dispatch({
			actionType: JPSConstants.RESET_DATA
		});
	},

	completeStep: function(slug, meta) {
		var step = SetupProgressStore.getStepFromSlug(slug);

		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_COMPLETE,
			slug: slug
		});

		// NOTE: this needs to come after the dispatch, so that the completion % 
		// is already updated and can be included in the metadata
		return this._recordComplete(step, meta);
	},

	completeAndNextStep: function(slug, meta) {
		SpinnerActions.show("Loading");
		this.completeStep(slug, meta).always(function() {
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_NEXT
			});
			SpinnerActions.hide();
		});
	},

	_recordComplete: function(step, meta) {
		if (typeof(meta) === 'undefined') {
			meta = {};
		}

		meta.completion = SetupProgressStore.getProgressPercent();

		return WPAjax.
		post(JPS.step_actions.complete, {
			step: step.slug,
			data: meta
		}).
		fail(function(msg) {
			FlashActions.error(msg);
		});
	},

	// mark current step as skipped and move on
	skipStep: function() {
		FlashActions.unset();

		var step = SetupProgressStore.getCurrentStep();

		if (!step.skipped) {
			SpinnerActions.show("Loading");
			WPAjax.
			post(JPS.step_actions.skip, {
				step: step.slug
			}).
			fail(function(msg) {
				FlashActions.error(msg);
			}).always(function() {
				SpinnerActions.hide();
				AppDispatcher.dispatch({
					actionType: JPSConstants.STEP_SKIP
				});	
			});
		} else {
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_SKIP
			});	
		}

		
	},

	getStarted: function() {
		SpinnerActions.show("Loading");
		WPAjax.
		post(JPS.step_actions.start).
		fail(function(msg) {
			FlashActions.error(msg);
		}).
		always(function() {
			SpinnerActions.hide();
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_GET_STARTED
			});
		});
	},

	disableJPS: function() {
		SpinnerActions.show("");
		WPAjax.
		post(JPS.step_actions.disable).
		fail(function(msg) {
			FlashActions.error(msg);
		}).
		always(function() {
			window.location.reload();
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

	submitTitleStep: function() {
		SiteActions.saveTitleAndDescription().done(function() {
			this.completeAndNextStep(Paths.SITE_TITLE_STEP_SLUG);
		}.bind(this));
	},

	submitLayoutStep: function(layout) {
		SiteActions.setLayout(layout).done(function() {
			this.completeAndNextStep(Paths.LAYOUT_STEP_SLUG);
		}.bind(this));
	},

	createContactPage: function(contactPage) {
		SpinnerActions.show("Creating Page");
		return SiteActions.createContactUsPage(contactPage).
			done( function() {
				this.completeStep(Paths.CONTACT_PAGE_STEP_SLUG);
			}.bind(this)).
			always( function() {
				SpinnerActions.hide();
			});

		// done(function() {
		// 	this.completeAndNextStep(Paths.CONTACT_PAGE_STEP_SLUG);
		// }.bind(this));
	},

	skipContactPageBuild: function() {
		this.completeAndNextStep(Paths.CONTACT_PAGE_STEP_SLUG);
	},

	submitJetpackJumpstart: function() {
		SiteActions.enableJumpstart().done(function() {
			this.completeStep(Paths.JETPACK_MODULES_STEP_SLUG);
		}.bind(this));
	},

	setActiveTheme: function(theme) {
		SiteActions.setActiveTheme(theme).done(function() {
			this.completeStep(Paths.DESIGN_STEP_SLUG, {
				themeId: theme.id
			});
		}.bind(this));
	},

	saveDesignStep: function() {
		this.completeAndNextStep(Paths.DESIGN_STEP_SLUG, {
			themeId: SiteStore.getActiveThemeId()
		});
	}
};

module.exports = SetupProgressActions;