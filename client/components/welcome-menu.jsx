var React = require('react'),
	WelcomeProgressBar = require('./welcome-progress-bar.jsx'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions');

/**
 * The menu which allows the user to switch steps
 **/
var WelcomeMenu = React.createClass({
	
	componentDidMount: function() {
		SetupProgressStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState({ currentStep: SetupProgressStore.getCurrentStep() });
  	},

	getInitialState: function() {
		return { currentStep: SetupProgressStore.getCurrentStep() };
	},

	selectStep: function(e) {
		e.preventDefault();
		
		var slug = jQuery(e.currentTarget).data('step-slug');

		SetupProgressActions.setCurrentStep(slug);
	},

	render: function() {

		var menuItems = SetupProgressStore.allSteps().map(function ( step ) {
			var title, current;
			if ( this.state.currentStep ) {
				current = ( this.state.currentStep.slug() == step.slug() );
			}

			if ( step.repeatable() ) {
				title = <a href="#" data-step-slug={step.slug()} onClick={this.selectStep}>{step.name()}</a>
			} else {
				title = step.name();
			}
			
			return (
				<li key={step.slug()} className={step.status() + ' ' + (current ? 'current' : null)}>{title}</li>
			);
		}.bind(this) );

		return (
			<div className="getting-started__steps">
				<h3>Your Progress <div style={{marginTop: '7px'}}><WelcomeProgressBar /></div></h3>
				
				<ol>
					{menuItems}
				</ol>
			</div>
		)
	}
});

module.exports = WelcomeMenu;