var React = require('react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	//necessary because wp_prepare_themes_for_js escapes URLs by default
	htmlDecode: function ( input ) {
		var e = document.createElement('div');
		e.innerHTML = input;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	},

	getInitialState: function() {
		return {
			overlayTheme: this.props.model.get('themes')[0]
		};
	},

	makeActive: function( activeThemeId ) {
		var themes = this.props.model.get('themes');

		themes.forEach( function( theme ) {
			if ( theme.id == activeThemeId ) {
				theme.active = true;
			} else {
				theme.active = false;
			}
		} );

		// silly, naive way to trigger a re-render
		this.props.model.trigger('change');
	},

	handleActivateTheme: function( e ) {
		e.preventDefault();
		var $el = jQuery(e.currentTarget);
		var activateUrl = $el.attr('href');
		var themeId = $el.data('theme-id');

		jQuery.get(activateUrl)
			.success( function () {
				console.log("activated");
				this.makeActive(themeId);
			}.bind(this) )
			.fail( function () {
				console.log("failed");
			} ); 
	},

	render: function() {

		var themes = this.props.model.get('themes').map( function(theme) {

			var screenshot, toolbar, actions;

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
				toolbar = (<h3 className="theme-name" id={theme.id+'-name'}><span>Active:</span> {theme.name}</h3>);
			} else {
				toolbar = (<h3 className="theme-name" id={theme.id+'-name'}>{theme.name}</h3>);
			}

			if ( theme.active ) {
				if ( theme.actions.customize ) {
					actions = (<a className="button button-primary customize load-customize hide-if-no-customize" href={this.htmlDecode(theme.actions.customize)}>Customize</a>);
				}
			} else {
				actions = (
					<div>
						<a className="button button-secondary activate" data-theme-id={theme.id} onClick={this.handleActivateTheme} href={this.htmlDecode(theme.actions.activate)}>Activate</a>
						<a className="button button-primary load-customize hide-if-no-customize" href={this.htmlDecode(theme.actions.customize)}>Live Preview</a>
						<a className="button button-secondary hide-if-customize" href={this.htmlDecode(theme.actions.preview)}>Preview</a>
					</div>
				);
			}

			return (
				<div className={wrapperClass} tabIndex="0" aria-describedby={ariaDescribedBy}>
					{screenshot}
					{toolbar}
					<span className="more-details" id={theme.id + '-action'}>Theme Details</span>
					<div className="theme-author">By {theme.author}</div>

					<div className="theme-actions">
						{actions}
					</div>
				</div>
			);
		}.bind(this) );

		var overlay;

		if ( this.state.overlayTheme ) {
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
							<a href={this.htmlDecode(theme.actions.preview)} target="_top" className="button button-primary">Live Preview</a>
						</div>
					</div>
				);
			}

			overlay = (
				<div className="theme-overlay">
					<div className="theme-backdrop"></div>
					<div className="theme-wrap">
						<div className="theme-header">
							<button type="button" className="left dashicons dashicons-no"><span className="screen-reader-text">Show previous theme</span></button>
							<button type="button" className="right dashicons dashicons-no"><span className="screen-reader-text">Show next theme</span></button>
							<button type="button" className="close dashicons dashicons-no"><span className="screen-reader-text">Close details dialog</span></button>
						</div>
						<div className="theme-about">
							<div className="theme-screenshots">
								{screenshot}
							</div>

							<div className="theme-info">
								{currentThemeLabel}
								<h3 className="theme-name">{theme.name}<span className="theme-version">Version: {theme.version}</span></h3>
								<h4 className="theme-author">By {this.htmlDecode(theme.authorAndUri)}</h4>
								<p className="theme-description">{this.htmlDecode(theme.description)}</p>

								{parentLabel}
								{tagsLabel}
							</div>
						</div>

						{previewAction}
					</div>
				</div>
			);
		}
		
		return (
			<div className="welcome__section" id="welcome__design">
				<h4>Pick a design</h4>
				<p className="step-description">To get started, select from one of the themes below. You can always change it later. (There are over 250 themes to choose from.)</p>
				<div className="theme-browser">
					{themes}
				</div>
					
				
				<p className="submit">
					<input type="submit" name="save" className="button button-primary button-large" value="Save"/>
					<a className="skip" href="#">Skip this step</a>
				</p>
				{overlay}
			</div>
		);
	}
});