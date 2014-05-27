<?php
/**
 * Label: Create your first post
 * Sort Order: 4
 */

global $pagenow;
if ( $pagenow == 'post-new.php' || $pagenow == 'post.php') {
	show_admin_bar( false );
	add_filter( 'jetpack_start_render_wizard', '__return_false' );
}

class Jetpack_Start_Step_first_post extends Jetpack_Start_Step {

	function __construct() {
		wp_enqueue_script('editor');
		add_action( 'jetpack-start_step-first-post', array( $this, 'render' ) );
	}

	function jetpack_start_js_globals( $jetpack_start_global_variables ) {
		return $jetpack_start_global_variables;
	}

}
