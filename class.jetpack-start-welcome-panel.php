<?php

namespace JetpackStart;
class WelcomePanel {

	const CHANGE_TITLE_KEY = 'change-title';

	static function init() {
		add_action( 'load-index.php', array( __CLASS__, 'init_welcome_panel' ) );
	}

	static function init_welcome_panel() {
		$screen = get_current_screen();
		if( $screen->base == 'dashboard' ) {
			//replace the usual welcome panel with our own
			remove_action( 'welcome_panel', 'wp_welcome_panel' );
			add_action( 'welcome_panel', array( __CLASS__, 'wp_welcome_panel' ) );

			// vars to inject into javascript
			$jps_vars = \JetpackStart\EndPoints::js_vars();

			// JS
			wp_register_script( 'jetpack-start', plugins_url( 'js/jetpack-start.js', __FILE__ ), array( 'backbone', 'jquery' ) );
			wp_localize_script( 'jetpack-start', 'JPS', $jps_vars );
			wp_enqueue_script( 'jetpack-start' );

			// CSS
			wp_enqueue_style( 'jetpack-start', plugins_url( 'css/welcome-panel.css', __FILE__ ), array( 'wp-admin' ) );
			wp_register_style( 'jps-font-awesome', plugins_url( 'css/font-awesome.css', __FILE__ ) );
			wp_enqueue_style( 'jps-font-awesome' );
		}
	}

	static function wp_welcome_panel() {
		require_once ( JETPACK_START_BASE_DIR . '/views/welcome-panel.php' );
	}

	static function add_action_arg($arg) {
		//noop
	}
}

