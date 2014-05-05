<?php

class Jetpack_Start_Menu {

	const HIDE_MENU_INTRO_KEY = 'hide-menu-intro';

	static function init() {
		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			if ( isset( $_GET['jps_menu_action'] ) ) {
				do_action( 'jetpack_start_menu_action', sanitize_text_field( $_GET['jps_menu_action'] ) );
				wp_safe_redirect( remove_query_arg( 'jps_menu_action' ) );
			}
			if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
				Jetpack_Start_Menu::init_menu_ajax();
			}
			// check for is_admin_bar_showing so it doesn't get displayed on the cutomizer.
			global $wp_customize;
			if ( ( ! is_admin() && ! is_object( $wp_customize ) ) || isset( $_GET['jps_menu_action'] ) ) {
				Jetpack_Start_Menu::render();
			}
		}
	}

	static function render() {
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

	static function init_menu_ajax() {
		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			add_action( 'wp_ajax_jetpackstart_menu_hide_intro', array( __CLASS__, 'menu_hide_intro' ) );
			add_action( 'wp_ajax_jetpackstart_menu_status', array( __CLASS__, 'menu_status' ) );
		}
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

}
