var React = require('react');

/**
 * Show progress through the steps
 **/
module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	percentComplete: function() {
		var numSteps = this.props.model.get('steps').length;
		var completedSteps = this.props.model.get('steps').where({completed: true}).length;
		var percentComplete = (completedSteps / numSteps) * 100;

		return Math.round(percentComplete / 10) * 10;;
	},

	render: function() {
		var classes = 'getting-started__progress progress_'+this.percentComplete();
		return (
			<div className={classes}>
				<div className="progress__bar">
					<span></span>
				</div>
				{this.percentComplete()}% complete
			</div>
		);
	}
});

