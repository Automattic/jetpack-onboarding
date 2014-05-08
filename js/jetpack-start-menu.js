(function( $ ) {
	$(document).ready(function() {
        $( '.nux-shade, .nux-options' ).show();
        $( '.close-nux-options, .nux-shade' ).on('click', function () {
        	$( '.nux-shade, .nux-options' ).hide();
        })
	});
}) ( jQuery );
