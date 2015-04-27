var React = require('react'),
	BackboneReact = require('backbone-react');
	
/**
 * The view for the current welcome step
 **/
module.exports = React.createClass({displayName: "exports",
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			React.createElement("div", {className: "getting-started__sections"}, 
				this.props.model.currentStepView()
			)
		);
	}
});