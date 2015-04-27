module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					// Can be nested, compact, compressed, expanded
					style: 'expanded'
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
					browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1', 'ie 8', 'ie 9'],
					map: true
				},
				src: 'css/*.css'
			},
		},
		watch: {
			css: {
				files: ['css/scss/*.scss', 'css/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
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
			react: {
				files: ['jsx/*.jsx'],
				tasks: ['react']
			},
			browserify: {
				files: ['client/*.js', 'client/**/*.js'],
				tasks: ['browserify']	
			}
		},

		browserify: {
			options: {
				transform:  [ require('grunt-react').browserify ]
			},
			app: {
				src:        'client/jetpack-start.js',
				dest:       'js/jetpack-start.js'
			}
		},

		react: {
			files: {
				expand: true,
				cwd: 'jsx',
				src: ['**/*.jsx'],
				dest: 'client/components',
				ext: '.js'
			}
		},

		// react: {
		// 	single_file_output: {
		// 		files: {
		// 			'js/welcome.js': 'jsx/welcome.jsx'
		// 		}
		// 	},
		// 	// combined_file_output: {
		// 	// 	files: {
		// 	// 		'path/to/output/dir/combined.js': [
		// 	// 		  'path/to/jsx/templates/dir/input1.jsx',
		// 	// 		  'path/to/jsx/templates/dir/input2.jsx'
		// 	// 		]
		// 	//   	}
		// 	// },
		// 	// dynamic_mappings: {
		// 	// 	files: [
		// 	// 		{
		// 	// 			expand: true,
		// 	// 			cwd: 'path/to/jsx/templates/dir',
		// 	// 			src: ['**/*.jsx'],
		// 	// 			dest: 'path/to/output/dir',
		// 	// 			ext: '.js'
		// 	// 		}
		// 	// 	]
		// 	// }
		//   },
	});

	grunt.loadNpmTasks('grunt-browserify');
	// grunt.initConfig({
	  
	// })
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-contrib-concat');     // concatenate
	grunt.loadNpmTasks('grunt-contrib-uglify');     // minify
	grunt.loadNpmTasks('grunt-contrib-watch');      // watch files for changes
	grunt.loadNpmTasks('grunt-contrib-sass');       // Gettin Sassy!
	grunt.loadNpmTasks('grunt-autoprefixer');       // Auto-freaking-prefixer!!!

	grunt.registerTask('default', ['watch']);

};
