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
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');     // concatenate
	grunt.loadNpmTasks('grunt-contrib-uglify');     // minify
	grunt.loadNpmTasks('grunt-contrib-watch');      // watch files for changes
	grunt.loadNpmTasks('grunt-contrib-sass');       // Gettin Sassy!
	grunt.loadNpmTasks('grunt-autoprefixer');       // Auto-freaking-prefixer!!!

	grunt.registerTask('default', ['watch']);

};
