<?php
class Jetpack_Start_EndPoints { 
	const AJAX_NONCE = 'jps-ajax';
	const STEP_STATUS_KEY = 'jps_step_statuses';
	const STARTED_KEY = 'jps_started';
	const MAX_THEMES = 6;

	static $default_themes = array( 'writr', 'flounder', 'sorbet', 'motif', 'hexa', 'twentyfourteen', 'twentytwelve', 'responsive', 'bushwick', 'singl', 'tonal', 'fontfolio', 'hemingway-rewritten', 'skylark' , 'twentythirteen' , 'twentyeleven' );
	static $themes;

	static function init() {
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			self::init_ajax();
		}
	}

	static function init_ajax() {
		if ( is_admin() ) {
			add_action( 'wp_ajax_jps_set_title', array( __CLASS__, 'set_title' ) );
			add_action( 'wp_ajax_jps_set_layout', array( __CLASS__, 'set_layout' ) );
			add_action( 'wp_ajax_jps_set_theme', array( __CLASS__, 'set_theme' ) );
			add_action( 'wp_ajax_jps_configure_jetpack', array( __CLASS__, 'configure_jetpack' ) );
			add_action( 'wp_ajax_jps_activate_jetpack_modules', array( __CLASS__, 'activate_jetpack_modules' ) );
			add_action( 'wp_ajax_jps_deactivate_jetpack_modules', array( __CLASS__, 'deactivate_jetpack_modules' ) );
			add_action( 'wp_ajax_jps_list_jetpack_modules', array( __CLASS__, 'list_jetpack_modules' ) );
			add_action( 'wp_ajax_jps_step_skip', array( __CLASS__, 'step_skip' ) );
			add_action( 'wp_ajax_jps_step_complete', array( __CLASS__, 'step_complete' ) );
			add_action( 'wp_ajax_jps_started', array( __CLASS__, 'started' ) );
			add_action( 'wp_ajax_jps_reset_data', array( __CLASS__, 'reset_data' ) );
		}
	}

	static function js_vars() {
		$step_statuses = get_option( self::STEP_STATUS_KEY, array() );
		$started = get_option( self::STARTED_KEY, false);

		$jetpack_config = array();

		if ( class_exists('Jetpack') ) {
			$jetpack_config = array(
				'plugin_active' => true,
				'configured' => Jetpack::is_active(),
				'jumpstart_modules' => array_values(self::jumpstart_modules()),
				'additional_modules' => array(),
				'active_modules' => array_values(Jetpack::init()->get_active_modules())
			);
		} else {
			$jetpack_config = array(
				'plugin_active' => false,
				'configured' => false,
				'jumpstart_modules' => array(),
				'additional_modules' => array(),
				'active_modules' => array()
			);
		}

		if ( get_option( 'show_on_front' ) == 'page') {
			if ( get_option( 'page_for_posts' ) == 0 || get_option( 'page_for_posts' ) == null ) {
				$layout = 'website';
			} else {
				$layout = 'site-blog';
			}
		} else {
			$layout = 'blog';
		}

		$themes = 
			array_slice ( 
				array_values ( 
					array_filter ( 
						wp_prepare_themes_for_js(), array(__CLASS__, 'default_theme_filter') 
					) 
				), 
			0, self::MAX_THEMES);

		return array(
			'nonce' => wp_create_nonce( Jetpack_Start_EndPoints::AJAX_NONCE ),
			'debug' => WP_DEBUG ? true : false,
			'bloginfo' => array(
				'name' => wp_kses_decode_entities(stripslashes(get_bloginfo('name'))),
				'description' => wp_kses_decode_entities(stripslashes(get_bloginfo('description')))
			),
			'site_actions' => array(
				'set_title' => 'jps_set_title',
				'set_layout' => 'jps_set_layout',
				'set_theme' => 'jps_set_theme',
				'configure_jetpack' => 'jps_configure_jetpack',
				'activate_jetpack_modules' => 'jps_activate_jetpack_modules',
				'deactivate_jetpack_modules' => 'jps_deactivate_jetpack_modules',
				'list_jetpack_modules' => 'jps_list_jetpack_modules',
				'reset_data' => 'jps_reset_data'
			),
			'step_actions' => array(
				'start' => 'jps_started',
				'skip' => 'jps_step_skip',
				'complete' => 'jps_step_complete'
			),
			'jetpack' => $jetpack_config,
			'themes' => $themes,
			'started' => $started,
			'step_status' => $step_statuses,
			'steps' => array(
				'layout' => array(
					'current' => $layout
				),
				'advanced_settings' => array(
					'jetpack_modules_url' => admin_url( 'admin.php?page=jetpack_modules' ),
					'widgets_url' => admin_url( 'widgets.php' ),
					'themes_url' => admin_url( 'themes.php' ),
					'plugins_url' => admin_url( 'plugins.php' ),
					'customize_url' => wp_customize_url(),
					'new_blog_post_url' => admin_url( 'post-new.php' ),
					'manage_posts_url' => admin_url( 'edit.php' ),
					'new_page_url' => admin_url( 'post-new.php?post_type=page' ),
					'manage_pages_url' => admin_url( 'edit.php?post_type=page' )
				)
			)
		);
	}

	static function default_theme_filter($theme) {
		return ( in_array( $theme['id'], self::$default_themes ) || get_stylesheet() == $theme['id'] );
	}

	static function reset_data() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );

		delete_option( self::STEP_STATUS_KEY );
		delete_option( self::STARTED_KEY );

		wp_send_json_success( 'deleted' );
	}

	static function activate_jetpack_modules() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		
		// shamelessly copied from class.jetpack.php
		$modules = $_REQUEST['modules'];
		$modules = array_map( 'sanitize_key', $modules );
		// $modules_filtered = Jetpack::init()->filter_default_modules( $modules );

		foreach ( $modules as $module_slug ) {
			Jetpack::log( 'activate', $module_slug );
			Jetpack::activate_module( $module_slug, false, false );
			Jetpack::state( 'message', 'no_message' );
		}

		//XXX TODO: determine whether this is really useful
		// self::set_default_publicize_config();

		wp_send_json_success( $modules );
	}

	static function deactivate_jetpack_modules() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		
		// shamelessly copied from class.jetpack.php
		$modules = $_REQUEST['modules'];
		$modules = array_map( 'sanitize_key', $modules );
		// $modules_filtered = Jetpack::init()->filter_default_modules( $modules );

		foreach ( $modules as $module_slug ) {
			Jetpack::log( 'deactivate', $module_slug );
			Jetpack::deactivate_module( $module_slug );
			Jetpack::state( 'message', 'module_deactivated' );
		}

		wp_send_json_success( $modules );
	}

	static function list_jetpack_modules() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		$modules = Jetpack_Admin::init()->get_modules();

		$module_info = array();
		foreach ( $modules as $module => $value ) {
			$module_info[] = array(
				'slug'   => $value['module'],
				'name'   => $value['name'],
				'description'   => $value['jumpstart_desc'] ? $value['jumpstart_desc'] : $value['description'],
				'configure_url' => $value['configurable'] ? $value['configure_url'] : null,
			);
		}

		wp_send_json_success( array_values($module_info) );
	}

	static function jumpstart_modules() {
		$modules = Jetpack_Admin::init()->get_modules();

		$module_info = array();
		foreach ( $modules as $module => $value ) {
			if ( in_array( 'Jumpstart', $value['feature'] ) ) {
				$module_info[] = array(
					'slug'   => $value['module'],
					'name'   => $value['name'],
					'description'   => $value['jumpstart_desc'],
					'configure_url' => $value['configurable'] ? $value['configure_url'] : null,
				);
			}
		}
		return $module_info;
	}

	// shamelessly copied from class.jetpack.php
	static function set_default_publicize_config() {
		// Set the default sharing buttons and set to display on posts if none have been set.
		$sharing_services = get_option( 'sharing-services' );
		$sharing_options  = get_option( 'sharing-options' );
		if ( empty( $sharing_services['visible'] ) ) {
			// Default buttons to set
			$visible = array(
				'twitter',
				'facebook',
				'google-plus-1',
			);
			$hidden = array();

			// Set some sharing settings
			$sharing = new Sharing_Service();
			$sharing_options['global'] = array(
				'button_style'  => 'icon',
				'sharing_label' => $sharing->default_sharing_label,
				'open_links'    => 'same',
				'show'          => array( 'post' ),
				'custom'        => isset( $sharing_options['global']['custom'] ) ? $sharing_options['global']['custom'] : array()
			);

			update_option( 'sharing-options', $sharing_options );
			update_option( 'sharing-services', array( 'visible' => $visible, 'hidden' => $hidden ) );
		}
	}

	static function started() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		update_option( self::STARTED_KEY, true );
		do_action('jps_started');
		wp_send_json_success( 'true' );
	}

	static function step_skip() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		
		$result = self::update_step_status($_REQUEST['step'], 'skipped', true);

		do_action('jps_step_skipped', $_REQUEST['step']);

		wp_send_json_success( $result );
	}

	static function step_complete() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		
		self::update_step_status($_REQUEST['step'], 'completed', true);
		
		$result = self::update_step_status($_REQUEST['step'], 'skipped', false);

		do_action('jps_step_complete', $_REQUEST['step']);

		wp_send_json_success( $result );
	}

	static function update_step_status($step, $field, $value) {
		$step_statuses = get_option( self::STEP_STATUS_KEY, array() );
		if( ! array_key_exists( $step, $step_statuses ) ) {
			$step_statuses[$step] = array();	
		}
		$step_statuses[$step][$field] = $value;
		update_option( self::STEP_STATUS_KEY, $step_statuses );
		return $step_statuses;
	}

	static function set_title() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );

		$title = esc_html( $_REQUEST['title'] );
		$description = esc_html( $_REQUEST['description'] );
		
		$updated_title = get_option( 'blogname' ) === $title || update_option( 'blogname', $title );
		$updated_description = get_option( 'blogdescription' ) === $description || update_option( 'blogdescription', $description );
		
		if ( $updated_title && $updated_description ) {
			wp_send_json_success( $title );
		} else {
			wp_send_json_error();
		}
	}

	static function set_layout() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		$layout = esc_html( $_REQUEST['layout'] );

		if ( $layout == 'website' ) {
			self::set_layout_to_website();
		} elseif ( $layout == 'site-blog' ) {
			self::set_layout_to_site_with_blog();
		} elseif ( $layout == 'blog') {
			self::set_layout_to_blog();
		} else {
			wp_send_json_error('Unknown layout type: '.$layout);
		}
	}

	static function set_theme() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		$theme_id = $_REQUEST['themeId'];
		$theme = wp_get_theme( $theme_id );
		if ( ! $theme->exists() )
			wp_send_json_error('Theme does not exist: '.$theme_id);
		elseif ( ! $theme->is_allowed() ) {
			wp_send_json_error('Action not permitted for '.$theme_id);
		}

		switch_theme( $theme->get_stylesheet() );
		wp_send_json_success( $theme_id );
	}

	// try to activate the plugin if necessary and kick off the jetpack connection flow
	// in a single action (possibly in a dialog / iframe / something?)
	static function configure_jetpack() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		$return_to_step = $_REQUEST['return_to_step'];

		if ( ! is_plugin_active('jetpack') ) {
			activate_plugin('jetpack');
		}

		if ( ! class_exists('Jetpack') ) {
			wp_send_json_error('There was a problem activating Jetpack');
			die();
		}

		if ( ! Jetpack::is_active() ) {

			if ( ! Jetpack_Options::get_option( 'blog_token' ) || ! Jetpack_Options::get_option( 'id' ) ) {
				$result = Jetpack::try_registration();
				if ( is_wp_error( $result ) ) {
					$error = $result->get_error_code();
					$message = $result->get_error_message();
					wp_send_json_error($message.' (code: '.$error.')');
					die();
				}
			}

			$jp_landing_page = new Jetpack_Landing_Page();
			$jp_landing_page->add_actions();

			// redirect to activate link
			$connect_url = Jetpack::init()->build_connect_url( true, admin_url('index.php#welcome/steps/'.$return_to_step) );

			wp_send_json_success( array('next' => $connect_url) );
		} else {
			wp_send_json_success( 'already_active' );
		}

		
	}

	static function set_layout_to_website() {
		// no posts page for this layout
		update_option( 'page_for_posts', null );

		self::set_front_page_to_page();

		wp_send_json_success( 'website' );
		die();
	}

	static function set_layout_to_site_with_blog() {
		self::set_front_page_to_page();

		$blog_page = get_page_by_path('blog');

		if ( $blog_page != null ) {
			$page_id = $blog_page->ID;
		} else {
			// create page
			$page = array(
				'post_type' => 'page',
				'post_title' => 'Blog',
				'post_name' => 'blog',
				'post_content' => '', 
				'post_status' => 'publish',
				'comment_status' => 'open'
			);

			$page_id = wp_insert_post( $page );
		}

		if ( $page_id == 0 ) {
			wp_send_json_error();
			die();
		}

		update_option( 'page_for_posts', $page_id );
		wp_send_json_success( 'site-blog' );
	}

	static function set_layout_to_blog() {
		if ( get_option( 'show_on_front' ) == 'page' ) {
			update_option( 'show_on_front', 'posts' );
		}
		wp_send_json_success( 'blog' );
	}

	static function set_front_page_to_page()
	{
		// ensure that front page is a static page
		if ( get_option( 'show_on_front' ) == 'posts' ) {
			update_option( 'show_on_front', 'page' );
		}

		// if no specific front page already set, find first or create
		$existing_front_page = get_option( 'page_on_front' ) && 
								(get_option( 'page_on_front' ) != 0) && 
								get_page(get_option( 'page_on_front' ));

		if ( ! $existing_front_page ) {

			// set to earliest published page if possible
			$pages = get_pages( array('sort_column' => 'post_date', 'number' => 1, 'post_status' => 'publish') );
			$first_page_created = $pages[0];

			if ( $first_page_created != null ) {
				$page_id = $first_page_created->ID;
			} else {

				// create page
				$page = array(
					'post_type' => 'page',
					'post_title' => 'Home page',
					'post_name' => 'home',
					'post_content' => "This is your front page. Click the 'edit' link to change the contents", 
					'post_status' => 'publish',
					'comment_status' => 'closed'
				);

				$page_id = wp_insert_post( $page );
			} 

			if ( $page_id != 0 ) {
				update_option( 'page_on_front', $page_id );
			} else {
				wp_send_json_error();
				die();
			}
		}
	}
}