var React = require( 'react' ),
	SiteStore = require( 'stores/site-store' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	WelcomeSection = require( '../page/container' ),
	Paths = require( 'constants/jetpack-onboarding-paths' ),
	Button = require( '@automattic/dops-components/client/components/button' );

var SelectDropdown = require( '@automattic/dops-components/client/components/select-dropdown' ),
	DropdownItem = require( '@automattic/dops-components/client/components/select-dropdown/item' );

function getJetpackState() {
	const { is_shop } = JPS.bloginfo;
	return {
		site_title: SiteStore.getTitle(),
		wooCommerceStatus: SiteStore.getWooCommerceStatus(),
		wooCommerceSetupUrl: SiteStore.getWooCommerceSetupUrl(),
		is_shop
	};
}

const platforms = [
	'Shopify',
	'BigCommerce',
	'Magento',
	'Woo',
	'osCommerce',
	'Wix',
	'Other'
];

module.exports = React.createClass( {

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
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

	submitStorePlatform: function( platform ) {
		SetupProgressActions.completeStep( Paths.EXISTING_STORE_STEP_SLUG, { platform } );
		this.goToJpoReview();
	},

	goToJpoReview: function() {
		SetupProgressActions.setCurrentStep( Paths.REVIEW_STEP_SLUG );
	},

	render: function() {
		const platformSelections = platforms.map( ( platform, i ) => {
			return (
				<DropdownItem key={ i } onClick={ () => {
					this.submitStorePlatform( platform );
				} }>{ platform }</DropdownItem>
			);
		} );

		return (
			<WelcomeSection id="welcome__jetpack">
				<h1>Let&apos;s launch <em>{ this.state.site_title }</em></h1>
				<p className="welcome__callout welcome__jetpack--callout">{ 'Do you already have an existing e-commerce store?' }</p>
				<div className="welcome__existing-store--button-container welcome__button-container">
					<SelectDropdown selectedText="Yes, it's powered by…" className="welcome__existing-store--dropdown">
						{ platformSelections }
					</SelectDropdown>
					<Button primary>Next</Button>
					<Button>Nope</Button>
				</div>
			</WelcomeSection>
		);
	}
} );
