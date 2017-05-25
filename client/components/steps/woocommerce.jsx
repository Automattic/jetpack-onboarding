var React = require( 'react' ),
	SkipButton = require( '../skip-button' ),
	SiteStore = require( 'stores/site-store' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	WelcomeSection = require( '../page/container' ),
	SiteActions = require( 'actions/site-actions' ),
	Paths = require( 'constants/jetpack-onboarding-paths' ),
	Button = require( '@automattic/dops-components/client/components/button' );

function getJetpackState() {
	const { is_shop, redirect_to_woocommerce_setup } = JPS.bloginfo;
	return {
		site_title: SiteStore.getTitle(),
		wooCommerceStatus: SiteStore.getWooCommerceStatus(),
		wooCommerceSetupUrl: SiteStore.getWooCommerceSetupUrl(),
		is_shop,
		redirect_to_woocommerce_setup
	};
}

module.exports = React.createClass( {

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
		JPS.shownWoocommerceStep = true;
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getJetpackState() );
	},

	getInitialState: function() {
		return getJetpackState();
	},

	goToWooSetup: function() {
		jQuery( window ).off( 'beforeunload' );
		SiteActions.redirectToWooCommerceSetup();
		SetupProgressActions.completeStep( Paths.WOOCOMMERCE_SLUG );
		window.location = this.state.wooCommerceSetupUrl;
	},

	goToJpoReview: function() {
		SetupProgressActions.setCurrentStep( Paths.REVIEW_STEP_SLUG );
	},

	handleSubmit: function( event ) {
		event.preventDefault();
		SiteActions.installWooCommerce();
	},

	renderInstall: function() {
		return (
			<div>
				<p className="welcome__callout welcome__jetpack--callout">Are you looking to sell online?</p>
				<form onSubmit={ this.handleSubmit } className="welcome__woocommerce--form">

					<div className="welcome__button-container">
						<Button className='welcome-submit' primary type="submit">Install WooCommerce</Button>
						<SkipButton />
					</div>
				</form>
			</div>
		);
	},

	renderAlreadyInstalled: function() {
		return (
			<div>
				<p className="welcome__callout welcome__jetpack--callout">WooCommerce is ready to go</p>
				<div className="welcome__button-container">
					<Button className='welcome-submit' primary onClick={ this.goToWooSetup }>Setup your store</Button>
					<Button onClick={ this.goToJpoReview }>Not right now</Button>
				</div>
			</div>
		);
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__jetpack">
				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>
				{ this.state.wooCommerceStatus ?
					this.renderAlreadyInstalled() :
					this.renderInstall()
				}
			</WelcomeSection>
		);
	}
} );
