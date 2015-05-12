<?php

class Jetpack_Start_WelcomePanel {

	const CHANGE_TITLE_KEY = 'change-title';

	static function init() {
		add_action( 'load-index.php', array( __CLASS__, 'init_welcome_panel' ) );
	}

	static function init_welcome_panel() {
		$screen = get_current_screen();
		if( $screen->base == 'dashboard' ) {

			//reset data
			if ( isset( $_GET['jps_reset'] ) ) {
				delete_option( Jetpack_Start_EndPoints::STEP_STATUS_KEY );
				delete_option( Jetpack_Start_EndPoints::STARTED_KEY );


				delete_option( 'jetpack_blog_token' );
				delete_option( 'jetpack_id' );

				//also reset JP data
				delete_option( 'jetpack_options'        );

				// Delete all non-compact options
				delete_option( 'jetpack_register'       );
				delete_option( 'jetpack_activated'      );
				delete_option( 'jetpack_active_modules' );
				delete_option( 'jetpack_do_activate'    );

				// Delete all legacy options
				delete_option( 'jetpack_was_activated'  );
				delete_option( 'jetpack_auto_installed' );
				delete_transient( 'jetpack_register'    );

				wp_redirect(remove_query_arg('jps_reset'));
				die();
			}

			//replace the usual welcome panel with our own
			remove_action( 'welcome_panel', 'wp_welcome_panel' );
			add_action( 'welcome_panel', array( __CLASS__, 'wp_welcome_panel' ) );

			// vars to inject into javascript
			$jps_vars = Jetpack_Start_EndPoints::js_vars();

			//IE-only shims
			global $wp_scripts;
			wp_register_script( 'ie-shims', plugins_url( 'js/ie-shims.js', __FILE__ ), array());
			$wp_scripts->add_data( 'ie-shims', 'conditional', 'lt IE 9' );
			
			//Core JS app
			wp_register_script( 'jetpack-start', plugins_url( 'js/jetpack-start.js', __FILE__ ), array( 'jquery', 'underscore', 'wp-pointer', 'ie-shims' ) );
			wp_localize_script( 'jetpack-start', 'JPS', $jps_vars );
			wp_enqueue_script( 'jetpack-start' );

			// CSS
			global $wp_styles;
			wp_register_style( 'ie8', plugins_url( 'css/ie8.css', __FILE__ ) );
			$wp_styles->add_data( 'ie8', 'conditional', 'lt IE 9' );

			wp_enqueue_style( 'jetpack-start', plugins_url( 'css/welcome-panel.css', __FILE__ ), array( 'wp-admin', 'wp-pointer' ) );
			wp_enqueue_style( 'ie8' );
		}
	}

	static function wp_welcome_panel() {
		echo "<div id='jps-welcome-panel'>Loading Welcome Wizard</div>";
	}
}

