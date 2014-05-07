var JetpackStartWizard = Backbone.View.extend({
	id: 'wizard',
	_currentStep: false,

	initialize: function() {
		this.steps = new Backbone.Collection( [], { model: JetpackStartStep } );
		this.steps.comparator = 'sort';
	},

	currentStep: function() {
		if ( this._currentStep === false )
			this._currentStep = this.steps.first();
		return this._currentStep;
	},

	goToNextStep: function( event ) {
		event.preventDefault();
		if ( this.currentStep() == this.steps.last() ) {
			window.location = _JetpackStart['home_url'] + '?jps_wizard_end';
			return;
		}
		this.currentStep().getView().remove();
		this._currentStep = this.steps.at( this.steps.indexOf( this._currentStep ) + 1 );
		this.render();
		return this;
	},

	getStep: function( step_slug ) {
		return this.steps.findWhere( { slug: step_slug } );
	},

	render: function() {
		jQuery( 'body' ).append( this.currentStep().getView().render().el );
		this.renderProgress();
		return this;
	},

	renderProgress : function() {
		var slug = this._currentStep.get( 'slug' );
		jQuery( 'header .progress li' ).each( function () {
			var li = jQuery( this ).addClass( 'done' );
			if ( li.data( 'step' ) == slug ) {
				return false;
			}
		} )
	},

	addStep: function( step ) {
		this.steps.add( step );
	}
});

var jetpackStartWizard = new JetpackStartWizard();

jQuery( document ).ready( function() {
	jetpackStartWizard.render();
	Backbone.history.start();
});

var JetpackStartStepView = Backbone.View.extend({
	initialize: function() {
		this.templateBase = _.template( jQuery( '#step-template' ).html() );
		this.template = _.template( jQuery( this.template_id ).html() );
	},

	render: function() {
		this.$el.html( this.templateBase( this.model.toJSON() ) );
		this.$el.find( '.container').append( this.template( this.model.toJSON() ) );
		return this;
	},

	goToNextStep: function( event ) {
		jetpackStartWizard.goToNextStep( event );
	}

});

var JetpackStartStep = Backbone.Model.extend({
	defaults: {
		slug: '',
		sort: ''
	},
	getView: function() {
		if ( undefined === this.view ) {
			var View = this.get( 'view' );
			this.view = new View( { model: this } );
		}
		return this.view;
	}
});
