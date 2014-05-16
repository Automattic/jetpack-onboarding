<?php

class Jetpack_Start_Step {

	function setHeaders( $headers ) {
		foreach( $headers as $key => $value ){
			$this->$key = $value;
		}
	}

	function render() {
		$step = $this;
		$file = plugin_dir_path( __FILE__ ) . 'views/steps/' . $this->slug . '.php';
		if( file_exists( $file ) ) {
			require_once( $file );
		}
	}

}
