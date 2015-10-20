var React = require('react'),
	SiteStore = require('../stores/site-store'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	Tooltip = require('./tooltip'),
	WelcomeSection = require('./welcome-section'),
	ContentBox = require('./content-box'),
	styles = require('../styles'),
	Button = require('@automattic/dops-components/client/components/button');

function getThemeState() {
	return { themes: SiteStore.getThemes(), site_title: SiteStore.getTitle() };
}

var DesignStep = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
		this._loadPopularThemes();
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getThemeState());
  	},

	getInitialState: function() {
		var initialState = getThemeState();
		initialState.popularThemes = [];
		return initialState;
	},

	handleActivateTheme: function ( e ) {
		e.preventDefault();
		
		this.setState({tooltipTheme: null, tooltipPosition: null});

		var $el = jQuery(e.currentTarget),
			themeId = $el.data('theme-id'),
			theme = this.findTheme(themeId),
			needsInstallation = !theme.installed;

		var response = SetupProgressActions.setActiveTheme(theme);

		// if we just installed a theme from the "popular" list, let's load some new
		// selections once installation is finished
		if ( needsInstallation ) {
			response.done( function () {
				this._loadPopularThemes();
			}.bind(this));
		}
	},

	findTheme: function ( themeId )	{
		return _.findWhere(this.state.themes, {id: themeId}) || _.findWhere(this.state.popularThemes, {id: themeId});
	},

	handleContinue: function ( e ) {
		e.preventDefault();
		SetupProgressActions.saveDesignStep();
	},

	handleShowTooltip: function ( e ) {
		e.preventDefault();

		var $el   = jQuery(e.currentTarget),
			theme = this.findTheme($el.data('theme-id')),
			offset = $el.position(),
			width = $el.outerWidth(),
			height = $el.outerHeight();
		
		//describes a position in the middle of the right side
		var position = {
			top: offset.top + (height/2),
			left: offset.left + width
		};

		this.setState({tooltipTheme: theme, tooltipPosition: position});
	},

	handleHideTooltip: function ( e ) {
		e.preventDefault();
		this.setState({tooltipTheme: null, tooltipPosition: null});
	},

	handleGetPopularThemes: function ( e ) {
		e.preventDefault();
		this._loadPopularThemes();		
	},

	_loadPopularThemes: function() {
		SiteStore.getPopularThemes().done(function(themes) {
			this.setState({popularThemes: themes});
		}.bind(this));
	},

	render: function() {

		return (
			<WelcomeSection id="welcome__design">
				<h3>Let's launch <em>{this.state.site_title}</em></h3>
				<h4>Pick a design</h4>
				<p style={styles.content}>A "theme" controls the design of your site - colours, fonts and layout.</p>
				<p style={styles.content}>Click any theme below to choose it for your site. And don't worry - you can easily change this later.</p>
				<p className="submit">
					<Button color="blue" onClick={this.handleContinue}>Next Step &rarr;</Button>
				</p>
				<ContentBox>
					<h3>Installed themes</h3>
					<div className="theme-browser rendered">
						{this._renderThemeList()}
					</div>
				</ContentBox>
				
				<ContentBox>
					<h3>Popular themes from WordPress.org
					<Button color="blue" style={{float: 'right'}} onClick={this.handleGetPopularThemes}>Load more themes</Button>
					</h3>
					<div className="theme-browser rendered">
						{this._renderPopularThemeList()}
					</div>
				</ContentBox>

				<div style={{clear: 'both'}}></div>
				{this.state.tooltipTheme && this._renderTooltip()}
			</WelcomeSection>
		);
	},

	_renderTooltip: function() {
		var theme = this.state.tooltipTheme, position = this.state.tooltipPosition;
		return (
			<Tooltip
				left={position.left} 
				top={position.top} 
				width={320} 
				title={theme.name}>
				<p>By {theme.author}</p>
				<p dangerouslySetInnerHTML={{__html: _.unescape(theme.description)}}></p>
			</Tooltip>
		);
	},

	_renderTheme: function(theme) {
		return (
			<div key={theme.id} 
				className={'theme' + (theme.active ? ' active' : '')} 
				data-theme-id={theme.id} 
				onClick={this.handleActivateTheme} 
				onMouseEnter={this.handleShowTooltip} 
				onMouseLeave={this.handleHideTooltip} 
				aria-describedby={theme.id+'-action '+theme.id+'-name'}>

				{theme.screenshot ? (
					<div className="theme-screenshot">
						<img src={theme.screenshot} alt="" />
					</div>
				) : (
					<div className="theme-screenshot blank"></div>
				)}
				{!theme.active && (<span className="more-details">{theme.installed ? 'Click to select' : 'Click to install'}</span>)}
				<h3 className="theme-name" id={theme.id+'-name'}><span>{theme.active ? 'Selected:' : ''}</span> {theme.name}</h3>
			</div>
		);
	},

	_renderPopularThemeList: function() {
		return this.state.popularThemes.map( this._renderTheme );
	},

	_renderThemeList: function() {
		return this.state.themes.map( this._renderTheme );
	}
});

module.exports = DesignStep;