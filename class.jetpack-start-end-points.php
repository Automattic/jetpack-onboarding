<?php
class Jetpack_Start_EndPoints { 
	const AJAX_NONCE = 'jps-ajax';
	const STEP_STATUS_KEY = 'jps_step_statuses';

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
			add_action( 'wp_ajax_jps_step_complete', array( __CLASS__, 'step_complete' ) );

			// add_action( 'wp_ajax_jps_change_theme', array( __CLASS__, 'change_theme' ) );
		}
	}

	// this is quite coupled right now to the implementation - it would be nice to componentise it, but I'm not sure how
	// so in the meantime I'm trying to make it map closest to the conceptual model of WordPress itself, rather than the
	// currently-implemented React components
	static function js_vars() {
		$step_statuses = get_option( self::STEP_STATUS_KEY, array() );

		return array(
			'nonce' => wp_create_nonce( Jetpack_Start_EndPoints::AJAX_NONCE ),
			'bloginfo' => array(
				'name' => get_bloginfo('name'),
			),

			'site_actions' => array(
				'set_title' => 'jps_set_title',
				'set_layout' => 'jps_set_layout',
				'set_theme' => 'jps_set_theme',
				'configure_jetpack' => 'jps_configure_jetpack'
			),

			'step_actions' => array(
				'complete' => 'jps_step_complete'
			),

			'themes' => wp_prepare_themes_for_js(),//\JetpackStart\EndPoints::get_themes(),

			'jetpack' => array(
				'plugin_active' => is_plugin_active('jetpack'),
				'configured' => (is_plugin_active('jetpack') && Jetpack::is_active())
			),

			'step_status' => $step_statuses,

			'steps' => array(
				'set_title' => array(
					'completed' => ($step_statuses['title'] == true), 
				),
				'set_layout' => array(
					'completed' => ($step_statuses['layout'] == true), 
				),
				'advanced_settings' => array(
					'jetpack_modules_url' => admin_url( 'admin.php?page=jetpack_modules' ),
					'widgets_url' => admin_url( 'widgets.php' ),
					'customize_url' => wp_customize_url()
				)
			)
		);
	}

	static function step_complete() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		$step = $_REQUEST['step'];
		$step_statuses = get_option( self::STEP_STATUS_KEY, array() );
		$step_statuses[$step] = true;
		update_option( self::STEP_STATUS_KEY, $step_statuses );
		wp_send_json_success( $step_statuses );
	}

	static function set_title() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		$title = esc_html( $_REQUEST['title'] );
		if ( get_option( 'blogname' ) === $title || update_option( 'blogname', $title ) ) {
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
		if ( ! is_plugin_active('jetpack') ) {
			activate_plugin('jetpack');
		}

		if ( ! class_exists('Jetpack') ) {
			wp_send_json_error('There was a problem activating Jetpack');
			die();
		}

		if ( ! Jetpack::is_active() ) {

			if ( ! Jetpack_Options::get_option( 'blog_token' ) ) {
				Jetpack::init()->register();
			}

			(new Jetpack_Landing_Page())->add_actions();

			// redirect to activate link
			$connect_url = Jetpack::init()->build_connect_url( true, admin_url('index.php') );

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
		error_log(get_option( 'show_on_front' ));
		// ensure that front page is a static page
		if ( get_option( 'show_on_front' ) == 'posts' ) {
			update_option( 'show_on_front', 'page' );
		}

		// if no specific front page already set, find first or create
		if ( get_option( 'page_on_front' ) == null ) {

			// set to earliest published page if possible
			$first_page_created = get_pages( array('sort_column' => 'post_date', 'number' => 1, 'post_status' => 'publish'))[0];

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