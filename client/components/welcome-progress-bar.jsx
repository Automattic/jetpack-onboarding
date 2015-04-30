var React = require('react');

/**
 * Show progress through the steps
 * NOTE: progressPercent MUST be rounded to the nearest 10, i.e. 10, 20, 30, 40...100
 * This is required for the CSS to work (will fix later...)
 **/
var ProgressBar = React.createClass({

	propTypes: {
		progressPercent: React.PropTypes.number.isRequired
	},

	render: function() {
		var classes = 'getting-started__progress progress_'+this.props.progressPercent;
		return (
			<div className={classes}>
				<div className="progress__bar">
					<span></span>
				</div>
				{this.props.progressPercent}% complete
			</div>
		);
	}
});

module.exports = ProgressBar;