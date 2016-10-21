var React = require( 'react' ),
	SkipButton = require( '../skip-button' ),
	SiteStore = require( 'stores/site-store' ),
	WelcomeSection = require( '../page/container' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	Button = require( '@automattic/dops-components/client/components/button' );

function getJetpackState() {
	return {
		site_title: SiteStore.getTitle(),
		wooCommerceStatus: SiteStore.getWooCommerceStatus(),
		wooCommerceSetupUrl: SiteStore.getWooCommerceSetupUrl(),
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
		let state = getJetpackState();

		const { install_woo } = JPS.bloginfo;
		let business_name = JPS.bloginfo.business_name;
		if ( 'undefined' === typeof business_name ) {
			business_name = state.site_title;
		}

		state = Object.assign( {}, state, { business_name, install_woo } );
		return state;
	},

	handleSubmit: function( event ) {
		event.preventDefault();
		SetupProgressActions.submitWoocommerce( Object.assign( {}, this.state, { install_woo: true } ) );
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
				<p className="welcome__callout welcome__jetpack--callout">WooCommerce has already been installed.</p>
				<div className="welcome__button-container">
					<Button className='welcome-submit' primary type="submit" href={ this.state.wooCommerceSetupUrl }>Setup your store</Button>
					<SkipButton />
				</div>
			</div>
		);
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__jetpack">
				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>
				{ this.state.wooCommerceStatus
					? this.renderAlreadyInstalled()
					: this.renderInstall()
				}
			</WelcomeSection>
		);
	}
} );
