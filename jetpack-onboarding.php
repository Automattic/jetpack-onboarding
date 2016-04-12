<?php
/**
 * Plugin Name: Jetpack Onboarding
 * Plugin URI: https://github.com/automattic/jetpack-onboarding
 * Description: Jetpack Onboarding Wizard.
 * Version: 1.2
 */

defined( 'JETPACK_ONBOARDING_BASE_DIR' )         or define( 'JETPACK_ONBOARDING_BASE_DIR', dirname( __FILE__ ) );
defined( 'JETPACK_ONBOARDING_BASE_URL' )         or define( 'JETPACK_ONBOARDING_BASE_URL', plugins_url( 'jetpack-onboarding', dirname( __FILE__ ) ) );
defined( 'JETPACK_STEP_AUTO_REDIRECT' )     or define( 'JETPACK_STEP_AUTO_REDIRECT', true );
defined( 'JETPACK_STEP_AUTO_REDIRECT_SRC' ) or define( 'JETPACK_STEP_AUTO_REDIRECT_SRC', 'custom_src' );
defined( 'JETPACK_ONBOARDING_VENDOR_CODE' ) or define( 'JETPACK_ONBOARDING_VENDOR_CODE', 'unknown' );
defined( 'JETPACK_ONBOARDING_PRODUCT_CODE' ) or define( 'JETPACK_ONBOARDING_PRODUCT_CODE', 'unknown' );

function jpo_start() {
	if ( is_admin() ) {
		require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-onboarding-end-points.php' );
		require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-onboarding-welcome-panel.php' );
		Jetpack_Onboarding_EndPoints::init();
		Jetpack_Onboarding_WelcomePanel::init();
	}
}

add_action( 'init',  'jpo_start' );

