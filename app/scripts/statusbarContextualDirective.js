angular.module('comments')
  .directive('statusbarContextual', function(ContextualCommentsService, SelectionService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/statusbarContextual.html',
      controller: function($scope) {
        if (!$scope.contextualStats) {
          $scope.contextualStats = ContextualCommentsService.stats();
        }

        $scope.deselectAllComments = function($event) {
          var isContextualComment = $($event.target).parents('.thread-contextual').length,
              isAnchor = $event.target.tagName.slice(0,4) == 'NOTE';

          if ($scope.activeTab == 'contextual' && !isContextualComment && !isAnchor) {
            ContextualCommentsService.deactivateAll();
          }
        };
        $scope.addContextualComment = function() {
          if (SelectionService.hasSelection()) {
            ContextualCommentsService.create();
            $scope.selectingContext = false;
          } else {
            $scope.selectingContext = true;
          }
        };
        $scope.cancelContextualComment = function() {
          $scope.selectingContext = false;
          SelectionService.clearSelection();
        };
      }
    };
  });