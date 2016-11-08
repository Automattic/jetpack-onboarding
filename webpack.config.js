var webpack = require( 'webpack' ),
	fs = require( 'fs' ),
	path = require( 'path' ),
	ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

var NODE_ENV = process.env.NODE_ENV || 'development';

// build the plugin list, optionally excluding hot update plugins if we're building for production
var plugins = [
	new webpack.optimize.CommonsChunkPlugin( /* chunkName= */'vendor', /* filename= */ 'vendor.bundle.js' ),
	new ExtractTextPlugin( '[name].css' ),
	new webpack.DefinePlugin( {
		'process.env': {
			// This has effect on the react lib size
			NODE_ENV: JSON.stringify( NODE_ENV )
		}
	} )
];

module.exports = {
	progress: true,
	entry: {
		'jetpack-onboarding': './client/jetpack-onboarding.js',
		'ie-shims': './client/ie-shims.js',
		'vendor': [ 'react', 'react-dom' ]
	},
	output: {
		publicPath: '/assets/',
		path: path.resolve( __dirname, 'dist' ),
		filename: '[name].js',
		chunkFilename: '[id].js'
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		alias: {
			stores: path.join( __dirname, '/client/stores' ),
			actions: path.join( __dirname, '/client/actions' ),
		},
		root: [
			path.resolve( __dirname, 'client' ),
			fs.realpathSync( path.join( __dirname, 'node_modules/@automattic/dops-components/client' ) )
		]
	},
	resolveLoader: {
		root: path.join( __dirname, 'node_modules' ),
		alias: {
			'custom-colors': '@automattic/custom-colors-loader'
		}
	},
	node: {
		fs: 'empty'
	},
	stats: { colors: true, reasons: true },
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
					require.resolve( 'babel-loader' ),
					require.resolve( 'eslint-loader' )
				],

				// include both typical npm-linked locations and default module locations to handle both cases
				include: [
					path.join( __dirname, 'test' ),
					path.join( __dirname, 'client' ),
					fs.realpathSync( path.join( __dirname, 'node_modules/@automattic/dops-components/client' ) ),
					path.join( __dirname, 'node_modules/@automattic/dops-components/client' )
				]
			},
			{
				test: /\.json$/,
				loader: require.resolve( 'json-loader' ),
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract( 'css?sourceMap!autoprefixer!' ),
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract( 'css?sourceMap!autoprefixer!sass?sourceMap!custom-colors' ),
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: require.resolve( 'url-loader' ) + '?limit=20000&mimetype=image/svg+xml'
			}
		]
	},
	customColorsLoader: {
		file: path.join( __dirname, './css/scss/color-overrides.scss' )
	},
	eslint: {
		configFile: path.join( __dirname, '.eslintrc' ),
		quiet: true
	},
	plugins: plugins
};
