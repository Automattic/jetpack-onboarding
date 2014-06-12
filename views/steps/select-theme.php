<script type="text/template" id="select_themes_template" >
<div class="select-theme step-content">
	<div class="section-header">
		<?php if ( ! empty( $step->label ) ) : ?>
			<h1><?php echo esc_html( $step->label ); ?></h1>
		<?php endif; ?>
		<p class="step-description"><?php _e( 'To get started, select from one of the themes below. You can always change it later. (There are over 250 themes to choose from.)', 'jetpack-start' ) ?></p>
	</div>
	<div class="themes-box">
	<% _.each( themes, function( theme ) { %>
		<div class="theme" data-theme="<%= theme.stylesheet %>" style="background-image:url('<%= theme.img_preview %>');background-size: 100%;">
			<div class="theme-buttons">
				<a href="<%= theme.demo_url %>" class="button--secondary button--large theme-preview" target="_blank"><span class="small-icon fa fa-external-link"></span><?php _e( 'Preview', 'jetpack-start' ) ?></a>
				<a href="" class="button--primary button--large theme-select"><span class="small-icon fa fa-arrow-circle-o-right"></span><?php _e( 'Select Theme', 'jetpack-start' ) ?></a>
			</div>
		</div>
	<% }); %>
	</div>
</div>
</script>

<script>
	(function( $ ) {
		var StepView = JetpackStartStepView.extend({
			template_id : '#select_themes_template',

			setTheme : function ( event ) {
				var theme = $( event.currentTarget ).attr( 'data-theme' );
				var data = {
					action: 'jetpackstart_set_theme',
					stylesheet: theme
				};
				$.post( _JetpackStart['ajaxurl'], data );
			},

			events: {
				"click .theme" : function( event ) {
					this.setTheme( event );
					this.goToNextStep( event );
				},
				"click .theme a.theme-preview" : "stopPropagation"
			}
		});

		JetpackStartStepSelectTheme = JetpackStartStep.extend({
			defaults: {
				themes:  _JetpackStart['themes']
			},
			setThemes : function( themes ) {
				this.set( { themes : themes } );
			}
		});

		jetpackStartWizard.addStep( new JetpackStartStepSelectTheme( {
			view : StepView,
			slug : '<?php echo $step->slug ?>',
			sort : '<?php echo $step->sort ?>'
		} ));
	}) ( jQuery );
</script>
