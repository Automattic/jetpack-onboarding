var WelcomeWidget = React.createClass({
 	mixins: [Backbone.React.Component.mixin],
  	render: function() {
	    return (
			<div className="getting-started">
				<div className="getting-started__intro">
					<h3>Welcome to your new WordPress site!</h3>

					<p className="getting-started__subhead">Let's get your new site set up as quickly as possible.</p>
				</div>

				<WelcomeSection model={this.props.model}/>
				<WelcomeWizardMenu model={this.props.model}/>
			</div>
    	);
	}
});

/**
 * The view for the current welcome step
 **/
var WelcomeSection = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<div className="getting-started__sections">
				{this.props.model.currentStepView()}
			</div>
		);
	}
});

/**
 * The menu which allows the user to switch steps
 **/
var WelcomeWizardMenu = React.createClass({
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
				title = <a href="#" data-step-slug={step.slug()} onClick={this.selectStep}>{step.name()}</a>
			} else {
				title = step.name();
			}
			
			return (
				<li className={step.status() + ' ' + (current ? 'current' : null)}>{title}</li>
			);
		}.bind(this) );

		return (
			<div className="getting-started__steps">
				<h3>Your Progress</h3>
				<ol>
					{menuItems}
				</ol>
			</div>
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
		return (<this.attributes.welcomeView model={this}/>);
	}
});

// placeholder for welcome steps that are always completed by the time we view them
DummyWelcomeStepModel = WelcomeStepModel.extend({
	defaults: {
		completed: true, viewed: true, skipped: false, configured: true
	},

	repeatable: function() { return false; },
});

DummyWelcomeStepView = React.createClass({
	render: function() {
		return (
			<h3>You should never see this</h3>
		);
	}
});

SiteTitleStepView = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<div className="welcome__section" id="welcome__site-title">
				<h4>Set your site title</h4>

				<form>
					<input type="text" name="site_title" id="site-title" autocomplete="off" value="BLOG NAME"
					       placeholder="Site Title (this can be changed later)"/>

					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" value="Save"/>
						<a className="skip" href="#">Skip this step</a>
					</p>
				</form>
				<div className="welcome__helper">
					Stuck? Here are some ideas to get you going:
					<ul>
						<li>
							<small><em>Your company name: "ACME Consulting"</em></small>
						</li>
						<li>
							<small>
								<em>What you do: "Quality gardening tools by ACME"</em>
							</small>
						</li>
						<li>
							<small>
								<em>What you will write about: "Richard\'s Travel Blog"</em>
							</small>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});

SiteTitleStepModel = WelcomeStepModel.extend({
	//TODO - check current site title, etc.
	defaults: _.extend({},WelcomeStepModel.prototype.defaults, { name: "Site Title", welcomeView: SiteTitleStepView })
});

LayoutStepView = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<h3>View for Layout</h3>
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
			return (<h4>Nothing to see here</h4>);
		}
	}
});

// model for selected 
var ThemeModel = WelcomeStepModel.extend({});

// see: http://magalhas.github.io/backbone-react-component/
var WelcomeModel = WelcomeStepModel.extend({
	foo: "bar"
});