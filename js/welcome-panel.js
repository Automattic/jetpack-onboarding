(function( $ ) {
	$(document).ready(function() {
		$('.welcome__section').focus(function() {
			$('.welcome__section.active').removeClass('active');
			$(this).toggleClass('active');
			return false;
		});
	});
}) ( jQuery );
