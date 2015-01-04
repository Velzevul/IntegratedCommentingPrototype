module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir: "app/sass",
          cssDir: "app/css",
          imagesDir: "app/images",
          javascriptsDir: "app/scripts"
        }
      }
    },

    express: {
      server: {
        options: {
          bases: ["app", "bower_components"],
          livereload: true
        }
      }
    },

    clean: {
      dist: ['dist/*']
    },

    concat: {
      dependencies: {
        src: ['bower_components/jquery/dist/jquery.js',
              'bower_components/angular/angular.js',
              'bower_components/angular-truncate/src/truncate.js'],
        dest: 'dist/scripts/dependencies.concat.js'
      },
      dist: {
        src: ['app/scripts/app.js',
              'app/scripts/*Service.js',
              'app/scripts/*Controller.js',
              'app/scripts/*Directive.js'],
        dest: 'dist/scripts/app.concat.js'
      }
    },

    copy: {
      modernizr: { expand: true, cwd: 'bower_components/', src: 'modernizr/modernizr.js', dest: 'dist/scripts/', flatten: true },
      css:       { expand: true, src: 'app/css/*.css', dest: 'dist/css/', flatten: true }
    },

    processhtml: {
      dist: {
        src: 'app/index.html',
        dest: 'dist/index.html'
      }
    },

    watch: {
      css: {
        files: ['app/sass/**/*.scss'],
        tasks: ['compass']
      },

      livereload: {
        files: ['app/*.html', 'app/css/*.css', 'app/scripts/**/*.js'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', ['compass', 'express', 'watch', 'express-keepalive']);
  grunt.registerTask('dist', ['compass', 'clean:dist', 'concat', 'copy', 'processhtml:dist']);
};