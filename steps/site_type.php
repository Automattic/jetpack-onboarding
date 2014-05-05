<?php
/**
 * Label: What type of site are you building?
 * Sort Order: 0
 */

class Jetpack_Start_Step_Site_Type extends Jetpack_Start_Step {

	static $step_slug = 'site_type';

	static $site_types;

	static function init() {
		add_action( 'jetpack-start_step-site_type', array( __CLASS__, 'render' ) );
		add_action( 'wp_ajax_jetpackstart_set_site_type', array( __CLASS__, 'set_site_type' ) );
		add_filter( 'jetpack_start_js_globals', array( __CLASS__, 'jetpack_start_js_globals' ) );
	}

	static function jetpack_start_js_globals( $jetpack_start_global_variables ) {
		$jetpack_start_global_variables['site_types'] = self::get_site_types();
		return $jetpack_start_global_variables;
	}

	static function render() {
		parent::render_step( self::$step_slug );
	}

	static function get_site_types() {
		if ( is_null( self::$site_types ) ) {
			self::$site_types = apply_filters( 'jetpack_start_site_types', array(
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

			foreach ( self::$site_types as $key => $sitetype_details ) {
				self::$site_types[ $key ]['themes'] = Jetpack_Start_Step_Select_Theme::prepare_themes( $sitetype_details['themes'] );
			}

		}
		return self::$site_types;
	}

	static function set_site_type() {
		$site_type = sanitize_text_field( $_POST['site_type'] );
		do_action( 'jetpack_start_set_site_type', $site_type );
		wp_send_json_success();
	}

}

Jetpack_Start_Step_Site_Type::init();