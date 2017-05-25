var webpack = require( 'webpack' ),
	fs = require( 'fs' ),
	path = require( 'path' ),
	ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

var NODE_ENV = process.env.NODE_ENV || 'development';

// build the plugin list, optionally excluding hot update plugins if we're building for production
var plugins = [
	new webpack.optimize.CommonsChunkPlugin( { name: 'vendor', filename: 'vendor.bundle.js' } ),
	new ExtractTextPlugin( '[name].css' ),
	new webpack.DefinePlugin( {
		'process.env': {
			// This has effect on the react lib size
			NODE_ENV: JSON.stringify( NODE_ENV )
		}
	} )
];

module.exports = {
	// progress: true,
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
		extensions: [ '.js', '.jsx' ],
		alias: {
			stores: path.join( __dirname, '/client/stores' ),
			actions: path.join( __dirname, '/client/actions' ),
		},
		modules: [
			path.resolve( __dirname, 'client' ),
			fs.realpathSync( path.join( __dirname, 'node_modules/@automattic/dops-components/client' ) ),
			"node_modules"
		]
	},
	node: {
		fs: 'empty'
	},
	stats: { colors: true, reasons: true },
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					require.resolve( 'babel-loader' ),
					{
						loader: require.resolve( 'eslint-loader' ),
						options: {
							configFile: path.join( __dirname, '.eslintrc' ),
							quiet: true
						}
					}
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
				use: require.resolve( 'json-loader' )
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: require.resolve( 'url-loader' ) + '?limit=20000&mimetype=image/svg+xml'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract( {
					use: ['css-loader', 'autoprefixer-loader' ]
				} ),
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					fallback: "style-loader",
          			use: [
						'css-loader', 
						'autoprefixer-loader', 
						'sass-loader', 
						{ 
							loader: '@automattic/custom-colors-loader',
							options: {
								file: path.join( __dirname, './css/scss/color-overrides.scss' )
							}
						}
					]
				} ),
			},
		]
	},
	plugins: plugins
};
