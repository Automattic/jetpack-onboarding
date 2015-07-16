var React = require('react'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	Button = require('@automattic/dops-react/js/components/button'),
	Radium = require('radium');

function getSetupState() {
	return {};
}

var GetStarted = React.createClass({
	componentDidMount: function() {
		SetupProgressStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getSetupState());
  	},

	getInitialState: function() {
		return getSetupState();
	},

	handleGetStarted: function(e) {
		e.preventDefault();
		SetupProgressActions.getStarted();
	},

	_isIE8: function() {
		jQuery('html').is('.ie8');
	},

	styles: {
		wrapper: {
			textAlign: 'center',
			backgroundImage: 'url('+JPS.base_url+'/img/jps-welcome.png)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center bottom',
			backgroundSize: '520px auto',
			paddingBottom: 200,
			'@media (max-width: 782px)': {
				backgroundImage: 'none',
				paddingBottom: 30
			}
		},
		wrapperIE8: {
			backgroundImage: 'none'
		},
		subhead: {
			margin: '0 0 30px',
			color: '#666',
			fontSize: 18,
			lineHeight: 1.6,
			textAlign: 'center',
			'@media (max-width: 600px)': {
				marginBottom: 15,
				fontSize: 15
			},
			'@media (max-width: 320px)': {
				fontSize: 13
			}
		}
	},

	render: function() {
		return (
			<div key="welcome-intro" style={[this.styles.wrapper, this._isIE8() && this.styles.wrapperIE8]}>
				<h3>You're almost done!</h3>
				<p style={this.styles.subhead}>
					Take these steps to supercharge your WordPress site.
				</p>
				<p>
					<Button color="green" size="big" theme="jetpack" onClick={this.handleGetStarted}>Get Started &rarr;</Button>
				</p>
			</div>
		);
	}
});

module.exports = Radium(GetStarted);