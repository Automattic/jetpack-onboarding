<script type="text/template" id="connect_jetpack_template">
<?php if ( ! empty( $step->label ) ) : ?>
	<h1><?php echo esc_html( $step->label ); ?></h1>
<?php endif; ?>
<p class="step-description"><?php _e( 'Jetpack supercharges your self‑hosted WordPress site with the awesome cloud power of WordPress.com at no additional hosting cost.', 'jetpack-start' ) ?></p>
<div class="jetpack-box">
	<?php $connected = false; ?>
		<a href="<?php echo $step->get_jetpack()->build_connect_url() ?>" class="jetpack-link" target="_top">
				<span class="wrap">
					<span class="title"><?php echo  __( 'Connect to WordPress.com', 'jetpack-start' );  ?></span>
				</span>
		</a>
</div>

<div class="skip"><?php printf( __( 'or, <a href="%s" class="next">skip this step</a>', 'jetpack-start' ), home_url() ); ?></div>
</script>

<script>
	(function( $ ) {
		var StepView = JetpackStartStepView.extend( {
			template_id : '#connect_jetpack_template',

			events: {
				"click a.next": "goToNextStep"
			}
		});

		jetpackStartWizard.addStep( new JetpackStartStep( { view: StepView, slug: '<?php echo $step->slug; ?>', sort: '<?php echo $step->sort; ?>' } ) );
	}) ( jQuery );
</script>
