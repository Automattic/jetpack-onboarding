var React = require('react'),
	WelcomeProgressBar = require('./welcome-progress-bar.jsx'),
	SetupProgressActions = require('../actions/setup-progress-actions')

var stepShape = React.PropTypes.shape({
	name: React.PropTypes.string.isRequired,
	slug: React.PropTypes.string
});

/**
 * The menu which allows the user to switch steps
 **/
var WelcomeMenu = React.createClass({
	
	propTypes: {
		currentStep: stepShape.isRequired,
		clickable: React.PropTypes.bool,
		allSteps: React.PropTypes.arrayOf(stepShape).isRequired,
		progressPercent: React.PropTypes.number.isRequired
	},

	getDefaultProps: function() {
		return {
			clickable: true
		};
	},

	selectStep: function(e) {
		e.preventDefault();
		
		var slug = jQuery(e.currentTarget).data('step-slug');

		SetupProgressActions.setCurrentStep(slug);
	},

	render: function() {

		var menuItems = this.props.allSteps.map(function ( step ) {
			var title, current, status;

			if ( this.props.clickable && this.props.currentStep ) {
				current = ( this.props.currentStep.slug == step.slug );
			}

			if ( !step.static && this.props.clickable ) {
				title = <a href="#" data-step-slug={step.slug} onClick={this.selectStep}>{step.name}</a>
			} else {
				title = step.name;
			}

			status = step.completed ? 'completed' : '';
			
			return (
				<li key={step.slug} className={status + (current ? ' current' : '')}>{title} {step.skipped ? '(skipped)' : null}</li>
			);
		}.bind(this) );

		return (
			<div className="getting-started__steps">
				<h3>
					<span>Your Progress</span>
					<div>
						<WelcomeProgressBar progressPercent={this.props.progressPercent}/>
					</div>
				</h3>
				
				<ol>
					{menuItems}
				</ol>
			</div>
		)
	}
});

module.exports = WelcomeMenu;