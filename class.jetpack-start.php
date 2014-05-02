<?php
error_reporting(-1);
class Jetpack_Start {

	const HIDE_MENU_INTRO_KEY = 'hide-menu-intro';

	static $site_types;

	static function init() {
		if ( ! ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
			add_action( 'admin_init', array( __CLASS__, 'admin_init' ), 100 );
		}
		self::admin_init_ajax();
	}

	static function admin_init() {
		// Add our default steps:
		add_action( 'jetpack-start_step-site_type',      array( __CLASS__, 'step_site_type' ) );
		add_action( 'jetpack-start_step-select_theme',   array( __CLASS__, 'step_select_theme' ) );
		add_action( 'jetpack-start_step-connect_social', array( __CLASS__, 'step_connect_social' ) );

		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			if ( isset( $_GET['page'] ) && $_GET['page'] == 'sharing' ) {
				if ( isset( $_GET['action'] ) && $_GET['action'] == 'completed' ) {
					do_action( 'jetpack_start_connect_service', ( isset( $_GET['service'] ) ) ? sanitize_text_field( $_GET['service'] ) : 'service_not_set' );
					self::redirect_to_step( 3 );
				}
			} else {
				add_action( 'wp_ajax_jetpackstart_set_theme', array( __CLASS__, 'set_theme' ) );
				wp_enqueue_script( 'underscore');
				wp_enqueue_script( 'jetpack-start', plugins_url( 'js/jetpack-start.js', __FILE__ ), array( 'jquery', 'backbone', 'underscore' ) );
				$jetpack_start_global_variables['site_types'] = self::get_site_types();
				$jetpack_start_global_variables['connecting_message'] = esc_js( __( 'Connecting...', 'jetpack-start' ) );
				$jetpack_start_global_variables['ajaxurl'] = admin_url( 'admin-ajax.php' );
				$jetpack_start_global_variables['steps'] = self::get_steps();
				wp_localize_script( 'jetpack-start', '_JetpackStart', $jetpack_start_global_variables );
				wp_dequeue_script( 'devicepx' );
				self::get_view( 'index' );
				die();
			}
		}
	}

	static function admin_init_ajax() {
		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			add_action( 'wp_ajax_jetpackstart_set_theme', array( __CLASS__, 'set_theme' ) );
			add_action( 'wp_ajax_jetpackstart_set_site_type', array( __CLASS__, 'set_site_type' ) );
		}
	}

	static function init_menu() {
		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			if ( isset( $_GET['jps_menu_action'] ) ) {
				do_action( 'jetpack_start_menu_action', sanitize_text_field( $_GET['jps_menu_action'] ) );
				wp_safe_redirect( remove_query_arg( 'jps_menu_action' ) );
			} else {
				wp_register_script( 'jquery-cookie', '/wp-content/mu-plugins/jetpack-start/js/jquery.cookie.js', array( 'jquery' ) );
				wp_enqueue_script( 'jetpack-start', '/wp-content/mu-plugins/jetpack-start/js/jetpack-start-menu.js', array( 'jquery', 'jquery-cookie', ) );
				ob_start();
				?>
				<div class="jps-admin-menu">
					<?php if ( ! get_user_option( 'jpstart_menu_hide_intro' ) ) : ?>
						<script>
							jQuery( document ).ready( function( $ ) {
								var intro = $( '.jps-admin-menu-intro' );
								intro.on( 'click', '.hide-intro', function () {
									intro.slideUp();
									$.post( _JetpackStartMenu.ajaxurl,
										{
											action: 'jetpackstart_menu_hide_intro',
											nonce: '<?php echo wp_create_nonce( self::HIDE_MENU_INTRO_KEY ) ?>'
										}
									);
									return false;
								});
							});
						</script>
						<div class="jps-admin-menu-intro">
							<span class="right"><a href="#" class="hide-intro" title="<?php _e( 'Hide this top intro text.', 'jetpack-start' ); ?>" data-action="hide-intro">&times;</a></span>
							<p><strong><?php _e( 'Congrats!' ); ?></strong><?php _e( 'Welcome to your website! Use the links below to manage your new site.', 'jetpack-start' ); ?></p>
							<p><?php _e( 'Toggle this menu on/off by clicking the menu icon above (3 horizontal lines).', 'jetpack-start' ); ?></p>
						</div>
					<?php endif ?>
					<ul>
						<li>
							<span class="right"><a href="<?php echo admin_url( 'post-new.php?jps_menu_action=post-new' ); ?>" class="add-new fa fa-plus" data-action="post-new"></a></span>
							<a href="<?php echo admin_url( 'edit.php?jps_menu_action=posts' ) ?>" data-action="posts"><?php _e( 'Posts', 'jetpack-start' ); ?></a>
						</li>
						<li>
							<span class="right"><a href="<?php echo admin_url( 'post-new.php?post_type=page&jps_menu_action=page-new' ); ?>" class="add-new fa fa-plus" data-action="page-new"></a></span>
							<a href="<?php echo admin_url( 'edit.php?post_type=page' ) ?>" data-action="pages"><?php _e( 'Pages', 'jetpack-start' ); ?></a>
						</li>
						<li><a href="<?php echo admin_url( 'customize.php?jps_menu_action=customize' ); ?>" data-action="customize"><?php _e( 'Customize Theme', 'jetpack-start' ); ?></a></li>
						<li><a href="<?php echo admin_url( 'themes.php?jps_menu_action=themes' ); ?>" data-action="themes"><?php _e( 'Change Theme', 'jetpack-start' ); ?></a></li>
						<li><a href="<?php echo admin_url('?jps_menu_action=dashboard' ); ?>" data-action="dashboard"><?php _e( 'View Dashboard', 'jetpack-start' ); ?></a></li>
					</ul>
				</div>
				<?php
				$jetpackstart_menu['html'] = ob_get_contents();
				$jetpackstart_menu['ajaxurl'] = admin_url( 'admin-ajax.php' );
				ob_end_clean();
				wp_localize_script( 'jetpack-start', '_JetpackStartMenu', $jetpackstart_menu );
				wp_register_style( 'jetpack-start', '/wp-content/mu-plugins/jetpack-start/css/jetpack-start-menu.css' );
				wp_register_style( 'jps-font-awesome', '/wp-content/mu-plugins/jetpack-start/css/font-awesome.css' );
				wp_enqueue_style( 'jetpack-start' );
				wp_enqueue_style( 'jps-font-awesome' );
			}
		}
	}

	static function init_menu_ajax() {
		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			add_action( 'wp_ajax_jetpackstart_menu_hide_intro', array( __CLASS__, 'menu_hide_intro' ) );
			add_action( 'wp_ajax_jetpackstart_menu_status', array( __CLASS__, 'menu_status' ) );
		}
	}

	static function get_steps() {
		$steps = array(
			'site_type'      => __( 'What type of site are you building?', 'jetpack-start' ),
			'select_theme'   => __( 'Select a theme:', 'jetpack-start' ),
			'connect_social' => __( 'Every site needs an audience!', 'jetpack-start' ),
		);
		return apply_filters( 'jetpack_start_steps', $steps );
	}

	static function step_site_type() {
		self::get_view( 'step_site_type' );
	}

	static function step_select_theme() {
		self::get_view( 'step_select_theme' );
	}

	static function step_connect_social() {
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

		$connected = false;
		foreach( $services as $key => $service ) {
			$services[ $key ]['connected'] = self::is_connected( $service['name'] );
			$services[ $key ]['connect_url'] = $publicize->connect_url( $service['name'] );
			$connected = $services[ $key ]['connected'] || $connected;
		}

		self::get_view( 'step_connect_social' );
	}

	function is_connected( $service ) {
		global $publicize;
		if ( ! is_object( $publicize ) ) {
			return false;
		}
		$connections = $publicize->get_connections( $service );
		return ! empty( $connections );
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
				self::$site_types[ $key ]['themes'] = self::prepare_themes( $sitetype_details['themes'] );
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
			'demo_url' => 'http://' . $string = 'demo.wordpress.com?demo',
		);
	}

	static function set_theme() {
		$stylesheet = sanitize_text_field( $_POST['stylesheet'] );
		do_action( 'jetpack_start_set_theme', $stylesheet );
		switch_theme( $stylesheet );
		wp_send_json_success();
	}

	static function set_site_type() {
		$site_type = sanitize_text_field( $_POST['site_type'] );
		do_action( 'jetpack_start_set_site_type', $site_type );
		wp_send_json_success();
	}

	static function redirect_to_step( $step ) {
		wp_safe_redirect( admin_url( "#setup/step/" . (int) $step ) );
	}

	static function menu_hide_intro() {
		check_ajax_referer( self::HIDE_MENU_INTRO_KEY, 'nonce' );
		$result = update_user_option( get_current_user_id(), 'jpstart_menu_hide_intro', true );
		wp_send_json_success( $result );
	}

	static function menu_status() {
		$menu_status = sanitize_text_field( $_POST['menu_status'] );
		$result = update_user_option( get_current_user_id(), 'jpstart_menu_status', $menu_status );
		do_action( 'jetpack_start_menu_status_change', $menu_status );
		wp_send_json_success( $result );
	}

	/**
 	 * Includes the views template file. This helps keep the class code clean 
	 * by seperating the logic from the view
	 *
	 * Template files are located in the views folder.   
	 *
	 * @param string $file - The file name (minus extension)
	 */
	private static function get_view( $file ) {
		$file = __DIR__ . '/views/' . $file . '.php';
		if( file_exists( $file ) ) {
			require_once( $file );
		}
	}

}
