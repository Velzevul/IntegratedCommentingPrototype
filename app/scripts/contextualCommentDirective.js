angular.module('comments')
  .directive('contextualComment', function(ContextualCommentsService, UserService, LoggerService) {
    'use strict';

    return {
      scope: {
        comment: '='
      },
      restrict: 'E',
      templateUrl: 'templates/contextualComment.html',
      replace: true,
      controller: function($scope) {
        $scope.currentUser = UserService.getCurrent();

        $scope.selectComment = function() {
          if (!$scope.comment.isSelected) {
            LoggerService.log('click comment #' + $scope.comment.id);
            ContextualCommentsService.activate($scope.comment.id);
          }
        };

        $scope.markSeen = function(comment, parent) {
          if ((comment.isSelected) || (parent && parent.isSelected)) {
            if (!comment.seen) {
              ContextualCommentsService.markAsSeen(comment, parent);
            }
          }
        };
      },
      link: function($scope, elem, attrs) {
        elem.addClass('thread-contextual--' + $scope.comment.color);

        $(elem).hover(function() {
          $scope.comment.highlightedAnchor = true;
          $scope.$apply();
        }, function() {
          $scope.comment.highlightedAnchor = false;
          $scope.$apply();
        });

        $scope.$watch('comment.position', function(value) {
          elem.css('top', value);
        });
      }
    }
  });