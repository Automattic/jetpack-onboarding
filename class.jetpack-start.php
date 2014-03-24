<?php

class Jetpack_Start {
	
	static $site_types;
	
	static function init() {
		if ( is_admin() ) {
			if ( ! ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
				add_action( 'admin_init', array( __CLASS__, 'admin_init' ), 100 );
			}
			add_action( 'wp_ajax_jetpackstart_set_theme', array( __CLASS__, 'set_theme' ) );
		} else {
			add_action( 'init', array( __CLASS__, 'init_menu' ) );
		}
	}

	static function admin_init() {
		if ( get_option( '_jetpackstart' ) ) {
			if ( isset( $_GET['page'] ) && ( $_GET['page'] == 'sharing' ||  $_GET['page'] == 'jetpack' ) ) {
				if ( isset( $_GET['action'] ) && $_GET['action'] == 'completed' || Jetpack::state( 'message' ) == 'authorized' || Jetpack::state( 'message' ) == 'already_authorized' ) {
					wp_safe_redirect( admin_url( '#setup/step/4' ) );
				}
			} else {
				add_action( 'wp_ajax_jetpackstart_set_theme', array( __CLASS__, 'set_theme' ) );
				if ( ! get_option( '_jetpackstart_step' ) ) {
					self::redirect_to_step( 1 );
				}
				wp_enqueue_script( 'underscore');
				wp_enqueue_script( 'jetpack-start', plugins_url( '/js/jetpack-start.js' , __FILE__ ), array('jquery', 'backbone', 'underscore') );
				wp_localize_script( 'jetpack-start', '_JetpackStartSiteTypes', self::get_site_types() );
				wp_localize_script( 'jetpack-start', '_JetpackStartDefaultSiteType', 'business-website' );
				wp_localize_script( 'jetpack-start', '_JetpackStartDefaultTheme', get_option( '_jetpackstart_theme' ) );
				wp_localize_script( 'jetpack-start', '_JetpackStartConnecting', esc_js( __( 'Connecting...' ) ) );
				wp_localize_script( 'jetpack-start', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
				require_once dirname( __FILE__ ) . '/index.php';
				die();
			}
		}
	}

	static function get_site_types() {
		if ( is_null( self::$site_types ) ) {
			self::$site_types = array(
				'business-website' => array(
					'title'        => __( 'Business Website' ),
					'icon_class'   => 'fa-building-o',
					'themes'       => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' )
				),
				'business-blog' => array(
					'title'        => __( 'Business Blog' ),
					'icon_class'   => 'fa-briefcase',
					'themes'       => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' )
				),
				'personal-blog' => array(
					'title'        => __( 'Personal Blog' ),
					'icon_class'   => 'fa-edit',
					'themes'       => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' )
				),
				'photo-blog' => array(
					'title'        => __( 'Photo Blog' ),
					'icon_class'   => 'fa-camera',
					'themes'       => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' )
				),
				'about-me-page' => array(
					'title'        => __( 'About Me Page' ),
					'icon_class'   => 'fa-user',
					'themes'       => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' )
				),
				'family-blog' => array(
					'title'        => __( 'Family Blog' ),
					'icon_class'   => 'fa-group',
					'themes'       => array( 'twentyfourteen' , 'twentythirteen' , 'twentytwelve' , 'twentyeleven' )
				),
			);

			foreach ( self::$site_types as $key => $sitetype_details  ) {
				self::$site_types[$key]['themes'] = self::prepare_themes( $sitetype_details['themes'] );
			}
		}
		return self::$site_types;
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
		);
	}

	static function show_jps_menu() {
		require_once dirname( __FILE__ ) . '/jps_menu.php';
	}

	static function set_step( $step ) {
		update_option( '_jetpackstart_step', (int) $step );
	}

	static function set_theme() {
		$stylesheet = sanitize_text_field( $_POST['stylesheet'] );
		update_option( '_jetpackstart_theme', $stylesheet );
		switch_theme( $stylesheet );
	}

	static function redirect_to_step( $step ) {
		self::set_step( $step );
                wp_safe_redirect( admin_url( "#setup/step/" . (int) $step ) );
        }

	static function init_menu() {
		wp_enqueue_script( 'jetpack-start', plugins_url( '/js/jetpack-start-menu.js' , __FILE__ ), array( 'jquery' ) );
		ob_start();
		?>
		<div class="jps-admin-menu">
			<ul>
				<li><span class="right"><a href="<?php echo admin_url( 'post-new.php' ); ?>" class="add-new fa fa-plus"></a></span><a href="<?php echo admin_url( 'edit.php' ) ?>"><?php _e( 'Posts' ); ?></a></li>
				<li><span class="right"><a href="<?php echo admin_url( 'post-new.php?post_type=page' ); ?>" class="add-new fa fa-plus"></a></span><a href="<?php echo admin_url( 'edit.php?post_type=page' ) ?>"><?php _e( 'Pages' ); ?></a></li>
				<li><a href="<?php echo admin_url( 'customize.php' ); ?>"><?php _e( 'Customize Theme' ); ?></a></li>
				<li><a href="<?php echo admin_url( 'themes.php' ); ?>"><?php _e( 'Change Theme' ); ?></a></li>
				<li><a href="<?php echo admin_url(); ?>"><?php _e( 'View Dashboard' ); ?></a></li>
			</ul>
		</div>
		<?php
		$jetpackstart_menu = ob_get_contents();
		ob_end_clean();
		wp_localize_script( 'jetpack-start', '_JetpackStartMenu', $jetpackstart_menu );
		wp_register_style( 'jetpack-start', plugins_url( 'css/jetpack-start-menu.css', __FILE__ ) );
		wp_register_style( 'jps-font-awesome', plugins_url( 'css/font-awesome.css', __FILE__ ) );
		wp_enqueue_style( 'jetpack-start' );
		wp_enqueue_style( 'jps-font-awesome' );
	}
}
