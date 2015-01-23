angular.module('comments')
  .directive('contextualReplyFormDummy', function(ContextualCommentsService, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/contextualReplyFormDummy.html',
      scope: {
        parentThreadId: '='
      },
      controller: function($scope) {
        $scope.postComment = function() {
          if ($scope.commentText) {
            ContextualCommentsService.create($scope.commentText, $scope.parentThreadId);
          }

          $scope.deactivate();
        };

        $scope.activate = function() {
          $scope.active = true;

          $timeout(function() {
            ContextualCommentsService.reposition();
          });
        };

        $scope.deactivate = function() {
          $scope.commentText = '';
          $scope.active = false;

          $timeout(function() {
            ContextualCommentsService.reposition();
          });
        };
      }
    }
  });