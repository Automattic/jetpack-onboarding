var React = require( 'react' ),
	SiteActions = require( 'actions/site-actions' ),
	SiteStore = require( 'stores/site-store' ),
	WelcomeSection = require( '../page/container' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' );

function getSiteTitleState() {
	return {
		title: SiteStore.getTitle(),
		description: SiteStore.getDescription()
	};
}

var SiteTitleStep = React.createClass( {

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getSiteTitleState() );
	},

	getInitialState: function() {
		return getSiteTitleState();
	},

	handleChangeTitle: function(e) {
		this.setState( { title: e.currentTarget.value } );
	},

	handleChangeDescription: function(e) {
		this.setState( { description: e.currentTarget.value } );
	},

	handleSubmit: function(e) {
		e.preventDefault();
		SetupProgressActions.submitTitleStep( this.state.title, this.state.description );
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__site-title">
				<h1>Let&apos;s launch your new website</h1>
				<p className="welcome__callout welcome__site-title--callout">Name and describe your website</p>
				<form onSubmit={ this.handleSubmit } className="welcome__site-title--form">
						<label htmlFor="site_title">Site Title</label>
						<input type="text" name="site_title" id="site-title" autoComplete="off" onChange={ this.handleChangeTitle } value={ this.state.title } placeholder="e.g. My WordPress site" required />
						<label htmlFor="site_description">Site Description</label>
						<input type="text" name="site_description" id="site-description" autoComplete="off" onChange={ this.handleChangeDescription } value={ this.state.description } placeholder="e.g. Just another WordPress blog" required />
						<Button className='welcome-submit' primary type="submit">Next Step</Button>
				</form>
			</WelcomeSection>
		);
	}
});

module.exports = SiteTitleStep;
