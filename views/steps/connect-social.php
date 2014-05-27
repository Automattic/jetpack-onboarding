<script type="text/template" id="connect_social_template">
<?php if ( ! empty( $step->label ) ) : ?>
	<h1><?php echo esc_html( $step->label ); ?></h1>
<?php endif; ?>
<p class="step-description"><?php _e( 'Share your favorite posts effortlessly on Facebook and Twitter.', 'jetpack-start' ) ?></p>
<div class="social-box">
	<?php $connected = false; ?>
	<?php foreach( Jetpack_Start_Step_Connect_Social::get_social_services() as $service ): ?>
		<a href="<?php echo esc_url( $service['connect_url'] ); ?>" class="social-link <?php echo $service['short']; ?><?php if ( $service['connected'] ) : ?> connected<?php endif ?>" target="_top" data-social="<?php echo $service['name'] ?>">
				<span class="wrap">
					<span class="fa fa-<?php echo $service['name']; ?>"></span>
					<span class="title"><?php echo ( $service['connected'] ) ? __( 'Connected', 'jetpack-start' ) : sprintf( __( 'Connect to %s', 'jetpack-start' ), $service['title'] );  ?></span>
				</span>
		</a>
	<?php
		if ( $service['connected'] ) $connected = true;
	endforeach; ?>
	<div class="social-assurance"><em><?php _e( "Don't worry. You can select <strong>on a post-by-post basis</strong> what posts you share on Facebook and Twitter." ); ?></em></div>
</div>

<?php if ( $connected ) : ?>
	<a href="<?php echo home_url(); ?>" class="button button-primary button-hero submit next"><span class="med-icon fa fa-angle-double-right"></span><?php _e( 'Next', 'jetpack-start' ) ?></a>
<?php else : ?>
	<div class="skip"><?php printf( __( 'or, <a href="%s" class="next">skip this step</a>', 'jetpack-start' ), home_url() ); ?></div>
<?php endif ?>
</script>

<script>
	(function( $ ) {
		var StepView = JetpackStartStepView.extend( {
			template_id : '#connect_social_template',

			changeConnectingMessage : function() {
				this.$el.find( '.title' ).html(  _JetpackStart['connecting_message'] );
			},

			events: {
				"click .social-link": "changeConnectingMessage",
				"click a.next": "goToNextStep"
			}
		});

		jetpackStartWizard.addStep( new JetpackStartStep( { view: StepView, slug: '<?php echo $step->slug; ?>', sort: '<?php echo $step->sort; ?>' } ) );
	}) ( jQuery );
</script>
