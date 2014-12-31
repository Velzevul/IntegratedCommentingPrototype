angular.module('comments')
  .directive('generalCommentForm', function(GeneralCommentsService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'generalCommentForm.html',
      scope: {
        visibilitySwitcher: '='
      },
      controller: function($scope) {
        $scope.postComment = function() {
          if ($scope.commentText) {
            GeneralCommentsService.create($scope.commentText);
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