angular.module('comments')
  .factory('HeatmapService', function(ContextualCommentsService) {
    'use strict';

    var heatmapInstance = h337.create({
      container: document.getElementById("test")
    });

    return{
      initilizeHeatmap: function(){
          var activeComments = $('[comment-anchor]');
          var points =[];
          var len = activeComments.length - 1;
          var max = 0;

          //console.log(height);
          while (len >= 0) {
            var val = ContextualCommentsService.getViews(activeComments[len].id);
            max = Math.max(max, val);
            var point = {
              x: 0,
              y: angular.element(activeComments[len]).prop('offsetTop') + 24,
              value: val
            };
            points.push(point);
            len--;
          }

          //console.log(points);
          // heatmap data format
          var passed_data = { 
            max: max, 
            data: points 
          };

          heatmapInstance.setData(passed_data);
      },

      updateHeatmap: function(yValue){
        var point ={
          x: 0,
          y: yValue,
          value: 100
        };
        heatmapInstance.addData(point);
      }
    };
});
