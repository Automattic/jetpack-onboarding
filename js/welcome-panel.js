(function( $ ) {
	$(document).ready(function() {
		$('.welcome__section').click(function() {
			$('.welcome__section.active').removeClass('active');
			$(this).toggleClass('active');
			return false;
		});
	});
}) ( jQuery );
