<?php
/**
 * Label: What type of site are you building?
 * Sort Order: 1
 */

class Jetpack_Start_Step_Select_Theme extends Jetpack_Start_Step {

	function __construct() {
		add_action( 'jetpack-start_step-select_theme', array( $this, 'render' ) );
		add_action( 'wp_ajax_jetpackstart_set_theme', array( $this, 'set_theme' ) );
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

}
