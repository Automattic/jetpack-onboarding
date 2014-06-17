module.exports = function(grunt) {

	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// concat: {
		//     dist: {
		//         src: [
		//             'js/main/*.js',
		//         ],
		//         dest: 'js/production.js', // needs a better name, doncha think?
		//     }
		// },
		// uglify: {
		//     build: {
		//         src: 'js/production.js',
		//         dest: 'js/production.min.js'
		//     }
		// },
		sass: {
			dist: {
				options: {
					// Can be nested, compact, compressed, expanded
					style: 'expanded',
					sourcemap: true
				},
				files: {
					'css/jetpack-start.css': 'css/scss/jetpack-start.scss',
					'css/welcome-panel.css': 'css/scss/welcome-panel.scss',
					'css/jetpack-start-menu.css': 'css/scss/jetpack-start-menu.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				// Task-specific options go here.
			},
			global: {
				options: {
					// Target-specific options go here.
					// browser-specific info: https://github.com/ai/autoprefixer#browsers
					// DEFAULT: browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1']
					browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1', 'ie 8', 'ie 9'],
					map: true
				},
				src: 'css/*.css'
			},
		},
		watch: {
			// options: {
			//     livereload: true,
			// },
			// scripts: {
			//     files: ['js/*.js'],
			//     tasks: ['concat', 'uglify'],
			//     options: {
			//         spawn: false,
			//     },
			// },
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
			}
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');     // concatenate
	grunt.loadNpmTasks('grunt-contrib-uglify');     // minify
	grunt.loadNpmTasks('grunt-contrib-watch');      // watch files for changes
	grunt.loadNpmTasks('grunt-contrib-sass');       // Gettin Sassy!
	grunt.loadNpmTasks('grunt-autoprefixer');       // Auto-freaking-prefixer!!!

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['watch']);

};
