angular.module('comments')
  .directive('statusbarGeneral', function(GeneralCommentsService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/statusbarGeneral.html',
      controller: function($scope) {
        if (!$scope.generalStats) {
          $scope.stats = GeneralCommentsService.stats();
        }

        $scope.showGeneralCommentForm = function() {
          var commentsBody = $('.comments-sidebar');

          $scope.generalCommentFormShown = true;
          commentsBody.animate({'scrollTop': 0}, 100);
        };
      }
    };
  });