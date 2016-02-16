angular.module('comments')
  .controller('commentsController', function($scope, ContextualCommentsService, SelectionService, GeneralCommentsService) {
    'use strict';

    //for testing 
    $scope.hidden = true;

    $scope.activeTab = false;
    $scope.activeComments = null;
    $scope.activeParagraph = null;

    $scope.filteredComments = null;
    // contextual comments
    $scope.contextualComments = ContextualCommentsService.getAll();

    // general comments
    $scope.generalComments = GeneralCommentsService.getAll();
    $scope.generalCommentFormShown = false;
    $scope.temp = [ContextualCommentsService.getOne(1)].concat(ContextualCommentsService.getOne(7)) ;

    //hard coded for paragraph 1(prototype)
    //finds all children of the paragraph with id "temp," which is a variable for the selected paragraph, and determines if the comments are in this paragraph
    $scope.filterPara1 = function(comment){
        var i = 0;
        var temp = document.getElementById($scope.activeParagraph);
        var children = angular.element(temp).children("[comment-anchor]");

        


        while(angular.element(temp).children().length > i){
            if(children[i].id == comment.id){
                return true
            } else {
                i++;
            }
        }
    };

    //watches for context change and selects correct note id's

    $scope.$watch('activeParagraph', function(value){
        var temp = document.getElementById(value);

        if($scope.activeTab == 'contextual'){
            $scope.activeComments = $('[comment-anchor]')
        }else if($scope.activeTab != 'general' && $scope.activeTab != false){
            $scope.activeComments = angular.element(temp).children();
        }
    });
  });
