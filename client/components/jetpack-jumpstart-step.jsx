var React = require('react'),
	SkipButton = require('./skip-button.jsx'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	Paths = require('../constants/jetpack-start-paths'), 
	SetupProgressActions = require('../actions/setup-progress-actions');

function getJetpackState() {
	return {
		jetpackConfigured: SiteStore.getJetpackConfigured(),
		jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled(),
		showModules: false
	};
}

var JetpackJumpstart = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getJetpackState());
  	},

	getInitialState: function() {
		return getJetpackState();
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		SiteActions.configureJetpack(Paths.JETPACK_MODULES_STEP_SLUG);
	},

	handleEnableJumpstart: function (e) {
		e.preventDefault();

		SetupProgressActions.submitJetpackJumpstart();
	},

	handleNext: function (e) {
		e.preventDefault();

		SetupProgressActions.completeAndNextStep(Paths.STATS_MONITORING_STEP_SLUG);
	},

	hideJumpstartModules: function (e) {
		e.preventDefault();
		this.setState({showModules: false});
	},

	showJumpstartModules: function (e) {
		e.preventDefault();
		this.setState({showModules: true});
	},

	render: function() {
		var component, jetpackCopy, modules, moduleButton;

		var jetpackCopy = (
			<p>
				To immediately boost performance, security, and engagement, we recommend activating Manage, Carousel, Photon, Related Posts, Jetpack Single Sign On and a few others. 
			</p>
		)

		if ( this.state.showModules ) {
			moduleButton = (
				<a href="#" className="skip" onClick={this.hideJumpstartModules}>Hide modules</a>
			);
		} else {
			moduleButton = (
				<a href="#" className="skip" onClick={this.showJumpstartModules}>Show more information</a>
			)
		}

		if ( ! this.state.jetpackConfigured ) {
			component = (
				<div>
					{jetpackCopy}
					<a href="#" className="download-jetpack" onClick={this.handleJetpackConnect}>Jump Start</a>
					<p>
						{moduleButton}&nbsp;&nbsp;
						<SkipButton />
					</p>
				</div>
			);
		} else if ( ! this.state.jumpstartEnabled ) {
			component = (
				<div>				
					{jetpackCopy}
					<a href="#" className="button button-primary button-large" onClick={this.handleEnableJumpstart}>Enable Jumpstart Modules</a>
					<p>
						{moduleButton}&nbsp;&nbsp;
						<SkipButton />
					</p>
				</div>
			);
		} else {
			component = (
				<div>
					You have successfully enabled Jetpack Jump Start for stats, monitoring, carousels, social plugins, and more!
					<p>
						{moduleButton}&nbsp;&nbsp;
						<input type="submit" name="save" className="button button-primary button-large" onClick={this.handleNext} value="Continue" />
					</p>
				</div>
			);
		}

		if ( this.state.showModules ) {
			var moduleDescriptions = JPS.jetpack.jumpstart_modules.map( function (module) {
				return (
					<div className="welcome__jumpstart_module">
						<strong>{module.name}</strong>
						<small className="jumpstart_module__description" dangerouslySetInnerHTML={{__html: module.description}}></small>
					</div>
				)
			});

			modules = (
				<div>
					<hr />
					<div className="welcome__jumpstart_modules">
						{moduleDescriptions}
					</div>
				</div>
			);
		} else {
			modules = null;
		}		

		return (
			<div className="welcome__section" id="welcome__stats">
				<h4>Jump Start your site</h4>
				<div className="welcome__connect">
					{component}
					{modules}
				</div>
			</div>
		);
	}
});

module.exports = JetpackJumpstart;