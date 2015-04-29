<?php
namespace JetpackStart;
class EndPoints { 
	const AJAX_NONCE = 'jps-ajax';

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
			add_action( 'wp_ajax_jps_activate_jetpack', array( __CLASS__, 'activate_jetpack' ) );
			// add_action( 'wp_ajax_jps_change_theme', array( __CLASS__, 'change_theme' ) );
		}
	}

	// this is quite coupled right now to the implementation - it would be nice to componentise it, but I'm not sure how
	// so in the meantime I'm trying to make it map closest to the conceptual model of WordPress itself, rather than the
	// currently-implemented React components
	static function js_vars() {
		return array(
			'nonce' => wp_create_nonce( \JetpackStart\EndPoints::AJAX_NONCE ),
			'bloginfo' => array('name' => get_bloginfo('name')),
			'themes' => wp_prepare_themes_for_js(),//\JetpackStart\EndPoints::get_themes(),
			'steps' => array(
				'set_title' => array('url_action' => 'jps_set_title'),
				'set_layout' => array('url_action' => 'jps_set_layout'),
				'stats_and_monitoring' => array(
					'jetpack_configured' => (is_plugin_active('jetpack') && Jetpack::is_active()),
					'activate_url_action' => 'jps_activate_jetpack'
				),
				'advanced_settings' => array(
					'jetpack_modules_url' => admin_url( 'admin.php?page=jetpack_modules' ),
					'widgets_url' => admin_url( 'widgets.php' ),
					'customize_url' => wp_customize_url()
				)
			)
		);
	}

	static function set_title() {
		check_ajax_referer( self::AJAX_NONCE, 'nonce' );
		$title = esc_html( $_REQUEST['title'] );
		if ( update_option( 'blogname', $title ) ) {
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
		}
	}

	// try to activate the plugin if necessary and kick off the jetpack connection flow
	// in a single action (possibly in a dialog / iframe / something?)
	static function activate_jetpack() {
		if ( ! is_plugin_active('jetpack') ) {
			activate_plugin('jetpack');
		}

		if ( ! class_exists('\\Jetpack') ) {
			wp_send_json_error('There was a problem activating Jetpack');
			die();
		}

		if ( ! \Jetpack::is_active() ) {

			if ( ! \Jetpack_Options::get_option( 'blog_token' ) ) {
				\Jetpack::init()->register();
			}

			// \Jetpack_Admin::init(); // needed so that menu hooks are installed for constructing the connect URL below
			(new \Jetpack_Landing_Page())->add_actions();

			// redirect to activate link
			$connect_url = \Jetpack::init()->build_connect_url( true, admin_url('index.php') ); //hopefully welcome widget won't need the #hash part eventually

			wp_send_json_success( array('next' => $connect_url) );
			// die();
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