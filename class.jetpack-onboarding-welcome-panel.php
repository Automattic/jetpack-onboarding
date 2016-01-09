<?php

class Jetpack_Onboarding_WelcomePanel {

	const CHANGE_TITLE_KEY = 'change-title';

	static function init() {
		add_action( 'load-index.php', array( __CLASS__, 'init_welcome_panel' ) );
	}

	static function init_welcome_panel() {
		$screen = get_current_screen();
		if( $screen->base == 'dashboard' ) {

			//reset data
			if ( isset( $_GET['jpo_reset'] ) ) {
				delete_option( Jetpack_Onboarding_EndPoints::STEP_STATUS_KEY );
				delete_option( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY );
				delete_option( Jetpack_Onboarding_EndPoints::STARTED_KEY );
				delete_option( Jetpack_Onboarding_EndPoints::DISABLED_KEY );
				delete_option( Jetpack_Onboarding_EndPoints::CONTACTPAGE_ID_KEY );

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

				wp_redirect(remove_query_arg('jpo_reset'));
				die();
			}

			if ( get_option( Jetpack_Onboarding_EndPoints::DISABLED_KEY, false ) ) {
				return;
			}

			//replace the usual welcome panel with our own
			remove_action( 'welcome_panel', 'wp_welcome_panel' );
			add_action( 'welcome_panel', array( __CLASS__, 'wp_welcome_panel' ) );

			// vars to inject into javascript
			$jpo_vars = Jetpack_Onboarding_EndPoints::js_vars();

			//IE-only shims
			global $wp_scripts;

			wp_register_script( 'react', plugins_url( 'js/react-0.13.3.min.js', __FILE__ ), array());
			wp_enqueue_script( 'react' );

			wp_register_script( 'ie-shims', plugins_url( 'dist/ie-shims.js', __FILE__ ), array( 'react' ));
			$wp_scripts->add_data( 'ie-shims', 'conditional', 'lt IE 9' );

			//Core JS app
			wp_register_script( 'jetpack-onboarding', plugins_url( 'dist/jetpack-onboarding.js', __FILE__ ), array( 'jquery', 'underscore', 'wp-pointer', 'ie-shims', 'react' ) );
			wp_localize_script( 'jetpack-onboarding', 'JPS', $jpo_vars );
			wp_enqueue_script( 'jetpack-onboarding' );

			// CSS
			wp_enqueue_style( 'jetpack-onboarding-components', plugins_url( 'dist/jetpack-onboarding.css', __FILE__ ), array( 'wp-admin' ) );
			wp_enqueue_style( 'jetpack-onboarding-panel', plugins_url( 'css/welcome-panel.css', __FILE__ ), array( 'wp-admin', 'wp-pointer' ) );
			wp_enqueue_style( 'ie8' );
		}
	}

	static function wp_welcome_panel() {
		if ( false === get_option( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY, false ) ) {
			update_option( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY, true );
			do_action( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY );
		}

		echo "<div id='jpo-welcome-panel'><span class='screen-reader-text'>Loading Welcome Wizard</span></div>";
	}
}
