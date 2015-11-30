var React = require('react');

var ContentBox = React.createClass({
	render: function() {
		return (
			<div className="welcome__content-box clear">
				{ this.props.children }
			</div>
		);
	}
});

module.exports = ContentBox;
