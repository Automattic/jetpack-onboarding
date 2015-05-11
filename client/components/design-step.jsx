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

	render: function() {
		var tooltip; 
		if ( this.state.tooltipTheme ) {
			tooltip = this._renderTooltip();
		} 

		return (
			<div className="welcome__section" id="welcome__design">
				<h4>Pick a design</h4>
				<p className="step-description">A "theme" controls the design of your site - colours, fonts and layout.</p>
				<p className="step-description">Click any theme below to choose it for your site.</p>
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
		var theme = this.state.tooltipTheme, position = this.state.tooltipPosition;
		return (
			<Tooltip
				left={position.left} 
				top={position.top} 
				width={320} 
				title={theme.name}>
				<p>By <span dangerouslySetInnerHTML={{__html: _.unescape(theme.authorAndUri)}}></span></p>
				<p dangerouslySetInnerHTML={{__html: _.unescape(theme.description)}}></p>
			</Tooltip>
		);
	},

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