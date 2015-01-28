angular.module('comments')
  .directive('developerToolbar', function(DevParametersService, ContextualCommentsService, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/developerToolbar.html',
      scope: {},
      controller: function($scope) {
        $scope.isHidden = true;
        $scope.params = DevParametersService.getParams();
        $scope.reposition = ContextualCommentsService.reposition;
        $scope.documentFontSize = 14;
        $scope.commentFontSize = 13;
        $scope.unseenIndicatorColor = '#FFFFBC';
      },
      link: function($scope, elem, attrs) {
        var document,
            comments,
            unseenIndicators;

        // waiting for comments to be initialized and positioned
        $timeout(function() {
          document = $('.document'),
          comments = $('.thread-contextual, .thread-general'),
          unseenIndicators = $('.tc-unseen__item, .tg-unseen__item');
        });

        $scope.changeDocumentFontSize = function() {
          document.css({'font-size': $scope.documentFontSize + 'px'});
        }

        $scope.changeCommentFontSize = function() {
          comments.css({'font-size': $scope.commentFontSize + 'px'});

          $timeout(function() {
            $scope.reposition();
          });
        }

        $scope.changeUnseenIndicatorColor = function() {
          unseenIndicators.css({'background-color': $scope.unseenIndicatorColor});
        }
      }
    };
  });