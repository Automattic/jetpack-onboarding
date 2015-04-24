<?php

class Jetpack_Start_Welcome_Panel {

	const CHANGE_TITLE_KEY = 'change-title';

	static $default_themes = array( 'writr', 'flounder', 'sorbet', 'motif', 'hexa', 'twentyfourteen', 'twentytwelve', 'responsive', 'bushwick', 'singl', 'tonal', 'fontfolio', 'hemingway-rewritten', 'skylark' , 'twentythirteen' , 'twentyeleven' );

	static $themes;

	static function init() {
		if ( current_user_can( 'manage_options' ) ) {

			if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
				self::init_ajax();
			}

			if ( isset( $_GET['jps_wp_action'] ) ) {
				do_action( 'jetpack_start_welcome_panel_action', sanitize_text_field( $_GET['jps_wp_action'] ) );
				wp_safe_redirect( remove_query_arg( 'jps_wp_action' ) );
			}

			add_action( 'load-index.php', array( __CLASS__, 'init_welcome_panel' ) );
		}
	}

	static function init_welcome_panel() {
		$screen = get_current_screen();
		if( $screen->base == 'dashboard' ) {
			remove_action( 'welcome_panel', 'wp_welcome_panel' );
			add_action( 'welcome_panel', array( __CLASS__, 'wp_welcome_panel' ) );
			wp_register_script( 'jetpack-start', plugins_url( 'js/welcome-panel.js', __FILE__ ), array( 'jquery' ) );

			$jps_vars = array(
				'nonce' => array(
					'jps_change_title' => wp_create_nonce( self::CHANGE_TITLE_KEY )
				),
				'themes' => self::get_themes()
			);
			wp_localize_script( 'jetpack-start', 'JPS', $jps_vars );
			wp_register_style( 'jps-font-awesome', plugins_url( 'css/font-awesome.css', __FILE__ ) );
			wp_enqueue_script( 'jetpack-start' );
			wp_enqueue_style( 'jetpack-start', plugins_url( 'css/welcome-panel.css', __FILE__ ), array( 'wp-admin' ) );
			wp_enqueue_style( 'jps-font-awesome' );
		}
	}

	static function add_action_arg( $url, $action ) {
		return add_query_arg( 'jps_wp_action', $action, $url );
	}

	static function wp_welcome_panel() {
		require_once ( JETPACK_START_BASE_DIR . '/views/welcome-panel.php' );
	}

	static function init_ajax() {
		if ( current_user_can( 'switch_themes' ) ) {
			add_action( 'wp_ajax_jps_change_title', array( __CLASS__, 'change_title' ) );
		}
	}

	static function get_themes() {
		if ( is_null( self::$themes ) ) {
			self::$themes = apply_filters(
				'jetpack_start_themes',
				self::$default_themes
			);

			self::$themes = self::prepare_themes( self::$themes );
		}
		return self::$themes;
	}

	static function prepare_themes( $themes ) {
		$result = array();
		foreach ( $themes as $_theme ) {
			$theme = wp_get_theme( $_theme );
			if ( $theme->exists() ) {
				$result[] = self::prepare_theme( $theme );
			}
		}
		return $result;
	}

	static function prepare_theme( $theme ) {
		return array(
			'stylesheet'  => $theme->get_stylesheet(),
			'img_preview' => $theme->get_screenshot(),
			'demo_url' => 'http://' .  str_replace( '-', '', $theme->get_stylesheet() ) . 'demo.wordpress.com?demo',
		);
	}

	static function change_title() {
		check_ajax_referer( self::CHANGE_TITLE_KEY, 'nonce' );
		$title = esc_html( $_REQUEST['title'] );
		if ( update_option( 'blogname', $title ) ) {
			wp_send_json_success( $title );
		} else {
			wp_send_json_error();
		}
	}

}
