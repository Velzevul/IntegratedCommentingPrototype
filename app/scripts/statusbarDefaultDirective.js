angular.module('comments')
  .directive('statusbarDefault', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'statusbarDefault.html',
      controller: function($scope) {

      }
    };
  });