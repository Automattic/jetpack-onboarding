<?php

class Jetpack_Start_Modal {

	static function init() {
		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			if ( isset( $_GET['jps_modal_action'] ) ) {
				do_action( 'jetpack_start_modal_action', sanitize_text_field( $_GET['jps_modal_action'] ) );
				wp_safe_redirect( remove_query_arg( 'jps_modal_action' ) );
			}
			if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
				self::init_modal_ajax();
			}

			// check for is_admin_bar_showing so it doesn't get displayed on the cutomizer.
			global $wp_customize;
			if ( ( ! is_admin() && ! is_object( $wp_customize ) ) || isset( $_GET['jps_modal_action'] ) ) {
				self::render();
			}
		}
	}

	static function render() {
		ob_start();
		?>
		<div class="nux-shade"></div>
		<div class="nux-options">
			<a href="#" class="close-nux-options"><span class="icon fa fa-times"></span></a>
			<h1><?php _e( 'Welcome to your new site!  What will you do next?', 'jetpack-start' ); ?></h1>
			<a href="<?php echo admin_url( 'post-new.php?jps_modal_action=post-new' ); ?>" class="option next-step" data-action="post-new"><span class="big-icon fa fa-pencil-square-o"></span><?php _e( 'Write my first post', 'jetpack-start' ); ?></a>
			<a href="<?php echo esc_url( admin_url( 'customize.php?jps_modal_action=customize&return=' . home_url() ) ); ?>" class="option next-step" data-action="customize"><span class="big-icon fa fa-laptop"></span><?php _e( 'Edit my site design', 'jetpack-start' ); ?></a>
			<a href="<?php echo admin_url( 'themes.php?jps_modal_action=themes' ); ?>" class="option next-step" data-acton="themes"><span class="big-icon fa fa-refresh"></span><?php _e( 'Choose a new design', 'jetpack-start' ); ?></a>
		</div>
		<?php
		$jetpackstart_modal['html'] = ob_get_contents();
		$jetpackstart_modal['status'] = get_option( 'jpstart_modal_status', "true" );
		$jetpackstart_modal['ajaxurl'] = admin_url( 'admin-ajax.php' );
		ob_end_clean();
		wp_enqueue_script( 'jetpack-start', plugins_url( 'js/jetpack-start-modal.js', __FILE__ ), array( 'jquery' ) );
		wp_localize_script( 'jetpack-start', '_JetpackStartModal', $jetpackstart_modal );
		wp_register_style( 'jetpack-start', plugins_url( 'css/jetpack-start-menu.css', __FILE__ ) );
		wp_register_style( 'jps-font-awesome', plugins_url( 'css/font-awesome.css', __FILE__ ) );
		wp_enqueue_style( 'jetpack-start' );
		wp_enqueue_style( 'jps-font-awesome' );
	}

	static function init_modal_ajax() {
		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			add_action( 'wp_ajax_jetpackstart_modal_status', array( __CLASS__, 'modal_status' ) );
		}
	}

	static function modal_status() {
		$modal_status = sanitize_text_field( $_POST['modal_status'] );
		$result = update_option( 'jpstart_modal_status', $modal_status );
		do_action( 'jetpack_start_modal_status_change', $modal_status );
		wp_send_json_success( $result );
	}

}
