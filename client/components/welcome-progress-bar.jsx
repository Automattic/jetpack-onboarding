var React = require('react');

/**
 * Show progress through the steps
 **/
module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<div className="getting-started__progress progress_10">
				<div className="progress__bar">
					<span></span>
				</div>
				10% complete
			</div>
		);
	}
});

