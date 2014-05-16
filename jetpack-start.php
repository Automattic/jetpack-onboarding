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
	if (current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
		if ( isset( $_GET['jps_wizard_end'] ) ) {
			add_option( 'jpstart_wizard_has_run', true );
			wp_safe_redirect( remove_query_arg( 'jps_wizard_end' ) );
			die();
		}

		if ( ! get_option( 'jpstart_wizard_has_run' ) || isset( $_GET['jps_wizard_start'] ) ) {
			require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start.php' );
			if ( isset( $_GET['jps_wizard_start'] ) ) {
				delete_option( 'jpstart_wizard_has_run' );
				wp_safe_redirect( admin_url() );
			}
			Jetpack_Start::init();
		}

		if ( current_user_can( 'switch_themes' ) ) {
			require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start-modal.php' );
			Jetpack_Start_Modal::init();
		}
	}
});

