var React = require('react'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	Paths = require('../constants/jetpack-onboarding-paths'),
	Button = require('@automattic/dops-components/client/components/button');

function getJetpackProgress() {
	return { 
		jetpackConfigured: SiteStore.getJetpackConfigured()
	};
}

var JetpackJumpstartMenu = React.createClass({
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
				{this.state.jetpackConfigured ? (
					<div></div>
				) : (
					<div>
						Boost traffic, enhance security, and improve performance with a connection to WordPress.com<br />
						<Button style={this.primaryConnectBtn} onClick={this.handleClickConnect}>Connect to WordPress.com</Button>
					</div>
				)}
				
			</div>
		);
	}
});

module.exports = JetpackJumpstartMenu;