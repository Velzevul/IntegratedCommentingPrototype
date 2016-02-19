angular.module('comments')
  .factory('HeatmapDirective', function() {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/heatmap.html',
      controller: function($scope){
      }
      /*link: 
        function(scope, ele, attr){
          console.log("yah");
          scope.heatmapInstance = h337.create({
          container: ele.find('div')[0]
        });
        scope.heatmapInstance.setData(scope.data);
       }
     }*/
  }
}); 
