<?php

/*
Plugin Name: Jetpack Start
Plugin URI: https://github.com/automattic/jetpack-start
Description: Jetpack Start Wizard.
Version: 0.1
*/

require_once( dirname( __FILE__ ) . '/class.jetpack-start.php' );
Jetpack_Start::init();
