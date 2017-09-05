process.env.UV_THREADPOOL_SIZE = 100; // fix a bug in libsass

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var childProcess = require( 'child_process' );

function doSass() {
	if ( arguments.length ) {
		console.log( 'Sass file ' + arguments[0].path + ' changed.' );
	}
	var start = new Date();
	console.log( 'Building CSS bundle' );
	gulp.src( './css/scss/welcome-panel.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( autoprefixer() )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( './css' ) )
		.on( 'end', function() {
			console.log( 'CSS finished.' );
		} );
};

gulp.task( 'sass:build', function() {
	doSass();
} );

gulp.task( 'sass:watch', function() {
	doSass();
	gulp.watch( [ './css/**/*.scss' ], doSass );
} );

gulp.task( 'webpack:build', function( cb ) {
	var env = process.env.NODE_ENV;
	var command = ( 'undefined' !== env && 'production' === 'env' )
		? 'webpack --color'
		: 'webpack -p --color';

	childProcess.exec( command, function( err, stdout, stderr ) {
		console.log( stdout );
		console.log( stderr );
		cb( err );
	} );
} );

gulp.task( 'webpack:watch', ( cb ) => {
	const webpack_watch = childProcess.spawn( 'webpack', [ '--watch', '--color' ] );

	webpack_watch.stdout.on( 'data', ( data ) => {
		console.log( `stdout: ${data}` );
	} );

	webpack_watch.stderr.on( 'data', ( data ) => {
		console.log( `stderr: ${data}` );
	} );

	webpack_watch.on( 'close', ( code ) => {
		console.log( `child process exited with code ${code}` );
	} );
} );

gulp.task( 'default', [ 'sass:build', 'webpack:build' ] );
gulp.task( 'watch',   [ 'sass:watch', 'webpack:watch' ] );
