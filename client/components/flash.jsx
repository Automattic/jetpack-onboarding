var React = require('react'),
	FlashStore = require('../stores/flash-store');

function getFlashState() {
	return FlashStore.getFlash();
}

var Flash = React.createClass({

	getInitialState: function() {
		var flashState = getFlashState();
		return flashState;
	},

	render: function() {
		if ( this.state.message ) {
			return (<div className={this.state.severity + ' updated'}>{this.state.message}</div>);
		} else {
			return null;
		}
	}
});

module.exports = Flash;