module.exports = function(grunt) {
  grunt.initConfig({
    // compass: {
    //   dist: {
    //     options: {
    //       sassDir: "app/sass",
    //       cssDir: "app/css",
    //       imagesDir: "app/images",
    //       javascriptsDir: "app/scripts"
    //     }
    //   }
    // },

    express: {
      server: {
        options: {
          bases: ["app", "bower_components", "answers", "logger", "study"],
          livereload: true
        }
      }
    },

    clean: {
      dist: ['dist/*']
    },

    concat: {
      dependencies: {
        src: ['bower_components/angular-truncate/src/truncate.js',
              'bower_components/angular-elastic/elastic.js',
              'bower_components/angular-route/angular-route.js'],
        dest: 'dist/scripts/dependencies.concat.js'
      },
      dist: {
        src: ['app/scripts/app.js',
              'app/scripts/templates.js',
              'app/scripts/*Service.js',
              'app/scripts/*Controller.js',
              'app/scripts/*Directive.js'],
        dest: 'dist/scripts/app.concat.js'
      }
    },

    html2js: {
      options: {
        base: 'app/scripts/',
        module: 'app-templates'
      },
      templates: {
        src: ['app/scripts/templates/**/*.html'],
        dest: 'app/scripts/templates.js'
      }
    },

    copy: {
      modernizr: { expand: true, cwd: 'bower_components/', src: 'modernizr/modernizr.js', dest: 'dist/scripts/', flatten: true },
      css:       { expand: true, src: 'app/css/*.css', dest: 'dist/css/', flatten: true },
      data:      { expand: true, src: 'app/data/*.json', dest: 'dist/data/', flatten: true},
      study:     { expand: true, src: 'study/css/study.css', dest: 'dist/css/', flatten: true},
      answers:   { expand: true, src: 'answers/css/answers.css', dest: 'dist/css/', flatten: true},
      studyJS:   { expand: true, src: 'study/scripts/study.js', dest: 'dist/scripts/', flatten: true},
      answersJS: { expand: true, src: 'answers/scripts/answers.js', dest: 'dist/scripts/', flatten: true},
      logger:    { expand: true, src: 'logger/scripts/logger.js', dest: 'dist/scripts/', flatten: true},
      angular:   { expand: true, src: 'bower_components/angular/angular.js', dest: 'dist/scripts', flatten: true},
      jquery:    { expand: true, src: 'bower_components/jquery/dist/jquery.js', dest: 'dist/scripts', flatten: true}
    },

    processhtml: {
      app: {
        src: 'app/index.html',
        dest: 'dist/index.html'
      },
      study: {
        src: 'study/study.html',
        dest: 'dist/study.html'
      },
      answers: {
        src: 'answers/answers.html',
        dest: 'dist/answers.html'
      }
    },

    watch: {
      // css: {
      //   files: ['app/sass/**/*.scss'],
      //   tasks: ['compass']
      // },
      templates: {
        files: ['app/scripts/templates/**/*.html'],
        tasks: ['html2js']
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
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default', [/*'compass',*/ 'html2js', 'express', 'watch', 'express-keepalive']);
  grunt.registerTask('dist', [/*'compass',*/ 'clean:dist', 'html2js', 'concat', 'copy', 'processhtml']);
};
