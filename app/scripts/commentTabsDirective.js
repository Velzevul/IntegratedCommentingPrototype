angular.module('comments')
  .directive('commentTabs', function(ContextualCommentsService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/commentTabs.html',
      controller: function($scope) {
        if (!$scope.contextualStats) {
          $scope.contextualStats = ContextualCommentsService.stats();
        }
      }
    };
  });
