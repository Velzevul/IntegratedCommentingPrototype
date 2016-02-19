angular.module('comments')
  .directive('statusbarDefault', function(ContextualCommentsService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/statusbarDefault.html',
      controller: function($scope) {
        $scope.contextualStats = ContextualCommentsService.stats();
      }
    };
  });
