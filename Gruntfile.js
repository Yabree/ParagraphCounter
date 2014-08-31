module.exports = function(grunt) {

	build_path = 'build/';

	// Project configuration.
	grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	sass: {
		dist: {
			options: {
				style: 'expanded'
			},
			files: {
				'src/public/css/main.css': 'src/public/scss/main.scss',
			}
		}
	},

	compass: {
		dist: {
			options: {
				sassDir: 'src/public/scss/',
				cssDir: 'src/public/css/',
				environment: 'production'
			}
		}
	},

	watch: {
		scripts: {
			files: ['src/public/scss/**/*.scss'],
			tasks: ['compass'],
			options: {
				spawn: false,
			},
		},
	},

	jasmine: {
		pivotal: {
			src: 'src/js/*.js',
			options: {
				specs: 'test-jasmine/Spec.js',
				outfile : 'SpecRunner.html'
			}
		}
	},
    connect: {
      server: {
        options: {
          base: "",
          port: 9999
        }
      }
    },
    watch: {

    }

});

	// build project - not ready
	//grunt.registerTask('build', ['']);

	grunt.registerTask('unittest', ['connect', 'watch']);

	// watch for sas file changes
	grunt.registerTask('buildSass', ['compass']);



	/**
	* Includes
	*/

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.loadNpmTasks('grunt-contrib-connect');



};