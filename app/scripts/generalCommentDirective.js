angular.module('comments')
  .directive('generalComment', function(GeneralCommentsService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/generalComment.html',
      scope: {
        comment: '='
      },
      controller: function($scope) {
        $scope.markSeen = function(comment, parent) {
          if (!comment.seen) {
            GeneralCommentsService.markAsSeen(comment, parent);
          }
        };
      },
      link: function($scope, elem, attrs) {
        // empty for now...
      }
    }
  });