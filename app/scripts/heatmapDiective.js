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

        $scope.$parent.$watch('activeLine', function(value, oldValue) {
          var heatmapDivs = $('[heatmap]');
          HeatmapService.initilizeDivs();
          if(value >= 0){
            //sets selected value to border
            heatmapDivs[value].style.border = "1px solid black";
            if( value - 1 >= 0 && heatmapDivs[value - 1].style.border != "" ){
              heatmapDivs[value - 1].style.border = "1px solid black";
            }
            if( value - 2 >= 0 && heatmapDivs[value - 2].style.border != ""  ){
              heatmapDivs[value - 2].style.border = "1px solid black";
            }
            if( value + 2 < heatmapDivs.length && heatmapDivs[value + 2].style.border != "" ){
              heatmapDivs[value + 2].style.border = "1px solid black";
            }
            if(value + 1 < heatmapDivs.length && heatmapDivs[value + 1].style.border != "" ){
              heatmapDivs[value + 1].style.border = "1px solid black";
            }
          }


        });
      }
    };
  });
