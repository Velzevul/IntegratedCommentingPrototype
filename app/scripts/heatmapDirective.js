angular.module('comments')
  .directive('heatmap', function(HeatmapService) {
    'use strict';

    return {
      scope: {
      },
      link: function($scope, elem, attrs) {
        $(document).mousemove(function(e){
          var relevantComments = $('[relevant-anchor]'),
              heatmapIntensity = HeatmapService.getHeatmap(),
              yValue = e.pageY,
              position,
              value = $scope.$parent.activeLine;

          for( var i = 0; i < relevantComments.length; i++){
            position = angular.element(relevantComments[i]).prop('offsetTop') ;
            if(yValue > position - 54 && yValue < position + 64){
              if(heatmapIntensity[i] !== true && heatmapIntensity[i] > 0){
                relevantComments[i].innerText = heatmapIntensity[i];
              }
            } else if( (value <= i + 2) && (value >= i - 2 )){
              if(heatmapIntensity[i] !== true && heatmapIntensity[i] != 0)
                relevantComments[i].innerText = heatmapIntensity[i];
            } else { 
              relevantComments[i].innerText = "";
            }
          }
        });

        $scope.$parent.$watch('activeLines', function(value, oldValue) {
          var heatmapDivs = $('[heatmap]'),
              activeLines = value;

          //clears heatmap of borders and then selectively adds them back
          for( var i = 0; i < heatmapDivs.length; i++ ){
            heatmapDivs[i].style.border = "";
          }

          for( var i = 0; i < activeLines.length; i++ ){
            heatmapDivs[activeLines[i]].style.border = "2px solid black";
          }

        }, true);
      }
    };
  });