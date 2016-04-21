(function(window) {
  'use strict';

  var app = angular.module('comments', ['logger', 'truncate', 'app-templates', 'monospaced.elastic', 'ngRoute']);
  window.app = app;

  app.factory('rootPrefix', function() {
    if (typeof(DEVELOPMENT) === 'undefined') {
      return '/switter';
    } else {
      return '';
    }
  });

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      // .when('/', {
      //   controller: 'startScreenController',
      //   templateUrl: 'templates/startScreen.html'
      // })
      // .when('/interface', {
      //   controller: function() {

      //   },
      //   templateUrl: function() {

      //   }
      // });
        .when('/integrated', {
            controller: 'integratedController',
          templateUrl: function(name){
            var path = 'templates/integrated-' + name.content;

            if(name.clutter == 'true'){
              path += '_clutter.html';
            } else {
              path += '.html';
            }

             return path;
          }
        })
        .when('/heatmap', {
          controller: 'heatmapController',
          templateUrl: function(name){
            var path = 'templates/heatmap-' + name.content;
            if(name.clutter == 'true'){
              path += '_clutter.html';
            } else {
              path += '.html';
            }

            console.log(path)

             return path;
          }
        })
        .when('/paragraph', {
          controller: 'paragraphController',
          templateUrl: function(name){
            var path = 'templates/paragraph-' + name.content;
            if(name.clutter == 'true'){
              path += '_clutter.html';
            } else {
              path += '.html';
            }

             return path;
          }
        })
        .when('/add-comments', {
          controller: 'integratedController',
          templateUrl: function(name){
            var path = 'templates/temp';
            if(name.clutter == 'true'){
              path += '_clutter.html';
            } else {
              path += '.html';
            }

             return path;
          }
        });
   }]);
})(window);
