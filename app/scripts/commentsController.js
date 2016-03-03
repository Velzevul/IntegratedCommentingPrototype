angular.module('comments')
  .controller('commentsController', function($scope, ContextualCommentsService, SelectionService, HeatmapService, InitialCommentsService) {
    'use strict';

    $scope.activeTab = 'contextual';
    HeatmapService.initilize(79);
    $scope.activeLine = -5;
    $scope.activeComments = [];
    $scope.showFilterOptions = false;
    $scope.relevantAnchors = new Array (79);
    $scope.optionsPanel = false;

    
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

    angular.element(document).ready(function(){
        HeatmapService.initilizeDivs();
    });

    $scope.setActiveLine = function(number){
        if(number != $scope.activeLine){
            $scope.activeLine = number;
        } else {
            $scope.activeLine = -5;
        }
    }

    InitialCommentsService.addRandomComments();
  });
