var React = require('react'),
	SkipButton = require('./skip-button.jsx'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	SetupProgressActions = require('../actions/setup-progress-actions'),
	Tooltip = require('./tooltip.jsx');

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

		SiteActions.setActiveTheme(themeId);
	},

	findTheme: function ( themeId )	{
		return _.findWhere(this.state.themes, {id: themeId});
	},

	handleContinue: function ( e ) {
		e.preventDefault();
		SetupProgressActions.saveDesignStep();
	},

	handleShowTooltip: function ( e ) {
		console.log("show");
		// e.preventDefault();

		// debugger;

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
		console.log("hide");
		this.setState({tooltipTheme: null, tooltipPosition: null});
	},

	handleMouseEnter: function ( e ) {
		console.log("enter");
	},

	handleMouseLeave: function ( e ) {
		console.log("leave");
	},

	handleMouseOver: function ( e ) {
		console.log("over");
	},

	handleMouseOut: function ( e ) {
		console.log("enter");
	},

	render: function() {
		var tooltip; 
		if ( this.state.tooltipTheme ) {
			tooltip = this._renderTooltip();
		} 

		return (
			<div className="welcome__section" id="welcome__design">
				<p onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>Hover test</p>
				<h4>Pick a design</h4>
				<p className="step-description">To get started, select from one of the themes below. You can always change it later. (There are over 250 themes to choose from.)</p>
				<p className="submit">
					<input type="submit" name="save" className="button button-primary button-large" onClick={this.handleContinue} value="Next Step &rarr;"/>
				</p>
				<div className="theme-browser">
					{this._renderThemeList()}
				</div>
				
				<div style={{clear: 'both'}}></div>
				{tooltip}
			</div>
		);
	},

	_renderTooltip: function() {
		var screenshot, theme = this.state.tooltipTheme, position = this.state.tooltipPosition;

		if ( theme.screenshot[0] ) {
			screenshot = (<div style={{width: '100%'}} className="screenshot"><img style={{width: '100%'}} src={theme.screenshot[0]} alt="" /></div>);
		} else {
			screenshot = (<div style={{width: '100%'}} className="screenshot blank"></div>);
		}

		return (
			<Tooltip
				left={position.left} 
				top={position.top} 
				width={320} 
				title={theme.name}>
				{screenshot}
				<p>By <span dangerouslySetInnerHTML={{__html: _.unescape(theme.authorAndUri)}}></span></p>
				<p dangerouslySetInnerHTML={{__html: _.unescape(theme.description)}}></p>
			</Tooltip>
		);
	},

	// _renderOverlay: function() {
	// 	var screenshot, currentThemeLabel, parentLabel, tagsLabel, previewAction, theme = this.state.overlayTheme; 

	// 	if ( theme.screenshot[0] ) {
	// 		screenshot = (<div className="screenshot"><img src={theme.screenshot[0]} alt="" /></div>);
	// 	} else {
	// 		screenshot = (<div className="screenshot blank"></div>);
	// 	}

	// 	if ( theme.active ) {
	// 		currentThemeLabel = (<span className="current-label">Current Theme</span>);
	// 	}

	// 	if ( theme.parent ) {
	// 		parentLabel = (<p className="parent-theme">This is a child theme of <strong>{theme.parent}</strong></p>);
	// 	}

	// 	if ( theme.tags ) {
	// 		tagsLabel = (<p className="theme-tags"><span>Tags:</span> {theme.tags}</p>);
	// 	}

	// 	return (
	// 		<div className="theme-overlay">
	// 			<div className="theme-backdrop"></div>
	// 			<div className="theme-wrap">
	// 				<div className="theme-header">
	// 					<button type="button" className="left dashicons dashicons-no" onClick={this.handlePreviousThemeOverlay}><span className="screen-reader-text">Show previous theme</span></button>
	// 					<button type="button" className="right dashicons dashicons-no" onClick={this.handleNextThemeOverlay}><span className="screen-reader-text">Show next theme</span></button>
	// 					<button type="button" className="close dashicons dashicons-no" onClick={this.handleCloseOverlay}><span className="screen-reader-text">Close details dialog</span></button>
	// 				</div>
	// 				<div className="theme-about">
	// 					<div className="theme-screenshots">
	// 						{screenshot}
	// 					</div>

	// 					<div className="theme-info">
	// 						{currentThemeLabel}
	// 						<h3 className="theme-name">{theme.name}<span className="theme-version">Version: {theme.version}</span></h3>
	// 						<h4 className="theme-author">By <span dangerouslySetInnerHTML={{__html: _.unescape(theme.authorAndUri)}}></span></h4>
	// 						<p className="theme-description" dangerouslySetInnerHTML={{__html: _.unescape(theme.description)}}></p>

	// 						{parentLabel}
	// 						{tagsLabel}
	// 					</div>
	// 				</div>

	// 				{previewAction}
	// 			</div>
	// 		</div>
	// 	);
	// },

	_renderThemeList: function() {
		var themes = this.state.themes.map( function(theme) {

			var screenshot;

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

			return (
				<div key={theme.id} className={wrapperClass} tabIndex="0" data-theme-id={theme.id} onClick={this.handleActivateTheme} onMouseEnter={this.handleShowTooltip} onMouseLeave={this.handleHideTooltip} aria-describedby={ariaDescribedBy}>
					{screenshot}
					<h3 className="theme-name" id={theme.id+'-name'}><span>{theme.active ? 'Active:' : ''}</span> {theme.name}</h3>
				</div>
			);
		}.bind(this) );

		return themes;
	}
});

module.exports = DesignStep;