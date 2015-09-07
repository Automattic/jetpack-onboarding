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
			// backgroundImage: 'url('+JPS.base_url+'/img/jps-welcome.png)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center bottom',
			backgroundSize: '520px auto',
			position: 'fixed',
		    top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: '#fff',
			paddingTop: 100,
			zIndex: 999
		},
		wrapperIE8: {
			backgroundImage: 'none'
		},
		subhead: {
			margin: '15px 0 30px',
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
				<h3>Welcome to your new WordPress website</h3>
				<p style={this.styles.subhead}>
					Would you like help launching {JPS.site_url}?
				</p>
				<p style={{marginTop: 30}}>
					<Button color="green" size="big" onClick={this.handleGetStarted}>Yes</Button>
					&nbsp;&nbsp;&nbsp;
					<Button color="gray" size="big" onClick={this.handleNoThanks}>No thanks</Button>
				</p>
			</div>
		);
	}
});

module.exports = Radium(GetStarted);