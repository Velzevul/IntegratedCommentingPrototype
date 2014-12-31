angular.module('comments')
  .directive('generalComment', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'generalComment.html',
      scope: {
        comment: '='
      },
      controller: function($scope) {

      },
      link: function($scope, elem, attrs) {

      }
    }
  });