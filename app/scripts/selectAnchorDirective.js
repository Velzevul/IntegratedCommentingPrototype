angular.module('comments')
  .directive('selectAnchor', function(SelectionService, ContextualCommentsService, $compile) {
    'use strict';

    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        // to add comments uncomment this
       /* $(elem).mousedown(function(e) {
          //if ($scope.activeTab == 'contextual') {
            SelectionService.clearSelection();
          //}
        });

        $(elem).mouseup(function(e) {
          //if ($scope.activeTab == 'contextual') {
            SelectionService.storeSelection();
          //}

          if ($scope.selectingContext) {
            ContextualCommentsService.create();
            $scope.selectingContext = false;
          }
        });*/

        $scope.$watch('contextualComments.length', function() {
          $compile(elem.contents())($scope);
          if($scope.prototypeValue == 'heatmap'){
            //init heatmap here if you need to add comments
          }
        });
      }
    };
  });