<?php

class Jetpack_Start_Welcome_Panel {

	static function init() {
		if ( isset( $_GET['jps_wp_action'] ) ) {
			do_action( 'jetpack_start_welcome_panel_action', sanitize_text_field( $_GET['jps_wp_action'] ) );
			wp_safe_redirect( remove_query_arg( 'jps_wp_action' ) );
		}

		add_action('load-index.php', array( __CLASS__, 'init_welcome_panel' ) );
	}

	static  function init_welcome_panel() {
		$screen = get_current_screen();
		if( $screen->base == 'dashboard' ) {
			remove_action( 'welcome_panel', 'wp_welcome_panel' );
			add_action( 'welcome_panel', array( __CLASS__, 'wp_welcome_panel' ) );
			wp_enqueue_script( 'jetpack-start', plugins_url( 'js/welcome-panel.js', __FILE__ ), array( 'jquery' ) );
			wp_enqueue_style( 'jetpack-start', plugins_url( 'css/welcome-panel.css', __FILE__ ), array( 'wp-admin' ) );
		}
	}

	static function add_action_arg( $url, $action ) {
		return add_query_arg( 'jps_wp_action', $action, $url );
	}

	static function wp_welcome_panel() {
		require_once ( JETPACK_START_BASE_DIR . '/class.jetpack-start.php' );
		Jetpack_Start::get_view( 'welcome-panel.php' );
	}

}
