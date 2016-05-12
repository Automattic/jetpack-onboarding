<?php

class Jetpack_Onboarding_WelcomePanel {

	const CHANGE_TITLE_KEY = 'change-title';
	const DASHBOARD_WIDGET_ID = 'jetpack-onboarding';

	static function init() {
		add_filter( 'update_user_metadata', array( __CLASS__, 'check_for_widget_visibility' ), 10, 5 );
		add_action( 'wp_dashboard_setup', array( __CLASS__, 'add_dashboard_widgets' ) );
	}

	static function check_for_widget_visibility( $check, $object_id, $meta_key, $meta_value, $prev_value ) {
		if ( $meta_key === 'metaboxhidden_dashboard' ) {
			$prev_value = get_user_meta( $object_id, $meta_key, true );
			$is_hidden = is_array( $meta_value ) && in_array( self::DASHBOARD_WIDGET_ID, $meta_value );
			$was_hidden = is_array( $prev_value ) && in_array( self::DASHBOARD_WIDGET_ID, $prev_value );
			if ( ! $was_hidden && $is_hidden ) {
				do_action('jpo_closed');
			} elseif ( $was_hidden && !$is_hidden ) {
				do_action('jpo_opened');
			}
		}

		return $check;
	}

	static function add_dashboard_widgets() {
		self::reset_data_if_necessary();

		wp_add_dashboard_widget( self::DASHBOARD_WIDGET_ID, 'Jetpack Onboarding Wizard', array( __CLASS__, 'render_widget' ) ); //, $control_callback = null

		// Add to Screen menu
		global $wp_meta_boxes;

		$dashboard = $wp_meta_boxes['dashboard']['normal']['core'];
		$ours      = array( self::DASHBOARD_WIDGET_ID => $dashboard[self::DASHBOARD_WIDGET_ID] );

		$wp_meta_boxes['dashboard']['normal']['core'] = array_merge( $ours, $dashboard );

		// Add assets
		global $wp_scripts;

		// vars to inject into javascript
		$jpo_vars = Jetpack_Onboarding_EndPoints::js_vars();

		//Shared libs, e.g. React, ReactDOM
		wp_register_script( 'jetpack-onboarding-vendor', plugins_url( 'dist/vendor.bundle.js', __FILE__ ), array());
		wp_enqueue_script( 'jetpack-onboarding-vendor' );

		//IE-only shims
		wp_register_script( 'ie-shims', plugins_url( 'dist/ie-shims.js', __FILE__ ), array( 'jetpack-onboarding-vendor' ));
		$wp_scripts->add_data( 'ie-shims', 'conditional', 'lt IE 9' );

		//Core JS app
		wp_register_script( 'jetpack-onboarding', plugins_url( 'dist/jetpack-onboarding.js', __FILE__ ), array( 'jquery', 'underscore', 'wp-pointer', 'ie-shims', 'jetpack-onboarding-vendor' ) );
		wp_localize_script( 'jetpack-onboarding', 'JPS', $jpo_vars );
		wp_enqueue_script( 'jetpack-onboarding' );

		// CSS
		wp_enqueue_style( 'jetpack-onboarding-components', plugins_url( 'dist/jetpack-onboarding.css', __FILE__ ), array( 'wp-admin' ) );
		wp_enqueue_style( 'jetpack-onboarding-panel', plugins_url( 'css/welcome-panel.css', __FILE__ ), array( 'wp-admin', 'wp-pointer' ) );
		wp_enqueue_style( 'ie8' );
		
	}

	static function reset_data_if_necessary() {
		//reset data
		if ( isset( $_GET['jpo_reset'] ) ) {
			delete_option( Jetpack_Onboarding_EndPoints::STEP_STATUS_KEY );
			delete_option( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY );
			delete_option( Jetpack_Onboarding_EndPoints::STARTED_KEY );
			Jetpack_Onboarding_EndPoints::show_dashboard_widget();
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
	}

	static function render_widget() {
		if ( false === get_option( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY, false ) ) {
			update_option( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY, true );
			do_action( Jetpack_Onboarding_EndPoints::FIRSTRUN_KEY );
		}

		echo "<div id='jpo-welcome-panel'><span class='screen-reader-text'>Loading Welcome Wizard</span></div>";
	}
}
