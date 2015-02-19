angular.module('comments')
  .directive('contextualReplyForm', function(ContextualCommentsService, UserService, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/contextualReplyForm.html',
      scope: {
        parentThreadId: '='
      },
      controller: function($scope) {
        $scope.currentUser = UserService.getCurrent();

        $scope.postComment = function() {
          if ($scope.commentText) {
            ContextualCommentsService.create($scope.commentText, $scope.replyRequested, $scope.parentThreadId);
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
      },
      link: function($scope, elem, attrs) {
        var textarea = elem.find('textarea');

        textarea.on('keypress', function() {
          ContextualCommentsService.reposition();
        });
      }
    }
  });