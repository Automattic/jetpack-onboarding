var React = require('react'),
	WelcomeProgressBar = require('./welcome-progress-bar.jsx');

/**
 * The menu which allows the user to switch steps
 **/
module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	selectStep: function(e) {
		e.preventDefault();
		var slug = jQuery(e.currentTarget).data('step-slug');
		this.props.model.setStep(slug);
	},

	render: function() {
		// var $this = this;
		var currentStep = this.props.model.currentStep();

		var menuItems = this.props.model.steps().map(function ( step ) {
			var title, current = ( currentStep.slug() == step.slug() );

			if ( step.repeatable() ) {
				title = <a href="#" data-step-slug={step.slug()} onClick={this.selectStep}>{step.name()}</a>
			} else {
				title = step.name();
			}
			
			return (
				<li key={step.slug()} className={step.status() + ' ' + (current ? 'current' : null)}>{title}</li>
			);
		}.bind(this) );

		return (
			<div className="getting-started__steps">
				<h3>Your Progress <div style={{marginTop: '7px'}}><WelcomeProgressBar model={this.props.model}/></div></h3>
				
				<ol>
					{menuItems}
				</ol>
			</div>
		)
	}
});