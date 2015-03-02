angular.module('comments')
  .directive('generalComment', function(GeneralCommentsService, UserService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/generalComment.html',
      scope: {
        comment: '='
      },
      controller: function($scope) {
        $scope.currentUser = UserService.getCurrent();

        $scope.markSeen = function(comment, parent) {
          if ((comment.isExpanded) || (parent && parent.isExpanded)) {
            if (!comment.seen) {
              GeneralCommentsService.markAsSeen(comment, parent);
            }
          }
        };
      },
      link: function($scope, elem, attrs) {
        // empty for now...
      }
    }
  });