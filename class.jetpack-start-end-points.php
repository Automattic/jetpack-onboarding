<?php
namespace JetpackStart;
class EndPoints { 
	const AJAX_NONCE = 'jps-ajax';

	static $default_themes = array( 'writr', 'flounder', 'sorbet', 'motif', 'hexa', 'twentyfourteen', 'twentytwelve', 'responsive', 'bushwick', 'singl', 'tonal', 'fontfolio', 'hemingway-rewritten', 'skylark' , 'twentythirteen' , 'twentyeleven' );
	static $themes;

	static function init() {
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			self::init_ajax();
		}
	}

	static function init_ajax() {
		if ( is_admin() ) {
			add_action( 'wp_ajax_jps_set_title', array( __CLASS__, 'set_title' ) );
			add_action( 'wp_ajax_jps_change_theme', array( __CLASS__, 'change_theme' ) );
		}
	}

	// this is quite coupled right now to the implementation - it would be nice to componentise it, but I'm not sure how
	// so in the meantime I'm trying to make it map closest to the conceptual model of WordPress itself, rather than the
	// currently-implemented React components
	static function js_vars() {
		return array(
			'nonce' => wp_create_nonce( \JetpackStart\EndPoints::AJAX_NONCE ),
			'bloginfo' => array('name' => get_bloginfo('name')),
			'themes' => wp_prepare_themes_for_js(),//\JetpackStart\EndPoints::get_themes(),
			'steps' => array(
				'set_title' => array('url_action' => 'jps_set_title'),
				'advanced_settings' => array(
					'jetpack_modules_url' => admin_url( 'admin.php?page=jetpack_modules' ),
					'widgets_url' => admin_url( 'widgets.php' ),
					'customize_url' => wp_customize_url()
				)
			)
		);
	}

	// static function get_themes() {
	// 	if ( is_null( self::$themes ) ) {
	// 		self::$themes = apply_filters(
	// 			'jetpack_start_themes',
	// 			self::$default_themes
	// 		);

	// 		self::$themes = self::prepare_themes( self::$themes );
	// 	}
	// 	return self::$themes;
	// }

	// static function prepare_themes( $themes ) {
	// 	$result = array();
	// 	foreach ( $themes as $_theme ) {
	// 		$theme = wp_get_theme( $_theme );
	// 		if ( $theme->exists() ) {
	// 			$result[] = self::prepare_theme( $theme );
	// 		}
	// 	}
	// 	return $result;
	// }

	// static function prepare_theme( $theme ) {
	// 	return array(
	// 		'name' => $theme->Name,
	// 		'stylesheet'  => $theme->get_stylesheet(),
	// 		'screenshot' => $theme->get_screenshot(),
	// 		'demo_url' => 'http://' .  str_replace( '-', '', $theme->get_stylesheet() ) . 'demo.wordpress.com?demo',
	// 	);
	// }

	static function set_title() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		$title = esc_html( $_REQUEST['title'] );
		if ( update_option( 'blogname', $title ) ) {
			wp_send_json_success( $title );
		} else {
			wp_send_json_error();
		}
	}
}