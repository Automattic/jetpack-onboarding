(function( $ ) {
	var siteTypes = new Backbone.Collection( _JetpackStart['site_types'] ),
		jetpackStartRouter = Backbone.Router.extend( {
			routes: {
				"setup/step/:step": "render",
				"setup/step/:step/:site_type": "render",
				"setup/step/:step/:site_type/:theme": "render"
			}
		}),
		current_step,
		router;

	$( document ).ready( function() {
		router = new jetpackStartRouter;
		router.on( 'route:render', render );

		Backbone.history.start();

		// BEGIN site type selection step

		var stepSiteType = $( 'section.step[data-step=site_type]' );
		stepSiteType.on( 'click', '.site-type', function( e ) {
			e.preventDefault();
			selectSiteType( $( this ).data( 'site-type' ) );
			goToNextStep();
		});
		//END site type selection step

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
			$( this ).find( '.title' ).html(  _JetpackStart['connecting_message'] );
		});
		//END connect social step

	});

	function selectSiteType( siteTypeName ) {
		var siteType = siteTypes.findWhere( { name: siteTypeName } )
		var template = $( '#themes_template' ).html();
		var step = $( 'section.step[data-step=select_theme]' );
		step.data( 'site_type', siteType.get( 'name' ) );
		step.find( '.themes-box' ).html( _.template( template, { themes: siteType.get( 'themes' ), site_type: siteType.get( 'name' ) } ) );
		var data = {
			action: 'jetpackstart_set_site_type',
			site_type: siteType.get( 'name' )
		};
		$.post( _JetpackStart['ajaxurl'], data );
		return siteType;
	}

	function setTheme( theme ) {
		var data = {
			action: 'jetpackstart_set_theme',
			stylesheet: theme
		};
		$.post( _JetpackStart['ajaxurl'], data );
	}

	function render( step_slug, siteTypeName, theme ) {
		if ( typeof siteTypeName === 'string' ) {
			if ( typeof theme === 'string' ) {
				setTheme( theme );
			} else {
				selectSiteType( siteTypes.findWhere( { name: siteTypeName } ) );
			}
		}
		showStep( step_slug );
		setProgress( step_slug );
	}

	function showStep( step_slug ) {
		$( 'section.step' ).hide();
		$( 'section.step[data-step=' + step_slug + ']' ).show();
	}

	function setProgress( step_slug ) {
		var step_num = 0;
		$( 'header .progress li' ).each( function() {
			var li = $( this ).addClass( 'done' );
			if ( li.data( 'step' ) == step_slug ) {
				current_step = _JetpackStart['steps'][step_num];
				return false;
			}
			step_num++;
		});
	}

	function goToNextStep() {
		var next_step_num  = _JetpackStart['steps'].indexOf( current_step ) + 1;
		current_step = _JetpackStart['steps'][ next_step_num ];
		router.navigate( 'setup/step/'+ current_step['slug'], true );
	}

}) ( jQuery );