angular.module('comments')
  .directive('generalCommentForm', function(GeneralCommentsService, UserService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/generalCommentForm.html',
      scope: {
        visibilitySwitcher: '='
      },
      controller: function($scope) {
        $scope.currentUser = UserService.getCurrent();

        $scope.postComment = function() {
          if ($scope.commentText) {
            GeneralCommentsService.create($scope.commentText, $scope.replyRequested);
            $scope.cancelComment();
          }
        };

        $scope.cancelComment = function() {
          $scope.commentText = '';
          $scope.visibilitySwitcher = false;
        };
      },
      link: function($scope, elem, attrs) {
        var textarea = elem.find('textarea');

        $scope.$watch('visibilitySwitcher', function(value) {
          if (value) {
            $(textarea).focus();
          }
        });
      }
    }
  });