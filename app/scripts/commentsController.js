angular.module('comments')
  .controller('commentsController', function($scope, ContextualCommentsService, SelectionService, HeatmapService) {
    'use strict';

    $scope.activeTab = null;

    // contextual comments
    $scope.contextualComments = ContextualCommentsService.getAll();

    
    ContextualCommentsService.setDates();

    //heatmap testing

    //HeatmapService.initilizeHeatmap();

    $scope.$watch('contextualComments', function(){

    });

    //********************************************************
    //
    // SLIDER FUNCTIONALITY
    //
    //********************************************************
    
    //starting pos of sliders
    $scope.sliderMinMax = {
      min: 0,
      max: 50
    };

    //total slider value
    $scope.sliderValues = {
      min: 0,
      max: 50
    };

    $scope.hour = 60 * 60 * 1000;

    //sliders filter function ( test implementation )
    /*$scope.sliderFilter = function(comment){
      if( n >= $scope.sliderMinMax.min && n <= $scope.sliderMinMax.max){
        return true;
      } else if( $scope.sliderValues.max == $scope.sliderMinMax.max){
        return true;
      } else{
        return false;
      }
    };*/

    $scope.sliderFilter = function(comment){
      var dateNow = new Date();
      var dateComment = new Date(comment.postedOn);

      if( dateComment.getTime() <= ( dateNow.getTime() - $scope.sliderMinMax.min * $scope.hour ) && dateComment.getTime() >= ( dateNow.getTime() - $scope.sliderMinMax.max * $scope.hour )){
        return true;
      } else{
        return false;
      }
    };

    //for filtering when max time has changed
    $scope.$watchGroup(['sliderMinMax.max', 'sliderMinMax.min'], function(){
        //$scope.filter($scope.sliderMinMax.max);
        if( $scope.sliderValues.max == $scope.sliderMinMax.max && $scope.sliderValues.min == $scope.sliderMinMax.min ){

        } else {

        }

    });

  });
