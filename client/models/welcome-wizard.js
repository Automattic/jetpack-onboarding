var WelcomeStepModel = require('./welcome-step'),
	DummyWelcomeStepModel = require('./dummy-welcome-step'),
	SiteTitleStepModel = require('./site-title-step'),
	LayoutStepModel = require('./layout-step'),
	StatsMonitoringStepModel = require('./stats-monitoring-step'),
	DesignStepModel = require('./design-step'),
	GetTrafficStepModel = require('./get-traffic-step'),
	AdvancedSettingsStepModel = require('./advanced-settings-step');

/**
 * WelcomeWizard has a current step and an array of steps to be completed
 */
module.exports = Backbone.Model.extend({
	defaults: {
		steps: new Backbone.Collection([
				new DummyWelcomeStepModel({ name: "Sign up" }),
				new DummyWelcomeStepModel({ name: "Create admin account" }),
				new DummyWelcomeStepModel({ name: "Verify email address" }),
				new SiteTitleStepModel(),
				new LayoutStepModel(),
				new StatsMonitoringStepModel(),
				new DesignStepModel(),
				new GetTrafficStepModel(),
				new AdvancedSettingsStepModel()
			],{
				model: WelcomeStepModel
			})
	},

	initialize: function() {
		// try to ensure there's always a current step
		if ( this.get('currentStep') == null ) {
			var pendingStep = this.get('steps').findWhere( { completed: false } );
			if ( pendingStep != null ) {
				this.setStep(pendingStep.slug()); // also sets the window location hash
			}
		}
	},

	steps: function() { return this.get('steps'); },
	
	setStep: function(stepSlug) {
		this.findStep( stepSlug, function(step) {
			window.location.hash = 'welcome/steps/'+stepSlug;
			this.set('currentStep', step);
		}.bind(this) );
	},

	findStep: function(stepSlug, callback) {
		this.get('steps').each(function(step) {
			if( step.slug() == stepSlug ) {
				callback(step);
			}
		}.bind(this) );
	},

	currentStep: function() {
		return this.get('currentStep');
	},

	currentStepView: function() {
		var currentStep = this.currentStep();
		if ( currentStep != null ) {
			return currentStep.welcomeView();
		} else {
			//FIXME - this should never be invoked if we design things right...
			//or perhaps it should render an "All Done!" view?
			return "<h4>Nothing to see here</h4>";
		}
	},

	// nextStep: function() {
		
	// }
});