<?php

class Jetpack_Start_Step {

	static function render_step( $step_slug ) {
		$file = 'steps/' . $step_slug . '.php';
		Jetpack_Start::get_view( $file );
	}

}
