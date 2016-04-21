angular.module('comments')
  .directive('optionsPanel', function( ContextualCommentsService, $timeout, HeatmapService) {
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
        $('article').mousedown(function(e){
            $scope.optionsPanel = false;          
        });

        $scope.toggleProf = function(){
          $scope.profInvolvement = !$scope.profInvolvement;
          $scope.showProfOnly = $scope.profInvolvement;
          if( $scope.showProfOnly == true ){
            $scope.activeTab = 'profOnly';
          } else {
            $scope.activeTab = 'contextual';
          }
        }

        $scope.search = function(){
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
        }             

        $scope.$watch('filterComments', function(filter){
          if( filter == '' ){
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