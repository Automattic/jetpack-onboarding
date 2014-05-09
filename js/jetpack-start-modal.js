(function( $ ) {
	$(document).ready(function() {
        $( '.nux-shade, .nux-options' ).show();
        $( '.close-nux-options, .nux-shade' ).on('click', function () {
        	$( '.nux-shade, .nux-options' ).hide();
        })

		var body = $( 'body' );
		if ( $.cookie( 'hide_jpstart_modal' ) == "true" ) {
			body.addClass( 'hide-admin-modal' );
		}
		body.append( _JetpackStartModal.html );
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
			body.toggleClass( 'hide-admin-modal' );
			$.cookie( 'hide_jpstart_modal', body.hasClass( 'hide-admin-modal' ) );
			var data = {
				action: 'jetpackstart_modal_status',
				menu_status: body.hasClass( 'hide-admin-modal' )
			};
			$.post( _JetpackStartMenu.ajaxurl, data );
			return false;
		});
	});
}) ( jQuery );
