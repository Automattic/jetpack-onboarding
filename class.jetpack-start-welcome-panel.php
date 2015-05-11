<?php

class Jetpack_Start_WelcomePanel {

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
			$jps_vars = Jetpack_Start_EndPoints::js_vars();

			// JS
			global $wp_scripts;
			wp_register_script( 'ie-shims', plugins_url( 'js/ie-shims.js', __FILE__ ), array());
			
			$wp_scripts->add_data( 'ie-shims', 'conditional', 'lt IE 9' );
			
			wp_register_script( 'jetpack-start', plugins_url( 'js/jetpack-start.js', __FILE__ ), array( 'jquery', 'underscore', 'wp-pointer', 'ie-shims' ) );
			wp_localize_script( 'jetpack-start', 'JPS', $jps_vars );
			wp_enqueue_script( 'jetpack-start' );

			// CSS
			wp_enqueue_style( 'jetpack-start', plugins_url( 'css/welcome-panel.css', __FILE__ ), array( 'wp-admin', 'wp-pointer' ) );
		}
	}

	static function wp_welcome_panel() {
		echo "<div id='jps-welcome-panel'>Loading Welcome Wizard</div>";
	}
}

