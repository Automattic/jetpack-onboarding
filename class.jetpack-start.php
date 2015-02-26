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
		$jetpack_start_global_variables['end_url'] = admin_url( '?jps_wizard_end&welcome-screen-hide' );
		$jetpack_start_global_variables = apply_filters( 'jetpack_start_js_globals', $jetpack_start_global_variables );

		wp_localize_script( 'jetpack-start', '_JetpackStart', $jetpack_start_global_variables );
		wp_dequeue_script( 'devicepx' );
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
				return $a->sort == $b->sort ? 0 : ( $a->sort > $b->sort ) ? 1 : -1;
			}
			usort( $steps, 'stepSort' );
		}

		return apply_filters( 'jetpack_start_steps', $steps );
	}

	static function is_compatible_step( $step ) {
		if ( ! empty( $step->deps ) ) {
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
			foreach ( $step->deps as $plugin_name ) {
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

		$headers = array(
			'label' => 'Label',
			'sort'  => 'Sort Order',
			'show'  => 'Show',
			'deps'  => 'Plugin Dependencies'
		);

		$step_headers = get_file_data( $file, $headers );

		$step_headers['show']  = empty( $step_headers['show'] ) ? true : filter_var( $step_headers['show'], FILTER_VALIDATE_BOOLEAN );

		if ( ! $step_headers['show'] ) {
			return false;
		}

		require_once( $file );

		$step_headers['slug']  = basename( $file, ".php");;
		$step_headers['label'] = translate( $step_headers['label'], 'jetpack-start' );
		$step_headers['sort']  = empty( $step_headers['sort'] ) ? 0 : (int) $step_headers['sort'];

		if ( $step_headers['deps'] ) {
			$step_headers['deps'] = explode( ',', $step_headers['deps'] );
			$step_headers['deps'] = array_map( 'trim', $step_headers['deps'] );
		} else {
			$step_headers['deps'] = array();
		}

		$step_class_name = 'Jetpack_Start_Step_' . str_replace( '-', '_', $step_headers['slug'] );
		$step = new $step_class_name;
		$step->setHeaders( $step_headers );
		return $step;
	}
}
