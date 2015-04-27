var React = require('react'),
	BackboneReact = require('backbone-react');

/**
 * The menu which allows the user to switch steps
 **/
module.exports = React.createClass({displayName: "exports",
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