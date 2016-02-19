angular.module('comments')
  .directive('selectAnchor', function(SelectionService, ContextualCommentsService, HeatmapService, $compile) {
    'use strict';

    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        $(elem).mousedown(function(e) {
          if ($scope.activeTab == 'contextual') {
            SelectionService.clearSelection();
          }
        });

        $(elem).mouseup(function(e) {
          if ($scope.activeTab == 'contextual') {
            SelectionService.storeSelection();
          }

          if ($scope.selectingContext) {
            ContextualCommentsService.create();
            $scope.selectingContext = false;
          }
        });

        $scope.$watch('contextualComments.length', function() {
          $compile(elem.contents())($scope);
          //reinitilize point to show on heat map
          HeatmapService.initilizeHeatmap();
          
          // debugger;
        });
      }
    };
  });
