(function(window) {
  'use strict';

  var app = angular.module('comments', ['logger', 'truncate', 'app-templates', 'monospaced.elastic', 'ngRoute']);
  window.app = app;

  app.factory('rootPrefix', function() {
    if (typeof(DEVELOPMENT) === 'undefined') {
      return '/integratedCommentingStudy';
    } else {
      return '';
    }
  });

  var constructPath = function(interfaceType, urlParams) {
    var path = 'templates/' + interfaceType + '-' + urlParams.content;

    if (urlParams.clutter === 'on' && urlParams.content !== 'training') {
      path += '_clutter';
    }

    path += '.html';

    return path;
  };

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/reading', {
        controller: 'readingController',
        templateUrl: 'templates/reading.html'
      })
      .when('/integrated', {
        controller: 'integratedController',
        templateUrl: function(urlParams){
          return constructPath('integrated', urlParams);
        }
      })
      .when('/heatmap', {
        controller: 'heatmapController',
        templateUrl: function(urlParams){
          return constructPath('heatmap', urlParams);
        }
      })
      .when('/paragraph', {
        controller: 'paragraphController',
        templateUrl: function(urlParams){
          return constructPath('paragraph', urlParams);
        }
      });
   }]);
})(window);
