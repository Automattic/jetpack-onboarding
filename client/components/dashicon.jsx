// simple noticon wrapper

var React = require('react');

var Dashicon = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired
	},

	render: function() {
		var { name, ...other } = this.props;

		return (
			<span className={`dashicons dashicons-${name}`} {...other}>
				{this.props.children}
			</span>
		);
	}
});

module.exports = Dashicon;