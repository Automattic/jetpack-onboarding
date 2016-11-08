process.env.UV_THREADPOOL_SIZE = 100; // fix a bug in libsass

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var sourcemaps = require( 'gulp-sourcemaps' );

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

gulp.task( 'default', [ 'sass:build' ] );
gulp.task( 'watch',   [ 'sass:watch' ] );
