var React = require('react'),
	SiteStore = require('../stores/site-store'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SiteActions = require('../actions/site-actions'),
	Paths = require('../constants/jetpack-start-paths');

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
		console.log("clicked");
		var nextStepSlug, nextStep = SetupProgressStore.getNextPendingStep();
		nextStepSlug = nextStep ? nextStep.slug : Paths.JETPACK_MODULES_STEP_SLUG;
		SiteActions.configureJetpack(nextStepSlug);
	},

	style: {
		color: 'black',
		fontSize: 12,
		marginLeft: 20
	},

	render: function() {
		return (
			<div style={this.style}>
				{this.state.jetpackConfigured ? (
					<div></div>
				) : (
					<div>
						Boost traffic, enhance security, and improve performance with a connection to WordPress.com<br />
						<a className="button button-primary button-large" href="#" onClick={this.handleClickConnect}>Connect to WordPress.com</a>
					</div>
				)}
				
			</div>
		);
	}
});

module.exports = JetpackJumpstartMenu;