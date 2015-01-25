angular.module('comments')
  .directive('contextualCommentForm', function(ContextualCommentsService) {
    'use strict';

    return {
      scope: {
        comment: '='
      },
      restrict: 'E',
      templateUrl: 'templates/contextualCommentForm.html',
      replace: true,
      controller: function($scope) {
        $scope.selectComment = function() {
          if (!$scope.comment.isSelected) {
            ContextualCommentsService.activate($scope.comment.id);
          }
        };

        $scope.saveComment = function() {
          if ($scope.tempText) {
            $scope.comment.text = $scope.tempText;
          }
        };

        $scope.deleteComment = function() {
          ContextualCommentsService.delete($scope.comment);
        };
      },
      link: function($scope, elem, attrs) {
        var textarea = elem.find('textarea');

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

        textarea.on('keypress', function() {
          ContextualCommentsService.reposition();
        });
      }
    };
  });