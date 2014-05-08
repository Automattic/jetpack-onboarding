<?php
/**
 * Label: What type of site are you building?
 * Sort Order: 0
 */

class Jetpack_Start_Step_site_type extends Jetpack_Start_Step {

	var $site_types;

	function __construct() {
		add_action( 'jetpack-start_step-site_type', array( $this, 'render' ) );
		add_action( 'wp_ajax_jetpackstart_set_site_type', array( $this, 'set_site_type' ) );
		add_filter( 'jetpack_start_js_globals', array( $this, 'jetpack_start_js_globals' ) );
	}

	function jetpack_start_js_globals( $jetpack_start_global_variables ) {
		$jetpack_start_global_variables['site_types'] = $this->get_site_types();
		return $jetpack_start_global_variables;
	}

	function get_site_types() {
		if ( is_null( $this->site_types ) ) {
			$this->site_types = apply_filters( 'jetpack_start_site_types', array(
				array(
					'name'       => 'business-website',
					'title'      => __( 'Business Website', 'jetpack-start' ),
					'icon_class' => 'fa-building-o',
					'themes'     => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' ),
				),
				array(
					'name'       => 'business-blog',
					'title'      => __( 'Business Blog', 'jetpack-start' ),
					'icon_class' => 'fa-briefcase',
					'themes'     => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' ),
				),
				array(
					'name'       => 'personal-blog',
					'title'      => __( 'Personal Blog', 'jetpack-start' ),
					'icon_class' => 'fa-edit',
					'themes'     => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' ),
				),
				array(
					'name'       => 'photo-blog',
					'title'      => __( 'Photo Blog', 'jetpack-start' ),
					'icon_class' => 'fa-camera',
					'themes'     => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' ),
				),
				array(
					'name'       => 'about-me-page',
					'title'      => __( 'About Me Page', 'jetpack-start' ),
					'icon_class' => 'fa-user',
					'themes'     => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' ),
				),
				array(
					'name'       => 'family-blog',
					'title'      => __( 'Family Blog', 'jetpack-start' ),
					'icon_class' => 'fa-group',
					'themes'     => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' ),
				),
			) );

			foreach ( $this->site_types as $key => $sitetype_details ) {
				$this->site_types[ $key ]['themes'] = Jetpack_Start_Step_Select_Theme::prepare_themes( $sitetype_details['themes'] );
			}

		}
		return $this->site_types;
	}

	function set_site_type() {
		$site_type = sanitize_text_field( $_POST['site_type'] );
		do_action( 'jetpack_start_set_site_type', $site_type );
		wp_send_json_success();
	}

}