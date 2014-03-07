(function($){
	$(document).ready(function () {
		initEvents();
	});
	
	function initEvents() {
		// Form submission
		$('.submit').on('click', function () {
			$(this).closest('form').submit();
			return false;
		});
		// STEP 1
		$('.option').on('click', function () {
			itemSelection($(this), 'option');
		});
		// STEP 2
		$('.theme').on('click', function () {
			itemSelection($(this), 'theme');
		});
		// STEP 3
		$('.jetpack-login a').on('click', function () {
			$('body').toggleClass('login signup');
			return false;
		});
		// STEP 4
		$('.social-link').on('click', function () {
			var $this = $(this),
				thisService = $this.data('service');
			
			if (confirm('Show the oauth popup')) {
				$this.css('background', '#73c650').find('.title').text('Connected');
				$('.submit').show();
				$('.skip').hide();
			}
			return false;
		});
		// STEP 5
		$('.jps-burger').on('click', function () {
			$(this).toggleClass('active');
			$('body').toggleClass('hide-admin-menu');
			
			return false;
		});
	}
	
	function itemSelection($this, step) {
		$('.' + step).removeClass('active');
		$this.addClass('active');
		
		$('.' + step + '-selected').val($this.data(step));
		
		return false;
	}
})(jQuery);