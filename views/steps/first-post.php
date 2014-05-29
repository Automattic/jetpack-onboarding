<script type="text/template" id="first_post_template">
<?php if ( ! empty( $step->label ) ) : ?>
	<h1><?php echo esc_html( $step->label ); ?></h1>
<?php endif; ?>
<?php
global $current_user;
get_currentuserinfo();
?>

<p class="step-description">
	Introduce your site by editing the sample introduction below or simply start from scratch.
</p>

<div class="post-box">
	<?php
	$post = get_default_post_to_edit( 'post', true );
	$post->post_title = __( 'Introducing my new website' );

	$post_content[] = __( 'Thanks for stopping by and welcome to my new blog! This is just an introductory post so I’ll keep it short and sweet.' );
	$post_content[] = __( 'I decided to start a blog because I [what inspired you start a blog?]' );
	$post_content[] = __( 'Over the next few months I plan to be writing and sharing posts about [what topics will you be writing about?]' );
	$post_content[] = __( 'That’s it for now! If you’d like to be kept updated with my posts “Like” this post or subscribe to my blog.' );
	$post->post_content = implode( "\n\n", $post_content );

	$post_ID = $post->ID;
	$user_ID = get_current_user_id();
	$post_type = 'post';
	$post_type_object = get_post_type_object( $post_type );
	$GLOBALS['post'] = $post;

	$form_action = 'editpost';
	$nonce_action = 'update-post_' . $post_ID;
	$form_extra = "<input type='hidden' id='post_ID' name='post_ID' value='" . esc_attr($post_ID) . "' />";
	?>
	<div class="wrap">
	<form name="post" action="post.php" method="post" id="post"<?php do_action( 'post_edit_form_tag', $post ); ?>>
	<?php wp_nonce_field( $nonce_action ); ?>
	<input type="hidden" id="user-id" name="user_ID" value="<?php echo (int) $user_ID ?>" />
	<input type="hidden" id="hiddenaction" name="action" value="<?php echo esc_attr( $form_action ) ?>" />
	<input type="hidden" id="originalaction" name="originalaction" value="<?php echo esc_attr( $form_action ) ?>" />
	<input type="hidden" id="post_author" name="post_author" value="<?php echo esc_attr( $post->post_author ); ?>" />
	<input type="hidden" id="post_type" name="post_type" value="<?php echo esc_attr( $post_type ) ?>" />
	<input type="hidden" id="original_post_status" name="original_post_status" value="<?php echo esc_attr( $post->post_status) ?>" />
	<input type="hidden" id="referredby" name="referredby" value="<?php echo esc_url(wp_get_referer()); ?>" />

	<?php
	wp_original_referer_field( true, 'previous' );
	echo $form_extra;

	wp_nonce_field( 'meta-box-order', 'meta-box-order-nonce', false );
	wp_nonce_field( 'closedpostboxes', 'closedpostboxesnonce', false );
	?>

	<?php
	do_action( 'edit_form_top', $post ); ?>

	<div id="poststuff">
		<div id="post-body" class="metabox-holder columns-1>">
			<div id="post-body-content">
				<div id="titlediv">
					<div id="titlewrap">
						<label class="screen-reader-text" id="title-prompt-text" for="title"><?php echo apply_filters( 'enter_title_here', __( 'Enter title here' ), $post ); ?></label>
						<input type="text" name="post_title" size="30" value="<?php echo esc_attr( htmlspecialchars( $post->post_title ) ); ?>" id="title" autocomplete="off" />
					</div>
				</div><!-- /titlediv -->
				<div id="postdivrich" class="postarea edit-form-section">
					<?php wp_editor( $post->post_content, 'content', array(
						'drag_drop_upload' => true,
						'tabfocus_elements' => 'insert-media-button,save-post',
						'editor_height' => 360,
						'tinymce' => array(
							'resize' => false,
							'add_unload_trigger' => false,
						),
					) ); ?>
				</div>
			</div><!-- /post-body-content -->
		</div><!-- /post-body -->
		<br class="clear" />
	</div><!-- /poststuff -->
	</form>
	</div>

	<a href="<?php echo home_url(); ?>" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span><?php _e( 'Publish and visit your dashboard', 'jetpack-start' ) ?></a>
	<div class="skip skip-post"><?php printf( __( 'or, <a href="%s" class="next">skip this step</a>', 'jetpack-start' ), home_url() ); ?></div>

	<p>
	<?php echo esc_html( sprintf( __( 'We sent a confirmation email to', 'jetpack-start' )) ); ?>
	<strong>
	<?php echo esc_html( sprintf( __( '%s', 'jetpack-start' ), $current_user->user_email ) ); ?>
	</strong>
	<?php echo esc_html( sprintf( __( ' - please confirm your email address to enable posting.', 'jetpack-start' )) ); ?>
	</p>

</script>
<?php
	require_once( ABSPATH . WPINC . '/class-wp-editor.php' );
	_WP_Editors::editor_js();
?>
<script>
	(function( $ ) {
		var StepView = JetpackStartStepView.extend( {
			template_id : '#first_post_template',

			changeConnectingMessage : function() {
				this.$el.find( '.title' ).html(  _JetpackStart['connecting_message'] );
			},

			afterRender : function() {
				switchEditors.go( $( '#content-tmce' ).el );
				$( '#wp-content-media-buttons' ).remove();
				$( '#title' ).focus();
			},

			events: {
				"click a.submit": "submitPost",
				"click a.next": "goToNextStep"
			},

			submitPost: function( event ) {
				event.preventDefault();

				$.post(
					$( '#post' ).attr( 'action' ),
					$( '#post' ).serialize() + "&publish=<?php esc_attr_e( 'Publish' ) ?>",
					function( data ) {
						jetpackStartWizard.goToNextStep( event );
					}
				);
			}

		});

		jetpackStartWizard.addStep( new JetpackStartStep( { view: StepView, slug: '<?php echo $step->slug; ?>', sort: '<?php echo $step->sort; ?>' } ) );
	}) ( jQuery );
</script>
