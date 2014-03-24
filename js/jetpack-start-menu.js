(function($) {
	$(document).ready(function() {
		$('body').append(_JetpackStartMenu);
		
		// Add toolbar toggle link
		$('#wp-admin-bar-top-secondary').prepend('<li id="jps-admin-links-toggle" class="jps-admin-links-toggle"><a href="#" class="jps-burger active"><span class="fa fa-bars"></span></a></li>');
		$('.jps-burger').on('click', function () {
			$(this).toggleClass('active');
			$('body').toggleClass('hide-admin-menu');
			
			return false;
		});
	});
})(jQuery);
