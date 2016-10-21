var React = require( 'react' ),
	SetupProgressStore = require( 'stores/setup-progress-store' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	Paths = require('../../constants/jetpack-onboarding-paths');

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

		if ( 'personal' === sitePurpose ) {
			// We want to mark business only steps as complete, so they don't linger as pending steps
			// within the personal flow.
			SetupProgressActions.completeStepNoRecord( Paths.BUSINESS_ADDRESS_SLUG );
			SetupProgressActions.completeStepNoRecord( Paths.WOOCOMMERCE_SLUG );
		}

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
					<br/>
					<h2 className="welcome__callout welcome__get-started--callout">What kind of site can we help you set up?</h2>
					<p>
						<Button onClick={ this.handleGetStarted.bind(this, "business") } primary>Business</Button>
						<Button onClick={ this.handleGetStarted.bind(this, "personal") } primary>Personal</Button>
					</p>
					<p>
						<a href="" onClick={ this.handleNoThanks }>I don't need help</a>
					</p>
				</div>
				<img className='welcome__get-started-image' src={ `${ JPS.base_url }/img/jpo-welcome.png` } />
			</div>
		);
	}
});

module.exports = GetStarted;
