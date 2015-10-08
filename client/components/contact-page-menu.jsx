var React = require('react'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	Paths = require('../constants/jetpack-start-paths');

function getJetpackProgress() {
	return {
		contactPageURL: SiteStore.getContactPageURL()
	};
}

var ContactPageMenu = React.createClass({
	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getJetpackProgress());
  	},

  	getInitialState: function() {
		return getJetpackProgress();
	},

	handleClickConnect: function(e) {
		e.preventDefault();
		SiteActions.configureJetpack(Paths.JETPACK_MODULES_STEP_SLUG);
	},

	style: {
		color: 'black',
		fontSize: 12,
		marginTop: 5,
		marginLeft: 20,
	},

	primaryConnectBtn: {
		marginTop: 10,
		marginBottom: 20,
	},

	render: function() {
		return (
			<div style={this.style}>
				{this.state.contactPageURL ? (
					<div>
						View your starter <a href={this.state.contactPageURL} target="_blank">Contact Us</a> page.
						<br/>
						<small>(The form requires a free Jetpack connection)</small>
					</div>
				) : (
					<div></div>
				)}
				
			</div>
		);
	}
});

module.exports = ContactPageMenu;