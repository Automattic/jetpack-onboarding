(function( $ ) {
	$(document).ready(function() {
        var body = $( 'body' );
		if ( $.cookie( 'hide_jpstart_menu' ) == "true" ) {
			body.addClass( 'hide-admin-menu' );
		}
        body.append( _JetpackStartMenu.html );
		// Add toolbar toggle link
		$( '#wp-admin-bar-top-secondary' ).prepend( 
			'<li id="jps-admin-links-toggle" class="jps-admin-links-toggle">' +
				'<a href="#" class="jps-burger active">' +
					'<span class="fa fa-bars"></span>' +
				'</a>' +
			'</li>'
		);
		$( '.jps-burger' ).on( 'click', function () {
			$( this ).toggleClass( 'active' );
			body.toggleClass( 'hide-admin-menu' );
			$.cookie( 'hide_jpstart_menu', body.hasClass( 'hide-admin-menu' ) );
			var data = {
				action: 'jetpackstart_menu_status',
				menu_status: body.hasClass( 'hide-admin-menu' )
			};
			$.post( _JetpackStartMenu.ajaxurl, data );
			return false;
		});
	});
}) ( jQuery );
