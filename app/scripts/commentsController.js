angular.module('comments')
  .controller('commentsController', function($scope, ContextualCommentsService, SelectionService, HeatmapService) {
    'use strict';

    $scope.activeTab = null;
    HeatmapService.initilize(79);
    $scope.activeLine = -5;
    $scope.activeComments = [];
    $scope.showFilterOptions = false;
    
    // contextual comments
    $scope.contextualComments = ContextualCommentsService.getAll();

    //simple object for lines
    $scope.setDivs = function(amount){
    	return new Array(amount);
    };
    
    $scope.filterLine = function(comment){
        var i = 0;
        var temp ;
        var children = $("[comment-active]");
        
        while(children.length > i){
            temp = children[i];
            //console.log($scope.activeLine == Math.ceil((angular.element(temp).prop('offsetTop') - 172) / 24))
            if( temp.id == comment.id ){
                return true
            } else {
                i++;
            }
        }
    }

    $scope.updateActiveComments = function(){
        //var line = Math.ceil((angular.element(temp).prop('offsetTop') - 172) / 24)
    }

  });
