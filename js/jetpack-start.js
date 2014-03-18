(function($) {
	var jps_step = 1;
	var jps_site_type = _JetpackStartDefaultSiteType;
	var jps_theme = ( _JetpackStartDefaultTheme )? _JetpackStartDefaultTheme : _JetpackStartSiteTypes[_JetpackStartDefaultSiteType]['themes'][0]['stylesheet'];
	var JetpackStartRouter = Backbone.Router.extend({
		routes: {
			"setup/step/:step": "render",
			"setup/step/:step/:site_type": "render",
			"setup/step/:step/:site_type/:theme": "render",
		}
	});
	var router;

	$(document).ready(function() {
		router = new JetpackStartRouter;
		router.on('route:render', render);

		Backbone.history.start();

		$('section.step-2').on('click', '.theme', function() {
                        router.navigate('setup/step/2/'+ jps_site_type +'/'+ $(this).data('theme'), true);
                });
		$('section.step-4').on('click', '.social-link', function(el) {
			$(this).find('.title').html(_JetpackStartConnecting);
		});
	});

	function selectSiteType() {
		themes = _JetpackStartSiteTypes[jps_site_type]['themes'];
		var template = $('#themes_template').html();
		$("section.step-2 .themes-box").html(_.template(template, {themes: themes}));
		itemSelection($('[href$="#setup/step/1/' + jps_site_type + '"]'));
	}

	function selectTheme() {
		var data = {
			action: 'jetpackstart_set_theme',
			stylesheet: jps_theme
		};
		$.post( ajaxurl, data );
		itemSelection($('.theme[data-theme="' +jps_theme+'"]'));
	}

	function itemSelection($this) {
		$this.siblings().removeClass('active');
		$this.addClass('active');
	}

	function render(step, site_type, theme) {
		jps_step = step || jps_step;
		jps_site_type = site_type || jps_site_type;
		jps_theme = theme || jps_theme;
		selectSiteType();
		selectTheme();
		$('body').removeClass();
		$('body').addClass('step' + jps_step);
	}

})(jQuery);
