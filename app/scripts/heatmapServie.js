angular.module('comments')
  .factory('HeatmapService', function(ContextualCommentsService) {
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

    function profInvolved(){

    }

    function updateHeatmapColor(){
      var heatmapDivs = $('[heatmap]'),
          relevantComments = $('[relevant-anchor]');

      //hardcoded transparency models for now
      for(var i = 0; i < heatmapDivs.length;i++){
        if(1 == heatmapIntensity[i]){
          heatmapDivs[i].style.backgroundColor = "rgba(228,68,36, 0.2)";
        } else if(2 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "rgba(228,68,36, 0.3)";
        } else if(3 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "rgba(228,68,36, 0.4)";
        } else if(4 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "rgba(228,68,36, 0.5)";
        } else if(5 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "rgba(228,68,36, 0.6)";
        } else if(6 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "rgba(228,68,36, 0.7)";
        } else if(7 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "rgba(228,68,36, 0.8)";
        } else if(heatmapIntensity[i] >= 8){
          heatmapDivs[i].style.backgroundColor = "rgba(228,68,36, 1)";
        } else if(heatmapIntensity[i] === true){
          heatmapDivs.innerText = "";
          heatmapDivs[i].style.pointerEvents = 'auto';
        } else {
          heatmapDivs[i].style.backgroundColor = "white";
          heatmapDivs.innerText = "";
        }

        if(heatmapIntensity[i] > 0){
          //heatmapDivs[i].innerText = heatmapIntensity[i];
          heatmapDivs[i].style.pointerEvents = 'auto';
        }

        //&#9733;
      }
    }

    return {
      initilizeDivs: function(){
        //set initial border
        var heatmapDivs = $('[heatmap]'),
          paragraphs = document.getElementsByTagName("p"),
          top,
          bottom,
          total,
          iterations;

        for( var i = 0; i < paragraphs.length; i++ ){
          top = Math.floor((paragraphs[i].offsetTop - 168) / 24);
          total =  paragraphs[i].offsetHeight;
          iterations = total / 24;
          //total = bottom - top;

          
          while( iterations > 0 ){    
            heatmapDivs[top].style.border = "1px dashed black";
            top++;
            iterations--;
          }
          //bottom = 
          //console.log(top, bottom)
        }
      },
      initilize: function(size){
        initilizeHeatmap(size);

        var activeComments = $('[comment-anchor]'),
            starAnchors = $('[teacherParticipation]');

        var spot;

        for(var i = 0; i < activeComments.length; i++){
          spot = calculatePosition(angular.element(activeComments[i]).prop('offsetTop'));
          if(ContextualCommentsService.profInvolvement(activeComments[i].id) && starAnchors[spot]){
            starAnchors[spot].innerHTML = "&#63743";
          }

          if(ContextualCommentsService.getOne(activeComments[i].id).score >= 5){
            heatmapIntensity[spot]++;
          } else if(heatmapIntensity[spot] == 0){
            heatmapIntensity[spot] = true;
          }
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
