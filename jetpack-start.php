<?php
/**
 * Plugin Name: Jetpack Start
 * Plugin URI: https://github.com/automattic/jetpack-start
 * Description: Jetpack Start Wizard.
 * Version: 0.1
 */

defined( 'JETPACK_START_BASE_DIR' )         or define( 'JETPACK_START_BASE_DIR', dirname( __FILE__ ) );
defined( 'JETPACK_START_BASE_URL' )         or define( 'JETPACK_START_BASE_URL', plugins_url( 'jetpack-start', dirname( __FILE__ ) ) );
defined( 'JETPACK_STEP_AUTO_REDIRECT' )     or define( 'JETPACK_STEP_AUTO_REDIRECT', true );
defined( 'JETPACK_STEP_AUTO_REDIRECT_SRC' ) or define( 'JETPACK_STEP_AUTO_REDIRECT_SRC', 'custom_src' );


function jps_start() {
	if ( is_admin() ) {
		require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start-end-points.php' );
		require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start-welcome-panel.php' );
		Jetpack_Start_EndPoints::init();
		Jetpack_Start_WelcomePanel::init();
	}
}

add_action( 'init',  'jps_start' );

