<?php
/*
Plugin Name: Jetpack Start
Plugin URI: https://github.com/automattic/jetpack-start
Description: Jetpack Start Wizard.
Version: 0.1
*/

add_action( 'init', function() {
	update_option( 'jpstart_menu', true );
	if ( get_option( 'jpstart_wizard' ) ) {
		if ( current_user_can( 'switch_themes' ) ) {
			if ( is_blog_admin() || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
				require_once( __DIR__ . '/jetpack-start/class.jetpack-start.php' );
				Jetpack_Start::init();
			} else {
				update_option( 'jpstart_menu', true );
			}
		}
	}
	if ( get_option( 'jpstart_menu' ) ) {
		if ( current_user_can( 'switch_themes' ) ) {
			require_once( __DIR__ . '/jetpack-start/class.jetpack-start.php' );
			if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
				Jetpack_Start::init_menu_ajax();
			} else // check for is_admin_bar_showing so it doesn't get displayed on the cutomizer.
				global $wp_customize;

				if ( !is_object( $wp_customize ) || isset( $_GET['jps_menu_action'] ) ) {
					delete_option( 'jpstart_wizard' );
					Jetpack_Start::init_menu();
				}
		}
	}
});
