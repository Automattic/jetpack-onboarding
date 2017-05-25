var React = require('react'),
	Button = require('@automattic/dops-components/client/components/button'),
	SiteStore = require('stores/site-store'),
	Paths = require('../../constants/jetpack-onboarding-paths'),
	Dashicon = require('../dashicon'),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	WelcomeSection = require('../page/container');

function getSiteState() {
	return {
		site_title: SiteStore.getTitle(),
		contactUrl: SiteStore.getContactPageEditURL(),
		welcomeUrl: SiteStore.getWelcomePageEditURL(),
		newsUrl: SiteStore.getNewsPageEditURL(),
		isJPConnected: SiteStore.getJetpackConfigured(),
		layout: SiteStore.getLayout(),
		wooCommerceStatus: SiteStore.getWooCommerceStatus(),
		wooCommerceSetupUrl: SiteStore.getWooCommerceSetupUrl(),
		pluginsUrl: SiteStore.getPluginsUrl()
	};
}

var AdvancedSettingsStep = React.createClass({

	getInitialState: function() {
		return getSiteState();
	},

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSiteState());
	},

	handleSkipTo: function( slug, event ) {
		event.preventDefault();
		SetupProgressActions.setCurrentStep( slug );
	},

	handleDismiss: function( event ) {
		event.preventDefault();
		SetupProgressActions.closeJPO();
	},

	renderWooCommerceStatus: function() {
		const { is_shop, type } = JPS.bloginfo;
		if ( type !== 'business' || ! JPS.step_enabled[Paths.WOOCOMMERCE_SLUG] ) {
			return null;
		}

		if ( this.state.wooCommerceStatus ) {
			return (
				<li>
					<Dashicon name="yes" /> WooCommerce Installed! <a href={ this.state.wooCommerceSetupUrl }>Set up shop</a>
				</li>
			);
		} else if ( ! is_shop ) {
			return (
				<li>
					<Dashicon name="no" /> WooCommerce not installed. <a href="#" onClick={ this.handleSkipTo.bind(this, Paths.WOOCOMMERCE_SLUG ) }>Install WooCommerce?</a>
				</li>
			)
		} else {
			return (
				<li>
					<Dashicon name="no" /> Error installing WooCommerce <a href={ this.state.pluginsUrl }>Try manual installation</a>
				</li>
			)
		}
		
	},

	render: function() {
		let contactProps = {};
		if ( this.state.contactUrl ) {
			contactProps.href = this.state.contactUrl;
		} else {
			contactProps.href = '#';
			contactProps.onClick = this.handleSkipTo.bind(this, Paths.CONTACT_PAGE_STEP_SLUG );
		}
		return (
			<WelcomeSection id="welcome__review">
				<div className="welcome__dismiss">
					<a href="#" onClick={ this.handleDismiss }><Dashicon name="dismiss" /><span className='screen-reader-text'>Dismiss</span></a></div>

				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>
				<p className="welcome__callout welcome__review--callout">Great Work!</p>

				<div className="welcome__review-cols">
					<div className="welcome__review-col">
						<ul className="welcome__review-list">
							{ JPS.step_enabled[Paths.SITE_TITLE_STEP_SLUG] &&
								<li><Dashicon name="yes" /> Title and description <a href="#" onClick={ this.handleSkipTo.bind(this, Paths.SITE_TITLE_STEP_SLUG ) }>(edit)</a></li>
							}
							{ JPS.step_enabled[Paths.IS_BLOG_STEP_SLUG] &&
								<li>
									<Dashicon name="yes" /> Homepage layout <a href="#" onClick={ this.handleSkipTo.bind(this, Paths.IS_BLOG_STEP_SLUG ) }>(edit)</a>
									{ ( JPS.step_enabled[Paths.IS_BLOG_STEP_SLUG] && this.state.layout !== 'blog' ) ?
										<ul>
											<li><a href={ this.state.welcomeUrl }>Edit your Welcome page</a></li>
										{ ( this.state.layout !== 'website' ) ?
											<li><a href={ this.state.newsUrl }>Edit your News and Updates page</a></li> : null
										}
										</ul> :
										null
									}
								</li>
							}
							{ JPS.step_enabled[Paths.CONTACT_PAGE_STEP_SLUG] &&
								<li>
									<Dashicon name="yes" /> <em>Contact Us</em> page <a { ...contactProps }>(edit)</a>
									{ ! this.state.isJPConnected ? <a href="#" onClick={ this.handleSkipTo.bind(this, Paths.JETPACK_MODULES_STEP_SLUG ) }> Requires a Jetpack Connection </a> : null }
								</li>
							}
							{ JPS.step_enabled[Paths.JETPACK_MODULES_STEP_SLUG] &&
								<li>
									<Dashicon name="yes" />
									{ this.state.isJPConnected ?
										<a href={ JPS.steps.advanced_settings.jetpack_dash }>Jetpack: </a> :
										<a href="#" onClick={ this.handleSkipTo.bind(this, Paths.JETPACK_MODULES_STEP_SLUG ) }>Connect Jetpack: </a>
									}
									increase visitors and improve security
								</li>
							}
							{ ( JPS.step_enabled[Paths.BUSINESS_ADDRESS_SLUG] && JPS.bloginfo.type === 'business' ) ?
								<li>
									{ JPS.steps.business_address
										? <Dashicon name="yes" />
										: <Dashicon name="no" />
									} <em>Business Address</em> page <a href="#" onClick={ this.handleSkipTo.bind(this, Paths.BUSINESS_ADDRESS_SLUG ) }>(edit)</a>
									{ ! this.state.isJPConnected ? <a href="#" onClick={ this.handleSkipTo.bind(this, Paths.JETPACK_MODULES_STEP_SLUG ) }> Requires a Jetpack Connection </a> : null }
 								</li> :
								null
							}
							{ this.renderWooCommerceStatus() }
						</ul>
					</div>

					{ JPS.steps.advanced_settings.show_cta ?
						<div className="welcome__review-col welcome__review-cta">
							<img src={ JPS.steps.advanced_settings.cta_image } />
							<p><Button href={ JPS.steps.advanced_settings.cta_button_url } >{ JPS.steps.advanced_settings.cta_button_text }</Button></p>
						</div> : null
					}
				</div>
			</WelcomeSection>
		);
	}
});

module.exports = AdvancedSettingsStep;
