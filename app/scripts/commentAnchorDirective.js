angular.module('comments')
  .directive('commentAnchor', function(ContextualCommentsService) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        id: '='
      },
      link: function($scope, elem, attrs) {
        $scope.comment = ContextualCommentsService.getOne($scope.id);

        $scope.$parent.$watch('activeLine', function(value) {
          //console.log(elem.prop('id') ==  1)
        
          if( value <= (Math.ceil((angular.element(elem).prop('offsetTop')-172)/24)) +2
              && value >= (Math.ceil((angular.element(elem).prop('offsetTop')-172)/24)) -2){
            elem.addClass('document__anchor');
            elem.addClass('document__anchor--' + $scope.comment.color + $scope.comment.score);
            elem.attr('comment-active', false);
            if($scope.$parent.activeComments.indexOf(elem.prop('id')) == -1){
              $scope.$parent.activeComments.push(elem.prop('id'));
            }
            if($scope.comment.hasInstructor){
              elem.addClass('document__anchor--teacher');
            }
            console.log()
          } else {
            elem.removeClass('document__anchor');
            elem.removeClass('document__anchor--' + $scope.comment.color + $scope.comment.score);
            elem.removeClass('document__anchor--' + $scope.comment.color);
            elem.removeAttr('comment-active', false);
            if($scope.comment.hasInstructor){
              elem.removeClass('document__anchor--teacher');
            }
            var index = $scope.$parent.activeComments.indexOf(elem.prop('id'));
            if(index != -1){
              $scope.$parent.activeComments.splice(index, 1); 
            }
          }

          ContextualCommentsService.reposition();
        });

        $scope.$watch('comment.isSelected', function(value) {
          //if ($scope.$parent.activeLine == (Math.ceil((angular.element(elem).prop('offsetTop')-172)/24))) {
            if (value) {
              elem.addClass('document__anchor--selected');
            } else {
              elem.removeClass('document__anchor--selected');
            }
          //}
        });

        $scope.$watch('comment.highlightedAnchor', function(value) {
         // if ($scope.$parent.activeLine == (Math.ceil((angular.element(elem).prop('offsetTop')-172)/24))) {
            if (value) {
              elem.addClass('document__anchor--highlighted');
            } else {
              elem.removeClass('document__anchor--highlighted');
            }
          //}
        });

        $(elem).click(function() {
          if (!$scope.comment.isSelected) {
            ContextualCommentsService.activate($scope.id);
            $scope.$apply()
          }
        });

        $(elem).hover(function() {
          $scope.comment.highlightedAnchor = true;
          $scope.comment.isHighlighted = true;
          $scope.$apply();
        }, function() {
          $scope.comment.highlightedAnchor = false;
          $scope.comment.isHighlighted = false;
          $scope.$apply();
        });
      }
    }
  });
