var React = require( 'react' ),
	SetupProgressStore = require( 'stores/setup-progress-store' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	Button = require( '@automattic/dops-components/client/components/button' );

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

	handleGetStarted: function(sitePurpose, e) {
		e.preventDefault();
		SetupProgressActions.getStarted( sitePurpose );
	},

	handleNoThanks: function(e) {
		e.preventDefault();
		SetupProgressActions.disableJPO();
	},

	render: function() {
		return (
			<div className="welcome__get-started--intro">
				<div className="welcome__get-started--wrapper">
					<h1>Welcome to WordPress</h1>
					<p className="welcome__callout welcome__get-started--callout">Would you like help launching your site?</p>
					<p>
						<Button onClick={ this.handleGetStarted.bind(this, "business") } primary>Yes, I’m building a business site</Button>
					</p>
					<p>
						<Button onClick={ this.handleGetStarted.bind(this, "personal") } primary>Yes, I’m building a personal site</Button>
					</p>
					<p>
						<Button onClick={ this.handleNoThanks }>No thanks</Button>
					</p>
				</div>
				<img className='welcome__get-started-image' src={ `${ JPS.base_url }/img/jpo-welcome.png` } />
			</div>
		);
	}
});

module.exports = GetStarted;
