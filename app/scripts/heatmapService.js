angular.module('comments')
  .factory('HeatmapService', function() {
    'use strict';

    var heatmapIntensity;
    var topLevel = angular.element($('[comment-anchor]')[0]).prop('offsetTop');

    function initilizeHeatmap(size){
      heatmapIntensity = new Array(size);
      //initilize array to 0's
      for(var i = 0; i < size; i++){
        heatmapIntensity[i] = 0;
      }

    }

    function calculatePosition(currAnchor){
      var spot = Math.ceil((currAnchor - topLevel) / 24);
      return spot;
    }

    function updateHeatmapColor(){
      var heatmapDivs = $('[heatmap]');

      //hardcoded transparency models for now
      for(var i = 0; i < heatmapDivs.length;i++){
        if(1 == heatmapIntensity[i]){
          heatmapDivs[i].style.backgroundColor = "#B2F7C1";
        } else if(2 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#71FB86";
        } else if(3 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#30FF4C";
        } else if(4 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#75FF3C";
        } else if(5 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#BAFF2C";
        } else if(6 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#FFFF1C";
        } else if(7 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#FC7F0E";
        } else if(heatmapIntensity[i] >= 8){
          heatmapDivs[i].style.backgroundColor = "#FA0000";
        } else {
          //0 comments
          heatmapDivs[i].style.backgroundColor = "#f4f4fc";
          heatmapDivs.innerText = "";
        }

        if(heatmapIntensity[i] > 0){
          //heatmapDivs[i].innerText = heatmapIntensity[i];
          heatmapDivs[i].style.pointerEvents = 'auto';
        }
      }
    }

    return {
      initilize: function(size){
        initilizeHeatmap(size);

        var activeComments = $('[comment-anchor]');
        var spot;

        for(var i = 0; i < activeComments.length; i++){
          spot = calculatePosition(angular.element(activeComments[i]).prop('offsetTop'));
          heatmapIntensity[spot]++;
        }

        updateHeatmapColor();
      },

      getHeatmap: function(){
        return heatmapIntensity;
      },

      newAnchor: function(newAnchor){
        var spot = calculatePosition(newAnchor);

        heatmapIntensity[spot]++;
        console.log(heatmapIntensity)
      }
    };
  });
