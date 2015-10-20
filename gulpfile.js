process.env.UV_THREADPOOL_SIZE = 100; // fix a bug in libsass

var gulp = require('gulp'),
	path = require('path'),
	gutil = require('gulp-util'),
	sftp = require('gulp-sftp'),
	merge = require('merge-stream'),
	sass = require('gulp-sass'),
	babel = require('gulp-babel'),
	autoprefixer = require('gulp-autoprefixer'),
	open = require('gulp-open'),
	sourcemaps = require('gulp-sourcemaps'),
	webpack = require("webpack"),
	assign = require('lodash/object/assign'),
	po2json = require('gulp-po2json'),
	browserStack = require('gulp-browserstack'),
	gls = require('gulp-live-server'),
	WebpackDevServer = require("webpack-dev-server");

var DEV_SERVER_PORT = 8085;

// By default run a server for development
gulp.task("default", ["dev-server"]);

// Production build
gulp.task("build", ["webpack:build"]);

// Production build
gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	process.env.NODE_ENV = "production";
	var buildConfig = Object.create(require('./webpack.config.js'));
	buildConfig.plugins = buildConfig.plugins.concat(
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	buildConfig.devtool = 'source-map';

	// run webpack
	webpack(buildConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("webpack:build-dev", function(callback) {
	process.env.NODE_ENV = "production";

	var devAccountConfig = Object.create(require('./webpack.config.js'));
	devAccountConfig.devtool = "source-map";
	devAccountConfig.debug = true;

	// create a single instance of the compiler to allow caching
	var devCompiler = webpack(devAccountConfig);

	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

// compile legacy sass stylesheets
gulp.task('sass', function() {
	gulp.src('./css/scss/*.scss')
		.pipe(sourcemaps.init())
		// .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./css'));
});

// gulp.task("dev-server", function(callback) {
// 	var serverScript = path.resolve(__dirname, 'server/app.js');

// 	var server = gls(serverScript, {}, false);

// 	server.start().then(function(result) {
//         console.log('Server exited with result:', result);
//         process.exit(result.code);
//     });
// });