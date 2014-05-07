<script type="text/template" id="select_themes_template" >
<p class="step-description"><?php _e( 'To get started, select from one of the four themes below. You can always change it later (there are over 250 themes to choose from).', 'jetpack-start' ) ?></p>
<div class="themes-box">
<% _.each( themes, function( theme ) { %>
	<div class="theme" data-theme="<%= theme.stylesheet %>" style="background-image:url('<%= theme.img_preview %>');background-size: 100%;">
		<div class="theme-buttons">
			<a href="<%= theme.demo_url %>" class="button button-large theme-preview" target="_blank"><span class="small-icon fa fa-external-link"></span><?php _e( 'Preview', 'jetpack-start' ) ?></a>
		</div>
	</div>
<% }); %>
</div>
</script>


<script>
	(function( $ ) {
		var StepView = JetpackStartStepView.extend({
			template_id : '#select_themes_template',

			setTheme : function ( theme ) {
				var data = {
					action: 'jetpackstart_set_theme',
					stylesheet: theme
				};
				$.post( _JetpackStart['ajaxurl'], data );
			},


/*			siteTypes.each( function( siteType ) {
				$.each( siteType.get( 'themes' ), function( i, theme ) {
					// Preload Theme images
					$( '<img />' ).attr( 'src', theme['img_preview'] );
				});
			});
*/
			events: {
				"click .theme" : "setTheme",
				"click .theme" : "goToNextStep",
				"click .theme a" : "stopPropagation"
			}
		});

		JetpackStartStepSelectTheme = JetpackStartStep.extend({
			setThemes : function( themes ) {
				this.set( { themes : themes } );
			}
		});

		jetpackStartWizard.addStep( new JetpackStartStepSelectTheme( {
			view : StepView,
			slug : 'select_theme'
		} ));
	}) ( jQuery );
</script>
