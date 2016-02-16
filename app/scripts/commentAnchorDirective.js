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


        $scope.$parent.$watch('activeTab', function(value) {
          var i = 0;
          var activeComments = $scope.$parent.activeComments;
          var found = false;

          if (value == 'contextual') {
              elem.addClass('document__anchor');
              elem.addClass('document__anchor--' + $scope.comment.color);
          }
           else if(value != 'general' && value != false){
            while(activeComments.length > i){
              if(activeComments[i].id == $scope.id){
                elem.addClass('document__anchor');
                elem.addClass('document__anchor--' + $scope.comment.color);
                found = true;
              }
              i++;
            }
             if( !found ){
                elem.removeClass('document__anchor');
                elem.removeClass('document__anchor--' + $scope.comment.color);
              }
          } else{
            elem.removeClass('document__anchor');
            elem.removeClass('document__anchor--' + $scope.comment.color);
         }
        });

        $scope.$watch('comment.isSelected', function(value) {
          if ($scope.$parent.activeTab == 'contextual') {
            if (value) {
              elem.addClass('document__anchor--selected');
            } else {
              elem.removeClass('document__anchor--selected');
            }
          }
        });

        $scope.$watch('comment.highlightedAnchor', function(value) {
          if ($scope.$parent.activeTab == 'contextual') {
            if (value) {
              elem.addClass('document__anchor--highlighted');
            } else {
              elem.removeClass('document__anchor--highlighted');
            }
          }
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
