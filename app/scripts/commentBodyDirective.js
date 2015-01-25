angular.module('comments')
  .directive('commentBody', function(UserService, ContextualCommentsService, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/commentBody.html',
      scope: {
        comment: '=',
        parent: '=',
        truncated: '='
      },
      controller: function($scope) {
        $scope.editMode = false;
        $scope.postedByCurrentUser = $scope.comment.authorName == UserService.getCurrent().name;

        $scope.$watch('truncated', function(val) {
          if (val) {
            $scope.editMode = false;
          }
        });

        $scope.enterEditMode = function() {
          $scope.tempText = $scope.comment.text;
          $scope.editMode = true;

          $timeout(function() {
            ContextualCommentsService.reposition();
          });
        };

        $scope.leaveEditMode = function() {
          $scope.editMode = false;

          $timeout(function() {
            ContextualCommentsService.reposition();
          });
        };

        $scope.updateComment = function() {
          if ($scope.tempText.length) {
            $scope.comment.text = $scope.tempText;
            $scope.editMode = false;
          }
        };

        $scope.deleteComment = function() {
          ContextualCommentsService.delete($scope.comment, $scope.parent);
        };
      },
      link: function(scope, elem, attrs) {
        var textarea = elem.find('textarea');

        textarea.on('keypress', function() {
          ContextualCommentsService.reposition();
        });
      }
    };
  });