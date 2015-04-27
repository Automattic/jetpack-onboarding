var React = require('react');
	
/**
 * The view for the current welcome step
 **/
module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<div className="getting-started__sections">
				{this.props.model.currentStepView()}
			</div>
		);
	}
});