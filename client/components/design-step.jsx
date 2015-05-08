var React = require('react'),
	SkipButton = require('./skip-button.jsx'),
	SiteStore = require('../stores/site-store'),
	SetupProgressActions = require('../actions/setup-progress-actions');

function getThemeState() {
	return { themes: SiteStore.getThemes() };
}

var DesignStep = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getThemeState());
  	},

	getInitialState: function() {
		return getThemeState();
	},

	handleActivateTheme: function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		
		var $el = jQuery(e.currentTarget);
		var themeId = $el.data('theme-id');

		SetupProgressActions.submitDesignStep(themeId);
	},

	findTheme: function ( themeId )	{
		return _.findWhere(this.state.themes, {id: themeId});
	},

	handleContinue: function ( e ) {
		e.preventDefault();
		SetupProgressActions.saveDesignStep();
	},

	handleCustomize: function ( e ) {
		e.preventDefault();
		e.stopPropagation();

		var $el   = jQuery(e.currentTarget);

		var Loader = window.wp.customize.Loader;

		// Store a reference to the link that opened the Customizer.
		Loader.link = $el;
		// Load the theme.
		Loader.open( Loader.link.attr('href') );

		// window.location.replace(link);
	},

	handleShowOverlay: function ( e ) {
		e.preventDefault();
		e.stopPropagation();

		var $el   = jQuery(e.currentTarget),
			theme = this.findTheme($el.data('theme-id'));
		
		this.setState({overlayTheme: theme});
	},

	handleCloseOverlay: function( e ) {
		e.preventDefault();
		e.stopPropagation();

		this.setState({overlayTheme: null});
	},

	handlePreviousThemeOverlay: function ( e ) {
		e.preventDefault();
		e.stopPropagation();

		var prevTheme = null;

		this.state.themes.forEach( function ( theme ) {
			if ( theme === this.state.overlayTheme ) {
				this.setState({overlayTheme: prevTheme});
				return;
			}
			prevTheme = theme;
		}.bind(this) );
	},

	handleNextThemeOverlay: function ( e ) {
		e.preventDefault();
		e.stopPropagation();

		var prevTheme = null;

		this.state.themes.forEach( function ( theme ) {
			if ( prevTheme === this.state.overlayTheme ) {
				this.setState({overlayTheme: theme});
				return;
			}
			prevTheme = theme;
		}.bind(this) );
	},

	render: function() {
		var themes, overlay;

		themes = this._renderThemeList();
		
		if ( this.state.overlayTheme ) {
			overlay = this._renderOverlay();
		}

		return (
			<div className="welcome__section" id="welcome__design">
				<h4>Pick a design</h4>
				<p className="step-description">To get started, select from one of the themes below. You can always change it later. (There are over 250 themes to choose from.)</p>
				<p className="submit">
					<input type="submit" name="save" className="button button-primary button-large" onClick={this.handleContinue} value="Next Step &rarr;"/>
					<SkipButton />
				</p>
				<div className="theme-browser">
					{themes}
				</div>
				
				<div style={{clear: 'both'}}></div>
				{overlay}
			</div>
		);
	},

	_renderOverlay: function() {
		var screenshot, currentThemeLabel, parentLabel, tagsLabel, previewAction, theme = this.state.overlayTheme; 

		if ( theme.screenshot[0] ) {
			screenshot = (<div className="screenshot"><img src={theme.screenshot[0]} alt="" /></div>);
		} else {
			screenshot = (<div className="screenshot blank"></div>);
		}

		if ( theme.active ) {
			currentThemeLabel = (<span className="current-label">Current Theme</span>);
		}

		if ( theme.parent ) {
			parentLabel = (<p className="parent-theme">This is a child theme of <strong>{theme.parent}</strong></p>);
		}

		if ( theme.tags ) {
			tagsLabel = (<p className="theme-tags"><span>Tags:</span> {theme.tags}</p>);
		}

		if ( ! theme.active ) {
			previewAction = (
				<div className="theme-actions">
					<div className="inactive-theme">
						<a href={_.unescape(theme.actions.customize)} onClick={this.handleCustomize} target="_top" className="button button-primary">Live Preview</a>
					</div>
				</div>
			);
		}

		return (
			<div className="theme-overlay">
				<div className="theme-backdrop"></div>
				<div className="theme-wrap">
					<div className="theme-header">
						<button type="button" className="left dashicons dashicons-no" onClick={this.handlePreviousThemeOverlay}><span className="screen-reader-text">Show previous theme</span></button>
						<button type="button" className="right dashicons dashicons-no" onClick={this.handleNextThemeOverlay}><span className="screen-reader-text">Show next theme</span></button>
						<button type="button" className="close dashicons dashicons-no" onClick={this.handleCloseOverlay}><span className="screen-reader-text">Close details dialog</span></button>
					</div>
					<div className="theme-about">
						<div className="theme-screenshots">
							{screenshot}
						</div>

						<div className="theme-info">
							{currentThemeLabel}
							<h3 className="theme-name">{theme.name}<span className="theme-version">Version: {theme.version}</span></h3>
							<h4 className="theme-author">By <span dangerouslySetInnerHTML={{__html: _.unescape(theme.authorAndUri)}}></span></h4>
							<p className="theme-description" dangerouslySetInnerHTML={{__html: _.unescape(theme.description)}}></p>

							{parentLabel}
							{tagsLabel}
						</div>
					</div>

					{previewAction}
				</div>
			</div>
		);
	},

	_renderThemeList: function() {
		var themes = this.state.themes.map( function(theme) {

			var screenshot, actions;

			var wrapperClass = 'theme';
			if ( theme.active ) { wrapperClass += ' active'; }

			var ariaDescribedBy = theme.id+'-action '+theme.id+'-name';

			if ( theme.screenshot[0] ) {
				screenshot = (
					<div className="theme-screenshot">
						<img src={theme.screenshot[0]} alt="" />
					</div>
				);
			} else {
				screenshot = (<div className="theme-screenshot blank"></div>);
			}

			if ( theme.active ) {
				if ( theme.actions.customize ) {
					actions = (<a className="button button-primary customize hide-if-no-customize" href={_.unescape(theme.actions.customize)} onClick={this.handleCustomize}>Customize</a>);
				}
			} else {
				actions = (
					<div>
						<a className="button button-secondary activate" data-theme-id={theme.id} onClick={this.handleActivateTheme} href="#">Activate</a>
						<a className="button button-primary hide-if-no-customize" href={_.unescape(theme.actions.customize)} onClick={this.handleCustomize}>Live Preview</a>
						<a className="button button-secondary hide-if-customize" href={_.unescape(theme.actions.preview)}>Preview</a>
					</div>
				);
			}

			return (
				<div key={theme.id} className={wrapperClass} tabIndex="0" data-theme-id={theme.id} onClick={this.handleShowOverlay} aria-describedby={ariaDescribedBy}>
					{screenshot}
					<h3 className="theme-name" id={theme.id+'-name'}><span>{theme.active ? 'Active:' : ''}</span> {theme.name}</h3>
					<span className="more-details" id={theme.id + '-action'}>Theme Details</span>
					<div className="theme-author">By {theme.author}</div>

					<div className="theme-actions">
						{actions}
					</div>
				</div>
			);
		}.bind(this) );

		return themes;
	}
});

module.exports = DesignStep;