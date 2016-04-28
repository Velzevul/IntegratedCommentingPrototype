angular.module('comments')
  .controller('integratedController', function($scope, $routeParams, $q, ContextualCommentsService, SelectionService, InitialCommentsService, LoggerService) {
    'use strict';
    // contextual comments

    $scope.experimentStarted = false;
    $scope.startExperiment = function() {
      $scope.experimentStarted = true;
      localStorage.setItem('IntegratedCommentingStudy-started', true);
      LoggerService.log('experiment started');
    };

    var params = LoggerService.getData();
    
    ContextualCommentsService.loaded
      .then(function() {
        ContextualCommentsService.setMock(params.content, params.clutter);
        $scope.contextualComments = ContextualCommentsService.getAll();

        //positions comments correctly after document is ready
        angular.element(document).ready(function(){
            ContextualCommentsService.deactivateAll();
            //ContextualCommentsService.reposition();
        });
      });
    //should be a true/false value
    $scope.$parent.prototypeValue = 'integrated';

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
  .controller('heatmapController', function($scope, $routeParams, $q, ContextualCommentsService, SelectionService, HeatmapService, InitialCommentsService, LoggerService){
    'use strict';

    var params = LoggerService.getData();

    $scope.experimentStarted = false;
    $scope.startExperiment = function() {
      $scope.experimentStarted = true;
      localStorage.setItem('IntegratedCommentingStudy-started', true);
      LoggerService.log('experiment started');
    };

    ContextualCommentsService.loaded
      .then(function() {
          ContextualCommentsService.setMock(params.content, params.clutter);
          $scope.contextualComments = ContextualCommentsService.getAll();
          $scope.relevantAnchors = new Array (79);
          HeatmapService.initilize(100);
          $scope.showProfOnly = false;
          // angular.element(document).ready(function(){
          //
          // });
          //search value stops the heatmap from doubling
          $scope.newSearchValue = -1;
      });

    $scope.activeLines = [];
    $scope.$parent.prototypeValue = 'heatmap';
    // $scope.cluttered = $routeParams.clutter;

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
        LoggerService.log('deactivate heatmap line #' + number + ' (' + HeatmapService.getHeatmap()[number] + ' comments)');
        //need to remove line
        $scope.activeLines.splice(index, 1);
      } else {
        LoggerService.log('activate heatmap line #' + number + ' (' + HeatmapService.getHeatmap()[number] + ' comments)');
        // need to add line
        $scope.activeLines.push(number);
      }
    }
  });

angular.module('comments')
  .controller('paragraphController', function($scope, $routeParams, $q, ContextualCommentsService, SelectionService, InitialCommentsService, LoggerService) {
    'use strict';

    $scope.experimentStarted = false;
    $scope.startExperiment = function() {
      $scope.experimentStarted = true;
      localStorage.setItem('IntegratedCommentingStudy-started', true);
      LoggerService.log('experiment started');
    };

    var params = LoggerService.getData();

    ContextualCommentsService.loaded
      .then(function() {
          ContextualCommentsService.setMock(params.content, params.clutter);
          $scope.contextualComments = ContextualCommentsService.getAll();
          $scope.activeTab = false;
          $scope.activeComments = null;
          $scope.initlizeButtons();
      });

    $scope.$parent.prototypeValue = 'paragraph';
    $scope.cluttered = $routeParams.clutter;

    $scope.activeTab = false;

    //this variable is for showing paragraph bubbles, should be merged into one variable with activetab
    $scope.activeParagraph = false;
    $scope.shownParagraphs = [];

    $scope.filteredComments = null;


    //** All code under this line should probably be in a pargraphService.js file **

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
                if(num == 0){
                    $(buttons[i]).parent().parent().hide();
                } else {
                    $(buttons[i]).parent().parent().show();
                }
            }
        } else {
            var num,
                attr = $(this).attr('document__anchor');


            for( var i = 0;  i < buttons.length; i++ ){
                num = 0;
                for( var j = 0; j < paragraph[i].children.length; j++ ){
                    if($(paragraph[i].children[j]).hasClass( 'comment-contains' )){
                        tempComment = ContextualCommentsService.getOne(paragraph[i].children[j].id);
                        num = num + 1 + tempComment.replies.length;
                    }
                }
                buttons[i].innerText = num;

                if(num == 0){
                    $(buttons[i]).parent().parent().hide();
                } else {
                    $(buttons[i]).parent().parent().show();
                }
                num = 0;

            }
        }
    };

    //watches for context change and selects correct note id's

    $scope.$watch('activeTab', function(value){
      var index = $scope.shownParagraphs.indexOf(value);

      LoggerService.log('clicked paragraph #' + value);

      if( index >= 0 ){
          //need to remove line
          $scope.shownParagraphs.splice(index, 1);
      } else {
          // need to add line
          $scope.shownParagraphs.push(value);
      }
    });
  });
