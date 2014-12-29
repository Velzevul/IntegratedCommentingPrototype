angular.module('comments')
  .directive('replyFormDummy', function(ContextualCommentsService, $timeout) {
    'use strict';

    return {
      scope: {
        parentThreadId: '='
      },
      templateUrl: 'replyFormDummy.html',
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