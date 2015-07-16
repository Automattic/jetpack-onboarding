process.env.NODE_ENV = 'development'; //XXX hack for envify
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					// Can be nested, compact, compressed, expanded
					style: 'compressed'
				},
				files: {
					'css/welcome-panel.css': 'css/scss/welcome-panel.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				// Task-specific options go here.
			},
			global: {
				options: {
					browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1', 'ie 8', 'ie 9', 'safari 7', 'safari 8'],
					map: true
				},
				src: 'css/*.css'
			},
		},
		watch: {
			css: {
				files: ['css/scss/*.scss', 'css/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'notify:css'],
				options: {
					livereload: true,
					spawn: false,
				}
			},
			php: {
				files: ['*.php', '**/*.php', '**/**/*.php'],
				options: {
					livereload: true,
					spawn: false,
				}
			},
			browserify: {
				files: ['client/*', 'client/**/*', 'node_modules/@automattic/dops-react/js/**'],
				tasks: ['jshint-jsx', 'browserify', 'notify:js']	
			}
		},

		notify: {
			js: {
				options: {
					message: 'JS rebuilt' 
				}
			},
			css: {
				options: {
					message: 'CSS rebuilt'
				}
			}
		},

		minifyify: {
			options: {
				'inputFolder' : 'js',
				'outputFolder' : 'js'
			}
		},

		browserify: {
			options: {
				browserifyOptions: {
					debug: true,
					extensions: ['.jsx'],
					external: {
						'react/addons':'React',
						'react':'React'
					}
				},
				debug: true,
				transform: [
					[require('grunt-react').browserify, { harmony: true }],
					['browserify-shim', { global: true }],
					'envify',
					['uglifyify', { global: true }]
				],
				// plugin: [
				// 	['minifyify']
				// ]
			},
			app: {
				src:        'client/jetpack-start.js',
				dest:       'js/jetpack-start.js'
			},
			shims: {
				src: 		'client/ie-shims.js',
				dest: 		'js/ie-shims.js'
			},
			// shims_prod: {
			// 	options: {
			// 		transform: ['uglifyify'],
			// 	},
			// 	src: 		'js/ie-shims.js',
			// 	dest: 		'js/ie-shims.min.js'
			// },
			// app_prod: {
			// 	options: {
			// 		transform: ['uglifyify'],
			// 	},
			// 	src:        'js/jetpack-start.js',
			// 	dest:       'js/jetpack-start.min.js'
			// },
		},

		envify: {
			options: {

			}
		},

		'jshint-jsx': {
			options: {
				esnext: true,
				convertJSX: true,
				curly: true,
				undef: true,
				unused: true,
				funcscope: true,
				browser: true,
				debug: true,
				globals: { module: true, require: true, jQuery: true, JPS: true, console: true, _: true, ajaxurl: true }
			},
			all: ['client/**/*.js', 'client/**/*.jsx']
		},
	});

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-envify');
	grunt.loadNpmTasks('grunt-minifyify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-contrib-concat');     // concatenate
	grunt.loadNpmTasks('grunt-contrib-jshint-jsx');
	grunt.loadNpmTasks('grunt-contrib-uglify');     // minify
	grunt.loadNpmTasks('grunt-contrib-watch');      // watch files for changes
	grunt.loadNpmTasks('grunt-contrib-sass');       // Gettin Sassy!
	grunt.loadNpmTasks('grunt-autoprefixer');       // Auto-freaking-prefixer!!!

	grunt.registerTask('default', ['watch']);

};
