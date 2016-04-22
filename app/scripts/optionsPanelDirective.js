angular.module('comments')
  .directive('optionsPanel', function( ContextualCommentsService, $timeout, HeatmapService, LoggerService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/optionsPanel.html',
      controller: function($scope) {
        $scope.showOptions = true;
        $scope.profInvolvement = false;
        $scope.filterValue = '';
      },
      link: function($scope, elem, attrs) {
        $scope.search = function(){
          LoggerService.log('search for `' + $scope.filterComments + '`');

          if($scope.prototypeValue != 'heatmap'){
            $scope.filterValue = $scope.filterComments;
          } else {
            var temp = HeatmapService.getHeatmap();
            for( var i = 0; i < temp.length; i ++ ){
              temp[i] = 0;
            }
            $scope.filterValue = $scope.filterComments;
            $scope.newSearchValue = 0;
          }
        };

        $scope.$watch('filterComments', function(filter){
          if( filter == '' ){
            LoggerService.log('clear search');

            $scope.filterValue = '';
            if($scope.prototypeValue == 'heatmap'){
              //init heatmap here 
              HeatmapService.initilize(100);
            } else if($scope.prototypeValue == 'paragraph'){
              $scope.updateCommentButtonsNumber();
            }

          }
          
        });
      }
    };
  });