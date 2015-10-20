var React = require('react'),
	Radium = require('radium'),
	ProgressBar = require('@automattic/dops-components/client/components/progress-bar'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	Dashicon = require('./dashicon');

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

	styles: {
		wrapper: {
			float: 'right',
			width: '28%',
			height: '100%',
			background: '#fafafa',
			border: '1px solid #eee',
		},
		title: {
			margin: 0,
			padding: 12,
			overflow: 'hidden',
			background: '#444',
			color: '#fff',
			fontSize: 12,
			textTransform: 'uppercase'
		},
		list: {
			margin: '13px 10px',
			listStyle: 'none',
			'@media (max-width: 600px)': {
				margin: '5px 4px'
			}
		},
		menuItem: {
			marginBottom: 6,
			position: 'relative',
			color: '#333',
			lineHeight: 1.7,
			'@media (max-width: 782px)': {
				fontSize: 'small'
			},
			'@media (max-width: 600px)': {
				fontSize: 'smaller'
			}
		},
		menuItemCompleted: {
			color: '#4AB866'
		},
		icon: {
			fontSize: 16,
			top: 3,
			position: 'relative'
		},
		menuItemLink: {
			color: 'inherit',
			borderBottom: '1px dashed'
		},
		menuItemCurrent: {
			color: '#0074A2'
		}
	},

	selectStep: function(e) {
		e.preventDefault();
		
		var slug = jQuery(e.currentTarget).data('step-slug');

		SetupProgressActions.setCurrentStep(slug);
	},

	render: function() {

		var menuItems = this.props.allSteps.map(function ( step ) {
			var title, current, menuView, iconName;

			if ( this.props.clickable && this.props.currentStep ) {
				current = ( this.props.currentStep.slug === step.slug );
			}

			if ( !step.static && this.props.clickable ) {
				title = <a href="#" style={this.styles.menuItemLink} data-step-slug={step.slug} onClick={this.selectStep}>{step.name}</a>;
			} else {
				title = step.name;
			}

			if ( step.menuView && this.props.clickable ) {
				menuView = <step.menuView/>;
			}
			
			iconName = step.completed ? 'yes' : 'arrow-right-alt2';

			return (
				<li key={step.slug} style={[this.styles.menuItem, step.completed && this.styles.menuItemCompleted, current && this.styles.menuItemCurrent]}>
					<Dashicon style={this.styles.icon} name={iconName}/>
					{title} {step.skipped ? '(skipped)' : null}
					{menuView}
				</li>
			);
		}.bind(this) );

		return (
			<div style={[this.styles.wrapper, this.props.style]}>
				<h3 style={this.styles.title}>
					<span style={{float: 'left', marginRight: 10}}>Your Progress</span>
					<div>
						<ProgressBar style={{ float: 'left'}} progressPercent={this.props.progressPercent}/>
					</div>
				</h3>
				
				<ol style={this.styles.list}>
					{menuItems}
				</ol>
			</div>
		);
	}
});

module.exports = Radium(WelcomeMenu);