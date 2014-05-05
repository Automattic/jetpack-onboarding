<?php
/**
 * Label: What type of site are you building?
 * Sort Order: 2
 */
if ( isset( $_GET['page'] ) && $_GET['page'] == 'sharing' ) {
	add_filter( 'jetpack_start_render_wizard', '__return_false' );
	if ( isset( $_GET['action'] ) && $_GET['action'] == 'completed' ) {
		do_action( 'jetpack_start_connect_service', ( isset( $_GET['service'] ) ) ? sanitize_text_field( $_GET['service'] ) : 'service_not_set' );
		Jetpack_Start::redirect_to_step( 'connect_social' );
	}
}

class Jetpack_Start_Step_Connect_Social extends Jetpack_Start_Step {

	static $step_slug = 'connect_social';

	static function init() {
		add_action( 'jetpack-start_step-connect_social', array( __CLASS__, 'render' ) );
		add_filter( 'jetpack_start_js_globals', array( __CLASS__, 'jetpack_start_js_globals' ) );
	}

	static function jetpack_start_js_globals( $jetpack_start_global_variables ) {
		$jetpack_start_global_variables['connecting_message'] = esc_js( __( 'Connecting...', 'jetpack-start' ) );
		return $jetpack_start_global_variables;
	}

	static function render() {
		parent::render_step( self::$step_slug );
	}

	static function get_social_services() {
		global $publicize;

		if ( ! is_object( $publicize ) ) {
			echo '<p>' . esc_html__( 'Error: No publicize detected.', 'jetpack-start' ) . '</p>';
			return;
		}

		$services = array(
			array(
				'name' => 'facebook',
				'title' => __( 'Facebook', 'jetpack-start' ),
				'short' => 'fb',
			),
			array(
				'name' => 'twitter',
				'title' => __( 'Twitter', 'jetpack-start' ),
				'short' => 'tw',
			),
		);

		foreach( $services as $key => $service ) {
			$services[ $key ]['connected'] = self::is_connected( $service['name'] );
			$services[ $key ]['connect_url'] = $publicize->connect_url( $service['name'] );
		}

		return $services;
	}

	static function is_connected( $service ) {
		global $publicize;
		if ( ! is_object( $publicize ) ) {
			return false;
		}
		$connections = $publicize->get_connections( $service );
		return ! empty( $connections );
	}

}

Jetpack_Start_Step_Connect_Social::init();
