var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-onboarding-constants'),
	Paths = require('../constants/jetpack-onboarding-paths'),
	FlashActions = require('./flash-actions'),
	SiteActions = require('./site-actions'),
	WPAjax = require('../utils/wp-ajax'),
	SpinnerActions = require('./spinner-actions'),
	SetupProgressStore = require('stores/setup-progress-store'),
	SiteStore = require('stores/site-store');

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
		return this._recordStepComplete(step, meta);
	},

	completeAndNextStep: function(slug, meta) {
		this.completeStep(slug, meta).always(function() {
			// getCurrentStep _should_ return the correct step slug for the 'next' step here... 
			// this needs to be in the callback because otherwise there's a chance
			// that COMPLETE could be registered in analytics after VIEWED
			this._recordStepViewed( SetupProgressStore.getCurrentStep() );
		}.bind(this));

		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_NEXT
		});
	},

	// mark current step as skipped and move on
	skipStep: function() {
		FlashActions.unset();

		var step = SetupProgressStore.getCurrentStep();

		if (!step.skipped) {
			this._recordStepSkipped( step );
		}

		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_SKIP
		});	
	},

	setCurrentStep: function( stepSlug ) {
		FlashActions.unset();
		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_SELECT,
			slug: stepSlug
		});
		this._recordStepViewed( { slug: stepSlug } );
	},

	getStarted: function() {
		WPAjax.
			post(JPS.step_actions.start).
			fail(function(msg) {
				FlashActions.error(msg);
			});

		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_GET_STARTED
		});
	},

	disableJPS: function() {
		SpinnerActions.show("");
		WPAjax.
			post(JPS.step_actions.disable).
			fail(function(msg) {
				SpinnerActions.hide();
				FlashActions.error(msg);
			}).
			always(function() {
				window.location.reload();
			});
	},

	// moves on to the next step, but doesn't mark it as "skipped"
	selectNextStep: function() {
		FlashActions.unset();
		AppDispatcher.dispatch({
			actionType: JPSConstants.STEP_NEXT
		});
		this._recordStepViewed( SetupProgressStore.getCurrentStep() );
	},

	submitTitleStep: function( title, description ) {
		SiteActions.saveTitleAndDescription( title, description );
		this.completeAndNextStep(Paths.SITE_TITLE_STEP_SLUG);
	},

	submitLayoutStep: function( layout ) {
		SiteActions.setLayout( layout ).done( function() {
			var step = SetupProgressStore.getStepFromSlug( Paths.IS_BLOG_STEP_SLUG );
			if ( ! step.completed ) {
				this.completeStep( Paths.IS_BLOG_STEP_SLUG );
			}
			this.completeAndNextStep( Paths.HOMEPAGE_STEP_SLUG );
		}.bind( this ) );
	},

	confirmHomepageStep: function( layout ) {
		this.completeStep( Paths.IS_BLOG_STEP_SLUG );
		this.setCurrentStep( Paths.HOMEPAGE_STEP_SLUG );
	},

	createContactPage: function(contactPage) {
		SiteActions.createContactUsPage(contactPage);
		this.completeStep(Paths.CONTACT_PAGE_STEP_SLUG);
		this.selectNextStep();
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
	},

	_recordStepViewed: function( step ) {
		// record analytics to say we viewed the next step
  		return WPAjax.
  			post(JPS.step_actions.view, { 
  				step: step.slug 
  			}, { 
  				quiet: true 
  			});
	},

	_recordStepComplete: function( step, meta ) {
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

	_recordStepSkipped: function( step ) {
		return WPAjax.
			post(JPS.step_actions.skip, {
				step: step.slug
			}).
			fail(function(msg) {
				FlashActions.error(msg);
			});
	}
};

module.exports = SetupProgressActions;