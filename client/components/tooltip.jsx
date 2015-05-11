
var React = require('react');

var Tooltip = React.createClass({
	propTypes: {
		left: React.PropTypes.number.isRequired,  // e.g. 600
		top: React.PropTypes.number.isRequired,   //e.g. 157
		width: React.PropTypes.number.isRequired, //e.g. 320
		title: React.PropTypes.string.isRequired,  // e.g. Distraction-Free Writing
	},

	handleDismiss: function ( e ) {
		e.preventDefault();
	},

	componentDidMount: function () {
		this._recomputePosition();
	},

	componentWillReceiveProps: function () {
		this._recomputePosition();
	},

	getInitialState: function () {
		return {
			realTop: this.props.top
		};
	},

	_recomputePosition: function () {
		var $wrapper = jQuery(React.findDOMNode(this.refs.wrapper));

		this.setState({
			realTop: this.props.top - ($wrapper.outerHeight()/2)
		});
	},

	render: function() {
		return (
			<div ref="wrapper" className="wp-pointer wp-pointer-left" style={{position: 'absolute', width: this.props.width, top: this.state.realTop, left: this.props.left, zIndex: 9999}}>
				<div className="wp-pointer-content">
					<h3>{this.props.title}</h3>
					<p>{this.props.children}</p>
				</div>
				<div className="wp-pointer-arrow">
					<div className="wp-pointer-arrow-inner"></div>
				</div>
			</div>
		);
	}
});

module.exports = Tooltip;