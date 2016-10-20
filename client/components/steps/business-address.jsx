var React = require( 'react' ),
	SkipButton = require( '../skip-button' ),
	SiteStore = require( 'stores/site-store' ),
	WelcomeSection = require( '../page/container' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	Button = require( '@automattic/dops-components/client/components/button' );

function getJetpackState() {
	return {
		site_title: SiteStore.getTitle(),
		jetpackConfigured: SiteStore.getJetpackConfigured(),
		jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled(),
		modulesEnabled: SiteStore.getActiveModuleSlugs(),
		settingsUrl: SiteStore.getJetpackSettingsUrl()
	};
}

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
		var state = getJetpackState();
		state.showMoreModules = false;
		state.jetpackConnecting = false;
		const { business_address_1, business_address_2, business_city, business_state, business_zip } = JPS.bloginfo;
		let business_name = JPS.bloginfo.business_name;
		if ( 'undefined' === typeof business_name ) {
			business_name = state.site_title;
		}
		state = Object.assign( {}, state, { business_address_1, business_address_2, business_city, business_name, business_state, business_zip } );
		return state;
	},

	handleChange: function( e ) {
		var newValue = {};
		if ( 'checkbox' === e.currentTarget.type ) {
			newValue[ e.currentTarget.name ] = e.currentTarget.checked;
		} else {
			newValue[ e.currentTarget.name ] = e.currentTarget.value;
		}
		this.setState( newValue );
	},

	handleSubmit: function( e ) {
		e.preventDefault();
		SetupProgressActions.submitBusinessAddress( this.state );
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__jetpack">
				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>
				<p className="welcome__callout welcome__jetpack--callout">Add your business address (if you have one)</p>
				<form onSubmit={ this.handleSubmit } className="welcome__business-address--form">
						<input className="welcome__business-address--input" type="text" name="business_name" id="business-name" value={ this.state.business_name } onChange={ this.handleChange } placeholder="Business Name: Jack's Pizza shop" required />
						<input className="welcome__business-address--input" type="text" name="business_address_1" id="business-address-1" value={ this.state.business_address_1 } onChange={ this.handleChange } placeholder="Address: Pizza street" required />
						<input className="welcome__business-address--input" type="text" name="business_address_2" id="business-address-2" value={ this.state.business_address_2 } onChange={ this.handleChange } placeholder="Address: Pizza street 2" />
						<input className="welcome__business-address--input" type="text" name="business_city" id="business-city" value={ this.state.business_city } onChange={ this.handleChange } placeholder="City" required/>
						<input className="welcome__business-address--input" type="text" name="business_state" id="business-state" value={ this.state.business_state } onChange={ this.handleChange } placeholder="State" />
						<input className="welcome__business-address--input" type="text" name="business_zip" id="business-zip" value={ this.state.business_zip } onChange={ this.handleChange } placeholder="Zip" required />
						<div className="welcome__button-container">
							<Button className='welcome-submit' primary type="submit">Next Step</Button>
							<SkipButton />
						</div>
				</form>

			</WelcomeSection>
		);
	}
} );

