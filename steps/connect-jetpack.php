<?php
/**
 * Label: Connect Jetpack
 * Sort Order: 0
 * Plugin Dependencies: jetpack/jetpack.php
 */

// Get out of the middle of the Jetpack - Wordpress.com handshake.
if (  isset( $_GET['page'] ) && $_GET['page'] == 'jetpack' && isset( $_GET['action'] ) && ( $_GET['action'] == 'register' || $_GET['action'] == 'authorize' ) ) {
	add_filter( 'jetpack_start_render_wizard', '__return_false' );
}

class Jetpack_Start_Step_connect_jetpack extends Jetpack_Start_Step {

	var $jetpack;

	function __construct() {
		if ( class_exists( 'Jetpack' ) && ! Jetpack::is_active() ) {
			add_action( 'jetpack-start_step-connect-jetpack', array( $this, 'render' ) );
		}
	}

	function get_jetpack() {
		if ( ! isset( $this->jetpack ) ) {
			$this->jetpack = Jetpack::init();
		}
		return $this->jetpack;
	}
}
