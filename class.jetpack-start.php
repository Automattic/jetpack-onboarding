<?php

class Jetpack_Start {

	static function init() {
		if ( ! get_option( 'jetpack-start' ) ) {
			function makeplugins_add_json_endpoint() {
				
			}
			add_action( 'init', array( __CLASS__, 'add_endpoint') );
			add_action( 'template_redirect', array( __CLASS__, 'setup_template_redirect' ) );
		}
	}

	static function add_endpoint() {
		add_rewrite_endpoint( 'wp-admin/setup', EP_ROOT );
		flush_rewrite_rules( FALSE );
	}

	static function setup_template_redirect() {
		global $wp_query;
		if ( ! isset( $wp_query->query_vars['wp-admin/setup'] ) ) {
			return;
		}
		
		$step = $wp_query->query_vars['wp-admin/setup'];
		
		include dirname( __FILE__ ) . '/setup-template.php';
		exit;
	}

}
