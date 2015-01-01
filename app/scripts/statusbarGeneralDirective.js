angular.module('comments')
  .directive('statusbarGeneral', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'statusbarGeneral.html',
      controller: function($scope) {
        $scope.showGeneralCommentForm = function() {
          var commentsBody = $('.comments-sidebar');

          $scope.generalCommentFormShown = true;
          commentsBody.animate({'scrollTop': 0}, 100);
        };
      }
    };
  });