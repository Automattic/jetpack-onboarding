
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

	// componentDidUpdate: function () {
	// 	this._recomputePosition();
	// },

	componentWillReceiveProps: function () {
		this._recomputePosition();
	},

	getInitialState: function () {
		return {
			realTop: this.props.top,
			realLeft: this.props.left
		};
	},

	_recomputePosition: function () {
		console.log("recomputing position");

		var $wrapper = jQuery(React.findDOMNode(this.refs.wrapper));

		this.setState({
			realTop: this.props.top - ($wrapper.outerHeight()/2),
			realLeft: this.props.left
		});

		console.log(this.state);
	},

	render: function() {
		return (
			<div ref="wrapper" className="wp-pointer wp-pointer-left" style={{position: 'absolute', width: this.props.width, top: this.state.realTop, left: this.state.realLeft, zIndex: 9999}}>
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