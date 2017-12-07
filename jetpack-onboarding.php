<?php
/**
 * Plugin Name: Jetpack Onboarding
 * Plugin URI: https://github.com/automattic/jetpack-onboarding
 * Description: Jetpack Onboarding Wizard.
 * Version: 1.7.4
 */

require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-onboarding-end-points.php' );
require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-onboarding-welcome-panel.php' );

defined( 'JETPACK_ONBOARDING_BASE_DIR' )         or define( 'JETPACK_ONBOARDING_BASE_DIR', dirname( __FILE__ ) );
defined( 'JETPACK_ONBOARDING_BASE_URL' )         or define( 'JETPACK_ONBOARDING_BASE_URL', plugin_dir_url( __FILE__ ) );
defined( 'JETPACK_STEP_AUTO_REDIRECT' )     or define( 'JETPACK_STEP_AUTO_REDIRECT', true );
defined( 'JETPACK_STEP_AUTO_REDIRECT_SRC' ) or define( 'JETPACK_STEP_AUTO_REDIRECT_SRC', 'custom_src' );
defined( 'JETPACK_ONBOARDING_VENDOR_CODE' ) or define( 'JETPACK_ONBOARDING_VENDOR_CODE', 'unknown' );
defined( 'JETPACK_ONBOARDING_PRODUCT_CODE' ) or define( 'JETPACK_ONBOARDING_PRODUCT_CODE', 'unknown' );

register_uninstall_hook( __FILE__, 'jpo_reset' );

function jpo_start() {
	if ( is_admin() && current_user_can( 'administrator' ) ) {
		Jetpack_Onboarding_EndPoints::init();
		Jetpack_Onboarding_WelcomePanel::init();
	}
}
add_action( 'init',  'jpo_start' );

function jpo_reset() {
	delete_option( Jetpack_Onboarding_EndPoints::STEP_STATUS_KEY );
	delete_option( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY );
	delete_option( Jetpack_Onboarding_EndPoints::STARTED_KEY );
	delete_option( Jetpack_Onboarding_EndPoints::CONTACTPAGE_ID_KEY );
	delete_option( Jetpack_Onboarding_EndPoints::HIDE_FOR_ALL_USERS_OPTION );
	delete_option( Jetpack_Onboarding_EndPoints::SITE_TYPE );

	// If we have a current user, reset JPO for only the current user.
	// Otherwise, reset for all admins.
	$users = array();
	if ( get_current_user_id() ) {
		$users[] = get_current_user_id();
	} else {
		$users_query = get_users( array(
			'role' => 'administrator',
			'fields' => array( 'id' ) )
		);

		$users = wp_list_pluck( $users_query, 'id' );
	}

	foreach ( $users as $user_id ) {
		$setting = get_user_option( 'metaboxhidden_dashboard', $user_id );

		if ( ! $setting || ! is_array( $setting ) ) {
			$setting = array();
		}

		if ( in_array( Jetpack_Onboarding_WelcomePanel::DASHBOARD_WIDGET_ID, $setting ) ) {
			$setting = array_diff( $setting, array( Jetpack_Onboarding_WelcomePanel::DASHBOARD_WIDGET_ID ) );
			update_user_option( $user_id, "metaboxhidden_dashboard", $setting, true );
		}
	}
}

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'jpo reset', 'jpo_reset' );
}
