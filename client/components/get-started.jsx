var React = require('react'),
	SetupProgressStore = require('../stores/setup-progress-store'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	Button = require('@automattic/dops-components/client/components/button'),
	m = require('@automattic/dops-components/client/utils/m'),
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

	handleNoThanks: function(e) {
		e.preventDefault();
		SetupProgressActions.disableJPS();	
	},

	_isIE8: function() {
		jQuery('html').is('.ie8');
	},

	styles: {
		wrapper: {
			textAlign: 'center',
			// backgroundImage: 'url('+JPS.base_url+'/img/jpo-welcome.png)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center bottom',
			backgroundSize: '520px auto',
			position: 'fixed',
		    top: 0,
			left: 160,
			width: '100%',
			height: '100%',
			backgroundColor: '#fff',
			paddingTop: 100,
			zIndex: 999,
			'@media (max-width: 960px)': {
				left: 36
			},
			'@media (max-width: 782px)': {
				left: 0
			}
		},
		wrapperIE8: {
			backgroundImage: 'none'
		},
		innerwrapper: {
			margin: '0 0 0 -160px',
			'@media (max-width: 960px)': {
				margin: '0 0 0 -36px'
			},
			'@media (max-width: 782px)': {
				margin: '0'
			}
		},
		subhead: {
			margin: '20px 0 15px',
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
		},
		button: {
			borderRadius: 6,
			fontFamily: 'proxima-nova, \'Open Sans\', Helvetica, sans-serif',
			fontSize: 16,
			lineHeight: 1,
			padding: '0.64286em 0.85714em 0.53571em',
		},

		greenButton: {
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: 'rgb(62, 108, 32)',
			background: 'rgb(81, 141, 42)',
			boxShadow: 'rgb(62, 108, 32) 0px 3px 0px, rgba(0, 0, 0, 0.4) 0px 4px 3px',
			color: '#fff',
			':hover': {
				color: '#fff',
				background: 'rgb(129, 168, 68)',
				borderColor: 'rgb(129, 168, 68)',
			}
		},
		grayButton: {
			background: 'linear-gradient(rgb(255, 255, 255), rgb(249, 249, 249))',
			boxShadow: 'rgb(150, 150, 150) 0px 3px 0px, rgba(0, 0, 0, 0.4) 0px 4px 3px',
			color: '#333'
		}

	},

	render: function() {
		return (
			<div key="welcome-intro" style={[this.styles.wrapper, this._isIE8() && this.styles.wrapperIE8]}>
				<div key="welcome-intro-innerwrapper"  style={this.styles.innerwrapper}>
					<h3 style={{fontSize: 30, marginTop: 30}}>Welcome to WordPress</h3>
					<p style={this.styles.subhead}>Would you like help designing your site?</p>
					<p>
						<Button style={ m( this.styles.button, this.styles.greenButton ) } onClick={this.handleGetStarted}>Yes</Button>
					&nbsp;&nbsp;&nbsp;
						<Button style={ m( this.styles.button, this.styles.grayButton ) } onClick={this.handleNoThanks}>No thanks</Button>
					</p>
				</div>
			</div>
		);
	}
});

module.exports = Radium(GetStarted);