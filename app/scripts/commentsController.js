angular.module('comments')
  .controller('commentsController', function($scope, ContextualCommentsService, SelectionService, GeneralCommentsService) {
    'use strict';

    $scope.activeTab = null;

    // contextual comments
    $scope.contextualComments = ContextualCommentsService.getAll();

    $scope.deselectAllComments = function($event) {
      var isContextualComment = $($event.target).parents('.thread-contextual').length,
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

    // general comments
    $scope.generalComments = GeneralCommentsService.getAll();
    $scope.generalCommentFormShown = false;

    $scope.showGeneralCommentForm = function() {
      var commentsBody = $('.comments-sidebar__body');

      $scope.activeTab = 'general';
      $scope.generalCommentFormShown = true;
      commentsBody.animate({'scrollTop': 0}, 100);
    };
  });