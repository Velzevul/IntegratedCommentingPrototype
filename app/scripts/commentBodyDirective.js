angular.module('comments')
  .directive('commentBody', function(UserService, ContextualCommentsService, GeneralCommentsService, DevParametersService, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/commentBody.html',
      scope: {
        comment: '=',
        parent: '=',
        truncated: '=',
        type: '@'
      },
      controller: function($scope) {
        $scope.parameters = DevParametersService.getParams();
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

          if ($scope.type == 'contextual') {
            $timeout(function() {
              ContextualCommentsService.reposition();
            });
          }
        };

        $scope.leaveEditMode = function() {
          $scope.editMode = false;

          if ($scope.type == 'contextual') {
            $timeout(function() {
              ContextualCommentsService.reposition();
            });
          }
        };

        $scope.updateComment = function() {
          if ($scope.tempText.length) {
            $scope.comment.text = $scope.tempText;
            $scope.editMode = false;
          }
        };

        $scope.deleteComment = function() {
          var targetService;

          if ($scope.type == 'contextual') {
            targetService = ContextualCommentsService;
          } else if ($scope.type == 'general') {
            targetService = GeneralCommentsService;
          }

          targetService.delete($scope.comment, $scope.parent);
        };
      },
      link: function($scope, elem, attrs) {
        var textarea = elem.find('textarea');

        if ($scope.type == 'contextual') {
          textarea.on('keypress', function() {
            ContextualCommentsService.reposition();
          });
        }
      }
    };
  });