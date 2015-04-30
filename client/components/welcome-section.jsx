var React = require('react'),
	Flash = require('./flash.jsx');
	
/**
 * The view for the current welcome step
 **/
module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<div className="getting-started__sections">
				<Flash />
				{this.props.model.currentStepView()}
			</div>
		);
	}
});