angular.module('comments')
  .controller('integrated-controller', function($scope, $routeParams, $q, ContextualCommentsService, SelectionService, InitialCommentsService) {
    'use strict';
    // contextual comments

    $q.all([
        ContextualCommentsService.loaded
    ])    
        .then(function() {
            ContextualCommentsService.setMock($routeParams.content, $scope.cluttered);
            $scope.contextualComments = ContextualCommentsService.getAll();
            $scope.activeTab = 'contextual';
            //ContextualCommentsService.printMock();
            //positions comments correctly after document is ready
            angular.element(document).ready(function(){
                ContextualCommentsService.deactivateAll();
                ContextualCommentsService.reposition();
            });
        });
    //should be a true/false value
    $scope.cluttered = $routeParams.clutter;
    $scope.$parent.prototypeValue = 'integrated';
    $scope.optionsPanel = false;

    //for filtering comments to selectively show whatever anchor is active
    $scope.filterLine = function(comment){
        var i = 0;
        var temp ;
        var children = $("[comment-active]");
        
        while(children.length > i){
            temp = children[i];
            if( temp.id == comment.id ){
                return true
            } else {
                i++;
            }
        }
    }
  });

angular.module('comments')
  .controller('heatmap-controller', function($scope, $routeParams, $q, ContextualCommentsService, SelectionService, HeatmapService, InitialCommentsService){
    'use strict';

    $q.all([
        ContextualCommentsService.loaded
    ])    
        .then(function() {
            ContextualCommentsService.setMock($routeParams.content, $scope.cluttered);
            $scope.contextualComments = ContextualCommentsService.getAll();
            $scope.activeTab = 'contextual';
            HeatmapService.initilize(100);
            console.log('loaded ' + $scope.contextualComments.length + ' comments');
            $scope.activeLine = -5;
            $scope.showProfOnly = false;
            $scope.relevantAnchors = new Array (79);
            $scope.optionsPanel = false;
            $scope.newSearchValue = -1;
        });
    $scope.activeLines = [];
    $scope.$parent.prototypeValue = 'heatmap';
    $scope.cluttered = $routeParams.clutter;

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
            if( temp.id == comment.id ){
                return true
            } else {
                i++;
            }
        }
    }

    $scope.setActiveLine = function(number){
        var index = $scope.activeLines.indexOf(number);

        if( index >= 0 ){
            //need to remove line
            $scope.activeLines.splice(index, 1);
        } else {
            // need to add line
            $scope.activeLines.push(number);
        }
    }
  });

angular.module('comments')
  .controller('paragraph-controller', function($scope, $routeParams, $q, ContextualCommentsService, SelectionService, InitialCommentsService) {
    'use strict';

    $q.all([
        ContextualCommentsService.loaded
    ])    
        .then(function() {
            ContextualCommentsService.setMock($routeParams.content, $scope.cluttered);
            $scope.contextualComments = ContextualCommentsService.getAll();
            $scope.activeTab = false;
            $scope.activeComments = null;
            $scope.initlizeButtons();
        });

    $scope.$parent.prototypeValue = 'paragraph';
    $scope.cluttered = $routeParams.clutter;
    $scope.activeTab = false;
    $scope.activeParagraph = false;

    $scope.filteredComments = null;


    var buttons = $('[comment-buttons]'),
        paragraph = $('[paragraph]');

    //initlize buttons
    $scope.initlizeButtons = function(){
        var tempComment,
            profInclusion = $('[teacher]');

        for( var i = 0; i < profInclusion.length; i++){
            //<span class="profbubble">prof</span>
            for( var j = 0; j < paragraph[i].children.length; j++ ){
                tempComment = ContextualCommentsService.getOne(paragraph[i].children[j].id);
                if(tempComment.hasInstructor){
                    profInclusion[i].innerText = 'prof';
                    $(profInclusion[i]).addClass('profbubble');
                }
            }
        }
    }

    $scope.filterPara1 = function(comment){
        var i = 0;
        var temp ;
        var children = $("[comment-active]");
        
        while(children.length > i){
            temp = children[i];
            if( temp.id == comment.id ){
                return true
            } else {
                i++;
            }
        }
    };

    $scope.updateCommentButtonsNumber = function(){
        if($scope.filterComments == undefined || $scope.filterComments == '' ){
            for( var i = 0;  i < buttons.length; i++ ){
                var num = 0,
                tempComment;

                for( var j = 0; j < paragraph[i].children.length; j++ ){
                    tempComment = ContextualCommentsService.getOne(paragraph[i].children[j].id);
                    num = num + 1 + tempComment.replies.length;
                }

                buttons[i].innerText = num;
            } 
        } else {
            var num,
                attr = $(this).attr('document__anchor');


            for( var i = 0;  i < buttons.length; i++ ){
                num = 0;
                for( var j = 0; j < paragraph[i].children.length; j++ ){
                    if($(paragraph[i].children[j]).hasClass( "comment-contains" )){
                        tempComment = ContextualCommentsService.getOne(paragraph[i].children[j].id);
                        num = num + 1 + tempComment.replies.length;
                    }
                }
                buttons[i].innerText = num;
                num = 0;
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