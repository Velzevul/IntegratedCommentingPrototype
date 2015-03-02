angular.module('comments')
  .directive('generalReplyForm', function(GeneralCommentsService, UserService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/generalReplyForm.html',
      scope: {
        parentThreadId: '='
      },
      controller: function($scope) {
        $scope.currentUser = UserService.getCurrent();

        $scope.postComment = function() {
          if ($scope.commentText) {
            GeneralCommentsService.create($scope.commentText, $scope.replyRequested, $scope.parentThreadId);
          }

          $scope.deactivate();
        };

        $scope.activate = function() {
          $scope.active = true;
        };

        $scope.deactivate = function() {
          $scope.commentText = '';
          $scope.active = false;
        };
      }
    }
  });