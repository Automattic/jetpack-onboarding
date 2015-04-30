var React = require('react'),
	SetupProgressStore = require('../stores/setup-progress-store');

/**
 * Show progress through the steps
 **/
module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	percentComplete: function() {
		return SetupProgressStore.getProgressPercent();
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

