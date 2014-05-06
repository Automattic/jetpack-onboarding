<?php

class Jetpack_Start {

	static function init() {
		if ( current_user_can_for_blog( get_current_blog_id(), 'switch_themes' ) ) {
			self::get_steps();
			if ( ! ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
				if ( apply_filters( 'jetpack_start_render_wizard', true ) ) {
					add_action( 'admin_init', array( __CLASS__, 'render_wizard' ), 100 );
				}
			}
		}
	}

	static function render_wizard() {
		wp_enqueue_script( 'underscore');
		wp_enqueue_script( 'jetpack-start', plugins_url( 'js/jetpack-start.js', __FILE__ ), array( 'jquery', 'backbone', 'underscore' ) );

		$jetpack_start_global_variables['ajaxurl'] = admin_url( 'admin-ajax.php' );
		$jetpack_start_global_variables['steps'] = self::get_steps();
		$jetpack_start_global_variables['home_url'] = home_url();
		$jetpack_start_global_variables = apply_filters( 'jetpack_start_js_globals', $jetpack_start_global_variables );

		wp_localize_script( 'jetpack-start', '_JetpackStart', $jetpack_start_global_variables );

		self::get_view( 'index.php' );
		die();
	}

	static function get_steps() {
		static $steps = null;

		if ( ! isset( $steps ) ) {
			require_once( plugin_dir_path( __FILE__ ) . 'class.jetpack-start-step.php' );
			$files = self::glob_php( plugin_dir_path( __FILE__ ) . '/steps' );
			$steps = array();

			foreach ( $files as $file ) {
				$step = self::get_step( $file );
				if ( ! $step || ! self::is_compatible_step( $step ) ) {
					continue;
				}
				$steps[] = $step;
			}
			function stepSort( $a, $b ) {
				return $a['sort'] == $b['sort'] ? 0 : ( $a['sort'] > $b['sort'] ) ? 1 : -1;
			}
			usort( $steps, 'stepSort' );
		}

		return apply_filters( 'jetpack_start_steps', $steps );
	}

	static function is_compatible_step( $step ) {
		if ( ! empty( $step['deps'] ) ) {
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
			foreach ( $step['deps'] as $plugin_name ) {
				if ( ! is_plugin_active( $plugin_name ) )
					return false;
			}
		}
		return true;
	}

	static function get_first_step() {
		$steps = self::get_steps();
		return reset( $steps );
	}

	static function redirect_to_step( $step_slug ) {
		wp_safe_redirect( admin_url( "#setup/step/" . $step_slug ) );
	}

	/**
 	 * Includes the views template file. This helps keep the class code clean 
	 * by seperating the logic from the view
	 *
	 * Template files are located in the views folder.   
	 *
	 * @param string $file - The file name (minus extension)
	 */
	static function get_view( $file ) {
		$file = plugin_dir_path( __FILE__ ) . '/views/' . $file;
		if( file_exists( $file ) ) {
			require_once( $file );
		}
	}

	/**
	 * Returns an array of all PHP files in the specified absolute path.
	 * Equivalent to glob( "$absolute_path/*.php" ).
	 *
	 * @param string $absolute_path The absolute path of the directory to search.
	 * @return array Array of absolute paths to the PHP files.
	 */
	public static function glob_php( $absolute_path ) {
		$absolute_path = untrailingslashit( $absolute_path );
		$files = array();
		if ( ! $dir = @opendir( $absolute_path ) ) {
			return $files;
		}

		while ( false !== $file = readdir( $dir ) ) {
			if ( '.' == substr( $file, 0, 1 ) || '.php' != substr( $file, -4 ) ) {
				continue;
			}

			$file = "$absolute_path/$file";

			if ( ! is_file( $file ) ) {
				continue;
			}

			$files[] = $file;
		}

		closedir( $dir );

		return $files;
	}

	public static function get_step( $file ) {
		if ( ! file_exists( $file ) )
			return false;

		require_once( $file );

		$headers = array(
			'label' => 'Label',
			'sort'  => 'Sort Order',
			'deps'  => 'Plugin Dependencies'
		);

		$step = get_file_data( $file, $headers );

		$step['slug']  = basename( $file, ".php");;
		$step['label'] = translate( $step['label'], 'jetpack-start' );
		$step['sort']  = empty( $step['sort'] ) ? 0 : (int) $step['sort'];

		if ( $step['deps'] ) {
			$step['deps'] = explode( ',', $step['deps'] );
			$step['deps'] = array_map( 'trim', $step['deps'] );
		} else {
			$step['deps'] = array();
		}

		return $step;
	}
}
