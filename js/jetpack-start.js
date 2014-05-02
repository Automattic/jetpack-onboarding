(function( $ ) {
	var siteTypes = new Backbone.Collection( _JetpackStartSiteTypes ),
		jetpackStartRouter = Backbone.Router.extend( {
		routes: {
			"setup/step/:step": "render",
			"setup/step/:step/:site_type": "render",
			"setup/step/:step/:site_type/:theme": "render"
		}
	}),
	router;

	$( document ).ready( function() {
		router = new jetpackStartRouter;
		router.on( 'route:render', render );

		Backbone.history.start();

		// BEGIN theme selection step

		siteTypes.each( function( siteType ) {
			$.each( siteType.get( 'themes' ), function( i, theme ) {
				// Preload Theme images
				$( '<img />' ).attr( 'src', theme['img_preview'] );
			});
		});

		var stepSetTheme = $( 'section.step[data-step=select_theme]' );

		stepSetTheme.on( 'click', '.theme', function() {
			setTheme( $( this ).data( 'theme' ) );

			router.navigate( 'setup/step/3/'+ $( this ).data( 'site_type' ) + '/' + $( this ).data( 'theme' ), true );
		});
		// Don't navigate on theme previews
		stepSetTheme.on( 'click', '.theme a', function( e ) {
			e.stopPropagation();
		});
		//END theme selection step

		// BEGIN connect social step
		var stepConnectSocial = $( 'section.step[data-step=connect_social]' );
		stepConnectSocial.on( 'click', '.social-link', function() {
			$( this ).find( '.title' ).html( _JetpackStartConnecting );
		});
		//END connect social step

	});

	function selectSiteType( siteType ) {
		var template = $( '#themes_template' ).html();
		$( 'section.step-2 .themes-box' )
			.data( 'site_type', siteType.get( 'name' ) )
			.html( _.template( template, { themes: siteType.get( 'themes' ), site_type: siteType.get( 'name' ) } ) );
        var data = {
			action: 'jetpackstart_set_site_type',
			site_type: siteType.get( 'name' )
		};
		$.post( ajaxurl, data );
		return siteType;
	}

	function setTheme( theme ) {
		var data = {
			action: 'jetpackstart_set_theme',
			stylesheet: theme
		};
		$.post( ajaxurl, data );
	}

	function render( step, siteTypeName, theme ) {
		if ( typeof siteTypeName === 'string' ) {
			if ( typeof theme === 'string' ) {
				setTheme( theme );
			} else {
				selectSiteType( siteTypes.findWhere( { name: siteTypeName } ) );
			}
		}
		showStep( step );
	}

	function showStep( step ) {
		$( 'section.step' ).hide();
		$( 'section.step[data-step=' + step + ']' ).show();
	}

}) ( jQuery );
