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
	if ( isset( $_GET['jps_wizard_end'] ) ) {
		add_option( 'jpstart_wizard_has_run', true );
	}

	if ( ! get_option( 'jpstart_wizard_has_run' ) || isset( $_GET['jps_wizard_start'] ) ) {
		require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start.php' );
		if ( isset( $_GET['jps_wizard_start'] ) ) {
			delete_option( 'jpstart_wizard_has_run' );
			Jetpack_Start::redirect_to_step( Jetpack_Start::get_first_step()['slug'] );
		}
		Jetpack_Start::init();
	}

	if ( current_user_can( 'switch_themes' ) ) {
		require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start-menu.php' );
		Jetpack_Start_Menu::init();
	}
});

