<?php
/**
 * Label: What type of site are you building?
 * Sort Order: 1
 */

class Jetpack_Start_Step_Select_Theme extends Jetpack_Start_Step {

	var $default_themes = array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' );
	var $themes;

	function __construct() {
		add_action( 'jetpack-start_step-select_theme', array( $this, 'render' ) );
		add_action( 'wp_ajax_jetpackstart_set_theme', array( $this, 'set_theme' ) );
		add_filter( 'jetpack_start_js_globals', array( $this, 'jetpack_start_js_globals' ) );
	}

	function jetpack_start_js_globals( $jetpack_start_global_variables ) {
		$jetpack_start_global_variables['themes'] = $this->get_themes();
		return $jetpack_start_global_variables;
	}

	static function prepare_themes( $themes ) {
		$result = array();
		foreach ( $themes as $theme ) {
			$result[] = self::prepare_theme( wp_get_theme( $theme ) );
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

	static function set_theme() {
		$stylesheet = sanitize_text_field( $_POST['stylesheet'] );
		do_action( 'jetpack_start_set_theme', $stylesheet );
		switch_theme( $stylesheet );
		wp_send_json_success();
	}

	function get_themes() {
		if ( is_null( $this->themes ) ) {
			$this->themes = apply_filters(
				'jetpack_start_themes',
				$this->default_themes
			);

			$this->themes = Jetpack_Start_Step_Select_Theme::prepare_themes( $this->themes );
		}
		return $this->themes;
	}
}
