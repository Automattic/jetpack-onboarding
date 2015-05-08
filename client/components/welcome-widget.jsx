var React = require('react'),
	WelcomeMenu = require('./welcome-menu.jsx'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	Flash = require('./flash.jsx'),
	GetStarted = require('./get-started.jsx'),
	SpinnerStore = require('../stores/spinner-store'),
	SpinnerActions = require('../actions/spinner-actions');

function getSetupProgress() {
	return { newUser: SetupProgressStore.isNewUser(), showSpinner: SpinnerStore.showing(), currentStep: SetupProgressStore.getCurrentStep(), allSteps: SetupProgressStore.getAllSteps(), progressPercent: SetupProgressStore.getProgressPercent() };
}

var WelcomeWidget = React.createClass({
	componentDidMount: function() {
		SetupProgressStore.addChangeListener(this._onChange);
		SpinnerStore.addChangeListener(this._onSpinnerChange);
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener(this._onChange);
		SpinnerStore.removeChangeListener(this._onSpinnerChange);
	},

	_onChange: function() {
    	this.setState(getSetupProgress());
  	},

  	_onSpinnerChange: function() {
  		this.setState({ showSpinner: SpinnerStore.showing() });
  	},

	getInitialState: function() {
		return getSetupProgress();
	},

	handleReset: function( e ) {
		e.preventDefault();
		SetupProgressActions.resetData();
	},

	handleShowSpinner: function ( e ) {
		e.preventDefault();
		SpinnerActions.show();
	},

	handleHideSpinner: function ( e ) {
		e.preventDefault();
		SpinnerActions.hide();
	},

  	render: function() {
  		if ( this.state.newUser ) {
  			return this._renderGetStarted();
  		} else {
  			return this._renderWizard();
  		}
	},

	_renderDebug: function() {
		if ( JPS.debug ) {
  			return (<div>
  				<a href="#" className="button" onClick={this.handleReset}>Reset Wizard</a>
  				<a href="#" className="button" onClick={this.handleShowSpinner}>Show spinner</a>
  				<a href="#" className="button" onClick={this.handleHideSpinner}>Hide spinner</a>
  			</div>);
  		} else {
  			return null;
  		}
	},

	_renderGetStarted: function() {
		return (
			<div className="getting-started">
				{this._renderDebug()}
				<div className="getting-started__wrapper">
					{this._renderSpinner()}
					<GetStarted />
				</div>
			</div>
		);
	},

	_renderSpinner: function() {
		if ( this.state.showSpinner ) {
  			return (
  				<div className="loading"></div>
  			);

  		} else {
  			return null;
  		}
	},

	_renderCurrentView: function() {
		if ( this.state.currentStep ) {
  			return (<this.state.currentStep.welcomeView />);
  		} else {
  			return (<h3>Nothing</h3>);
  		}
	},	

	_renderWizard: function() {
	    return (
			<div className="getting-started">
				{this._renderDebug()}
				<div className="getting-started__wrapper">
					{this._renderSpinner()}
					<div className="getting-started__sections">
						<Flash />
						{this._renderCurrentView()}
					</div>

					<WelcomeMenu currentStep={this.state.currentStep} allSteps={this.state.allSteps} progressPercent={this.state.progressPercent}/>
					<div className="clear"></div>
				</div>
			</div>
    	);
	}

});

module.exports = WelcomeWidget;