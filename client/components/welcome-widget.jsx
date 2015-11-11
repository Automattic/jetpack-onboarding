var React = require('react'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	// Reset = require('@automattic/dops-components/client/components/reset'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	Flash = require('./flash'),
	styles = require('../styles'),
	GetStarted = require('./get-started'),
	SpinnerStore = require('../stores/spinner-store'),
	SpinnerActions = require('../actions/spinner-actions'),
	DataStore = require('../stores/data-store');

function getSetupProgress() {
	return { 
		newUser: SetupProgressStore.isNewUser(), 
		showSpinner: SpinnerStore.showing(), 
		spinnerMessage: SpinnerStore.getMessage(), 
		currentStep: SetupProgressStore.getCurrentStep(), 
		allSteps: SetupProgressStore.getAllSteps(), 
		progressPercent: SetupProgressStore.getProgressPercent() 
	};
}

// TODO: visual "saving" for this.state.saving
var WelcomeWidget = React.createClass({

	styles: {
		wrapper: { position: 'relative' },
		loadingOverlay: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			minHeight: '100%',
			zIndex: 999,
			backgroundColor: 'rgba(255,255,255,0.6)'
		},
		loadingMessage: {
			position: 'absolute',
			width: '50%',
			minWidth: 300,
			borderRadius: 2,
			padding: 20,
			border: '1px solid black',
			backgroundColor: 'white',
			textAlign: 'center',
			left: '50%',
			top: 100,
			transform: 'translate(-50%,-50%)'
		},
		container: {
			float: 'left',
			width: '70%',
			padding: '0 10px'
		},
		menu: {
			marginTop: 25
		}
	},

	componentDidMount: function() {
		SetupProgressStore.addChangeListener(this._onChange);
		SpinnerStore.addChangeListener(this._onSpinnerChange);
		DataStore.addChangeListener(this._onDataChange);
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener(this._onChange);
		SpinnerStore.removeChangeListener(this._onSpinnerChange);
		DataStore.removeChangeListener(this._onDataChange);
	},

	_onChange: function() {
    	this.setState(getSetupProgress());
  	},

  	_onSpinnerChange: function() {
  		this.setState({ showSpinner: SpinnerStore.showing(), spinnerMessage: SpinnerStore.getMessage() });
  	},

  	_onDataChange: function() {
  		this.setState({ saving: DataStore.isSaving() });
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
		SpinnerActions.show("Testing spinner");
	},

	handleHideSpinner: function ( e ) {
		e.preventDefault();
		SpinnerActions.hide();
	},
	

  	render: function() {
  		return (
			<div>
				{this._renderDebug()}
				<div style={this.styles.wrapper}>
					{this._renderSpinner()}
					<div style={this.styles.container}>
						<Flash />
						{this._renderSection()}
					</div>

					<div className="clear"></div>
				</div>
			</div>
		);
	},

	_renderSection: function() {
		if ( this.state.newUser ) {
  			return (<GetStarted />);
  		} else {
  			return this._renderCurrentView();
  		}
	},

	_renderDebug: function() {
		// if ( JPS.debug ) {
  // 			return (<div>
  // 				<a href="#" className="button" onClick={this.handleReset}>Reset Wizard</a>
  // 				<a href="#" className="button" onClick={this.handleShowSpinner}>Show spinner</a>
  // 				<a href="#" className="button" onClick={this.handleHideSpinner}>Hide spinner</a>
  // 			</div>);
  // 		} else {
  			return null;
  		// }
	},

	_renderSpinner: function() {
		if ( this.state.showSpinner ) {
  			return (
  				<div style={this.styles.loadingOverlay}>
  					<div style={this.styles.loadingMessage}>
  						<img src={JPS.base_url+"/img/spinner-2x.gif"} width="16px" height="16px"/>
  						&nbsp;&nbsp;{this.state.spinnerMessage}
  					</div>
  				</div>
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

});

module.exports = WelcomeWidget;