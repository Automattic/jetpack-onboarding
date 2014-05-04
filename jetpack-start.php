<?php
/**
 * Plugin Name: Jetpack Start
 * Plugin URI: https://github.com/automattic/jetpack-start
 * Description: Jetpack Start Wizard.
 * Version: 0.1
 */

define( 'JETPACK_START_BASE_DIR', dirname( __FILE__ ) );
define( 'JETPACK_START_BASE_URL', plugins_url( 'jetpack-start', dirname( __FILE__ ) ) );

add_action( 'init', function() {
	update_option( 'jpstart_menu', true );
	update_option( 'jpstart_wizard_has_run', false );
	if ( ! get_option( 'jpstart_wizard_has_run' ) || isset( $_GET['wizard'] ) ) {
		if ( current_user_can( 'switch_themes' ) ) {
			if ( is_blog_admin() || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
				require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start.php' );
				if ( isset( $_GET['wizard'] ) ) {
					Jetpack_Start::redirect_to_step( Jetpack_Start::get_first_step() );
				}
				Jetpack_Start::init();
			} else {
				update_option( 'jpstart_menu', true );
			}
		}
	}
	if ( get_option( 'jpstart_menu' ) ) {
		update_option( 'jpstart_wizard_has_run', true );
		if ( current_user_can( 'switch_themes' ) ) {
			require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start.php' );
			if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
				Jetpack_Start::init_menu_ajax();
			} else { // check for is_admin_bar_showing so it doesn't get displayed on the cutomizer.
				global $wp_customize;
			}

			if ( ( ! is_admin() &&  ! is_object( $wp_customize ) ) || isset( $_GET['jps_menu_action'] ) ) {
				Jetpack_Start::init_menu();
			}
		}
	}
});
