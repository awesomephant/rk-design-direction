module.exports = function(grunt) {

	grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	watch: {
		options: {
			livereload: false,
		},
		main: {
			files: ['design.json', 'template.hbs'],
			tasks: ['render'],
		},
        css: {
			files: ['*/*.scss'],
			tasks: ['css'],
		}
        
	},

	shell : {
		render : {
			command : 'jekyll build --drafts'
		}
	},

	sass: {
		dist: {
			options: {
			},
			files: {
				'css/main.css': 'sass/main.scss',
                'css/prototype.css': 'sass/prototype.scss'
			}
		}
	},
    
    postcss: {
        options: {
            processors: [
                require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    },   
    
    execute: {
        render: {
            src: ['render.js']
        }
    },
        
	browserSync: {
    	dev: {
			bsFiles: {
				src : ['*.html', 'css/*.css']
			},
			options: {
				server: {
                    baseDir: '.'
				},
				watchTask: true // < VERY important
			}
		}
	}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
    
    grunt.loadNpmTasks('grunt-execute');
    
	grunt.registerTask('render', ['execute:render']);
	grunt.registerTask('css', ['sass', 'postcss']);
	grunt.registerTask('up', ['browserSync', 'watch']);

};
