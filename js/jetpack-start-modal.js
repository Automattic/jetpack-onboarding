(function( $ ) {
	$(document).ready(function() {
		var modal = $( '<div/>' ).html( _JetpackStartModal.html ).contents();
		if ( _JetpackStartModal.status == "true" ) {
			modal.show();
		} else {
			modal.hide();
		}
		$( 'body' ).append( modal );
		// Add toolbar toggle link
		$( '#wp-admin-bar-top-secondary' ).prepend(
			'<li id="jps-admin-links-toggle" class="jps-admin-links-toggle">' +
			'<a href="#" class="jps-burger active">' +
			'<span class="fa fa-bars"></span>' +
			'</a>' +
			'</li>'
		);
		$( '.jps-burger, .close-nux-options, .nux-shade' ).on( 'click', function () {
			$( this ).toggleClass( 'active' );
			modal.toggle();
			var data = {
				action: 'jetpackstart_modal_status',
				modal_status: modal.is(":visible")
			};

			$.post( _JetpackStartModal.ajaxurl, data );
			return false;
		});
	});
}) ( jQuery );
