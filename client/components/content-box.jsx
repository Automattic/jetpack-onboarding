var React = require('react');

var ContentBox = React.createClass({
	render: function() {
		return (
			<div className="welcome__content_box">
				{this.props.children}
				<div className="clear"></div>
			</div>
		);
	}
});

module.exports = ContentBox;