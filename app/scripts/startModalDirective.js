angular.module('comments')
  .directive('startModal', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/startModal.html',
      scope: {
        clickAction: '='
      },
      link: function($scope, elem) {
        elem.click(function() {
          $scope.clickAction();
        });
      }
    };
  });