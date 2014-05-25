<?php
/**
 * Label: Every site needs an audience!
 * Sort Order: 2
 */

if ( isset( $_GET['page'] ) && $_GET['page'] == 'sharing' ) {
	add_filter( 'jetpack_start_render_wizard', '__return_false' );
	if ( isset( $_GET['action'] ) && $_GET['action'] == 'completed' ) {
		do_action( 'jetpack_start_connect_service', ( isset( $_GET['service'] ) ) ? sanitize_text_field( $_GET['service'] ) : 'service_not_set' );
		Jetpack_Start::redirect_to_step( 'connect-social' );
	}
}

class Jetpack_Start_Step_connect_social extends Jetpack_Start_Step {

	function __construct() {
		add_action( 'jetpack-start_step-connect-social', array( $this, 'render' ) );
		add_filter( 'jetpack_start_js_globals', array( $this, 'jetpack_start_js_globals' ) );
	}

	static function jetpack_start_js_globals( $jetpack_start_global_variables ) {
		$jetpack_start_global_variables['connecting_message'] = esc_js( __( 'Connecting...', 'jetpack-start' ) );
		return $jetpack_start_global_variables;
	}

	static function get_social_services() {
		global $publicize;

		if ( ! is_object( $publicize ) ) {
			echo '<p>' . esc_html__( 'Error: No publicize detected.', 'jetpack-start' ) . '</p>';
			return array();
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
