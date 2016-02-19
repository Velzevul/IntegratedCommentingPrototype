angular.module('comments')
  .directive('heatmapDirective', function(HeatmapService) {
    'use strict';

    return {
      scope: {
        id: '='
      },
      link: function($scope, elem, attrs) {

      }
    };
  });
