var WelcomeWidget = React.createClass({displayName: "WelcomeWidget",
 	mixins: [Backbone.React.Component.mixin],
  	render: function() {
	    return (
			React.createElement("div", {className: "getting-started"}, 
				React.createElement("div", {className: "getting-started__intro"}, 
					React.createElement("h3", null, "Welcome to your new WordPress site!"), 

					React.createElement("p", {className: "getting-started__subhead"}, "Let's get your new site set up as quickly as possible.")
				), 

				React.createElement(WelcomeSection, {model: this.props.model}), 
				React.createElement(WelcomeWizardMenu, {model: this.props.model})
			)
    	);
	}
});

/**
 * The view for the current welcome step
 **/
var WelcomeSection = React.createClass({displayName: "WelcomeSection",
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			React.createElement("div", {className: "getting-started__sections"}, 
				this.props.model.currentStepView()
			)
		);
	}
});

/**
 * The menu which allows the user to switch steps
 **/
var WelcomeWizardMenu = React.createClass({displayName: "WelcomeWizardMenu",
	mixins: [Backbone.React.Component.mixin],

	selectStep: function(e) {
		e.preventDefault();
		slug = jQuery(e.currentTarget).data('step-slug');
		this.props.model.setStep(slug);
	},

	render: function() {
		// var $this = this;
		currentStep = this.props.model.currentStep();

		var menuItems = this.props.model.steps().map(function ( step ) {
			current = ( currentStep.slug() == step.slug() );

			if ( step.repeatable() ) {
				title = React.createElement("a", {href: "#", "data-step-slug": step.slug(), onClick: this.selectStep}, step.name())
			} else {
				title = step.name();
			}
			
			return (
				React.createElement("li", {className: step.status() + ' ' + (current ? 'current' : null)}, title)
			);
		}.bind(this) );

		return (
			React.createElement("div", {className: "getting-started__steps"}, 
				React.createElement("h3", null, "Your Progress"), 
				React.createElement("ol", null, 
					menuItems
				)
			)
		)
	}
});

// base class for welcome steps
WelcomeStepModel = Backbone.Model.extend({
	defaults: {
		// has a value been selected / action been taken from within JPS?
		completed: false,
		// has it been viewed?
		viewed: false,
		// has it been skipped?
		skipped: false,
		// is the feature actually configured? (sometimes this is true even if they haven't done the step, e.g. theme)
		configured: false
	},

	initialize: function() {
		if ( this.attributes.slug == null ) {
			this.attributes.slug = this.attributes.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
		}
	},
	
	// is this step repeatable? For example, "create admin account" perhaps _should_ only be done once, but "Site Title" can be repeated
	// this is something you'd typically set in a superclass
	repeatable: function() { return true; },

	name: function() { return this.get('name'); },

	slug: function() { return this.get('slug'); },

	status: function() {
		if ( this.get('completed') ) {
			return "completed";
		} else if ( this.get('skipped') ) {
			return "skipped";
		} else { 
			return ""; 
		}
	},

	welcomeView: function() {
		return (React.createElement(this.attributes.welcomeView, {model: this}));
	}
});

// placeholder for welcome steps that are always completed by the time we view them
DummyWelcomeStepModel = WelcomeStepModel.extend({
	defaults: {
		completed: true, viewed: true, skipped: false, configured: true
	},

	repeatable: function() { return false; },
});

DummyWelcomeStepView = React.createClass({displayName: "DummyWelcomeStepView",
	render: function() {
		return (
			React.createElement("h3", null, "You should never see this")
		);
	}
});

SiteTitleStepView = React.createClass({displayName: "SiteTitleStepView",
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			React.createElement("div", {className: "welcome__section", id: "welcome__site-title"}, 
				React.createElement("h4", null, "Set your site title"), 

				React.createElement("form", null, 
					React.createElement("input", {type: "text", name: "site_title", id: "site-title", autocomplete: "off", value: "BLOG NAME", 
					       placeholder: "Site Title (this can be changed later)"}), 

					React.createElement("p", {className: "submit"}, 
						React.createElement("input", {type: "submit", name: "save", className: "button button-primary button-large", value: "Save"}), 
						React.createElement("a", {className: "skip", href: "#"}, "Skip this step")
					)
				), 
				React.createElement("div", {className: "welcome__helper"}, 
					"Stuck? Here are some ideas to get you going:", 
					React.createElement("ul", null, 
						React.createElement("li", null, 
							React.createElement("small", null, React.createElement("em", null, "Your company name: \"ACME Consulting\""))
						), 
						React.createElement("li", null, 
							React.createElement("small", null, 
								React.createElement("em", null, "What you do: \"Quality gardening tools by ACME\"")
							)
						), 
						React.createElement("li", null, 
							React.createElement("small", null, 
								React.createElement("em", null, "What you will write about: \"Richard\\'s Travel Blog\"")
							)
						)
					)
				)
			)
		);
	}
});

SiteTitleStepModel = WelcomeStepModel.extend({
	//TODO - check current site title, etc.
	defaults: _.extend({},WelcomeStepModel.prototype.defaults, { name: "Site Title", welcomeView: SiteTitleStepView })
});

LayoutStepView = React.createClass({displayName: "LayoutStepView",
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			React.createElement("h3", null, "View for Layout")
		);
	}
});

LayoutStepModel = WelcomeStepModel.extend({
	//TODO - check current site title, etc.
	defaults: _.extend({},WelcomeStepModel.prototype.defaults, { name: "Pick a layout", welcomeView: LayoutStepView })
});

/**
 * WelcomeWizard has a current step and an array of steps to be completed
 */
WelcomeWizardModel = Backbone.Model.extend({
	defaults: {
		steps: new Backbone.Collection([
				new DummyWelcomeStepModel({ name: "Sign up" }),
				new DummyWelcomeStepModel({ name: "Create admin account" }),
				new DummyWelcomeStepModel({ name: "Verify email address" }),
				new SiteTitleStepModel(),
				new LayoutStepModel()
			],{
				model: WelcomeStepModel
			})
	},

	initialize: function() {
		// try to ensure there's always a current step
		if ( this.get('currentStep') == null ) {
			pendingStep = this.get('steps').findWhere( { completed: false } );
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
		currentStep = this.currentStep();
		if ( currentStep != null ) {
			return currentStep.welcomeView();
		} else {
			return (React.createElement("h4", null, "Nothing to see here"));
		}
	}
});

// model for selected 
var ThemeModel = WelcomeStepModel.extend({});

// see: http://magalhas.github.io/backbone-react-component/
var WelcomeModel = WelcomeStepModel.extend({
	foo: "bar"
});