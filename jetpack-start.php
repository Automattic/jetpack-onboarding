<?php
/**
 * Plugin Name: Jetpack Start
 * Plugin URI: https://github.com/automattic/jetpack-start
 * Description: Jetpack Start Wizard.
 * Version: 0.1
 */

define( 'JETPACK_START_BASE_DIR', dirname( __FILE__ ) );
define( 'JETPACK_START_BASE_URL', plugins_url( 'jetpack-start', dirname( __FILE__ ) ) );

function jps_start() {
	if (current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
		if ( isset( $_GET['jps_wizard_end'] ) ) {
			add_option( 'jpstart_wizard_has_run', true );
			wp_safe_redirect( remove_query_arg( 'jps_wizard_end' ) );
			die();
		}

		if ( ! get_option( 'jpstart_wizard_has_run' ) || isset( $_GET['jps_wizard_start'] ) ) {

			// Hack to get sure  the welcome panel gets shown.
			update_user_meta( get_current_user_id(), 'show_welcome_panel', true );

			require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start.php' );
			if ( isset( $_GET['jps_wizard_start'] ) ) {
				delete_option( 'jpstart_wizard_has_run' );
				wp_safe_redirect( admin_url() );
			}
			Jetpack_Start::init();
		}

		require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start-welcome-panel.php' );
		Jetpack_Start_Welcome_Panel::init();
	}
}
add_action( 'init',  'jps_start' );

