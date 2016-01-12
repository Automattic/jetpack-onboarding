var React = require( 'react'),
	SetupProgressStore = require( 'stores/setup-progress-store'),
	SetupProgressActions = require( 'actions/setup-progress-actions'),
	SpinnerStore = require( 'stores/spinner-store' ),
	SpinnerActions = require( 'actions/spinner-actions'),
	DataStore = require( 'stores/data-store' ),
	Flash = require( '../flash' ),
	GetStarted = require( '../steps/get-started' );

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
module.exports = React.createClass( {
	displayName: 'WelcomeWidget',

	componentDidMount: function() {
		SetupProgressStore.addChangeListener( this._onChange );
		SpinnerStore.addChangeListener( this._onSpinnerChange );
		DataStore.addChangeListener( this._onDataChange );
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener( this._onChange );
		SpinnerStore.removeChangeListener( this._onSpinnerChange );
		DataStore.removeChangeListener( this._onDataChange );
	},

	_onChange: function() {
		this.setState( getSetupProgress() );
	},

	_onSpinnerChange: function() {
		this.setState( { showSpinner: SpinnerStore.showing(), spinnerMessage: SpinnerStore.getMessage() } );
	},

	_onDataChange: function() {
		this.setState( { saving: DataStore.isSaving() } );
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
		SpinnerActions.show( "Testing spinner" );
	},

	handleHideSpinner: function ( e ) {
		e.preventDefault();
		SpinnerActions.hide();
	},

	render: function() {
		return (
			<div>
				{ this._renderDebug() }
				<div className="welcome__wrapper clear">
					{ this._renderSpinner() }
					<div className="welcome__container">
						<Flash />
						{ this._renderSection() }
					</div>
				</div>
			</div>
		);
	},

	_renderSection: function() {
		if ( this.state.newUser ) {
			return ( <GetStarted /> );
		} else {
			return this._renderCurrentView();
		}
	},

	_renderDebug: function() {
		if ( JPS.debug ) {
			return (
				<div className="welcome__debug">
					<a href="#" className="button" onClick={this.handleReset}>Reset Wizard</a>
					<a href="#" className="button" onClick={this.handleShowSpinner}>Show spinner</a>
					<a href="#" className="button" onClick={this.handleHideSpinner}>Hide spinner</a>
				</div>
			);
		} else {
			return null;
		}
	},

	_renderSpinner: function() {
		if ( this.state.showSpinner ) {
			return (
				<div className="welcome__loading-overlay">
					<div className="welcome__loading-message">
						<img className="welcome__loading-spinner" src={ `${JPS.base_url}/img/spinner-2x.gif` } width="16px" height="16px" />
						&nbsp;&nbsp;{ this.state.spinnerMessage }
					</div>
				</div>
			);

		} else {
			return null;
		}
	},

	_renderCurrentView: function() {
		if ( this.state.currentStep ) {
			return ( <this.state.currentStep.welcomeView /> );
		} else {
			return ( <h3>Nothing</h3> );
		}
	},

} );
