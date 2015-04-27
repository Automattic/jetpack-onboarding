var React = require('react'),
	BackboneReact = require('backbone-react');

/**
 * The menu which allows the user to switch steps
 **/
module.exports = React.createClass({
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