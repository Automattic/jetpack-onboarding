var React = require('react'),
	FlashStore = require('../stores/flash-store');

function getFlashState() {
	return FlashStore.getFlash();
}

var Flash = React.createClass({
	componentDidMount: function() {
		FlashStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		FlashStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getFlashState());
  	},

	getInitialState: function() {
		var flashState = getFlashState();
		console.log(flashState);
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