angular.module('comments')
  .controller('commentsController', function($scope, ContextualCommentsService, SelectionService) {
    'use strict';

    $scope.commentsShown = false;

    $scope.contextualComments = ContextualCommentsService.getAll();

    $scope.deselectAllComments = function($event) {
      var isContextualComment = $($event.target).parents('.comment-thread').length,
          isAnchor = event.target.tagName.slice(0,4) == 'NOTE';

      if ($scope.activeTab == 'contextual' && !isContextualComment && !isAnchor) {
        ContextualCommentsService.deactivateAll();
      }
    };

    $scope.addContextualComment = function() {
      $scope.activeTab = 'contextual';

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
  });