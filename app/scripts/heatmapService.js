angular.module('comments')
  .factory('HeatmapService', function(ContextualCommentsService) {
    'use strict';

    var heatmapIntensity;
    //sometimes this nu,ber is incorrect
    var topLevel = angular.element($('[first]')[0]).prop('offsetTop') + 24; 

    function initilizeHeatmap(size){
      var intensity = new Array(size);
      //initilize array to 0's
      for(var i = 0; i < size; i++){
        intensity[i] = 0;
      }

      return intensity;
    }

    function calculatePosition(currAnchor){
      var spot = Math.ceil((currAnchor - topLevel) / 24);
      return spot;
    }

    function profInvolved(){

    }

    function updateHeatmapColor(){
      var heatmapDivs = $('[heatmap]'),
          activeComments = $('[comment-anchor]'),
          relevantComments = $('[relevant-anchor]'),
          starAnchors = $('[teacherParticipation]');

      //hardcoded transparency models for now
      for(var i = 0; i < heatmapDivs.length;i++){
        if(1 == heatmapIntensity[i]){
          heatmapDivs[i].style.backgroundColor = "#7CFFFF";
        } else if(2 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#6CF2F2";
        } else if(3 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#5DE5E5";
        } else if(4 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#4DD8D8";
        } else if(5 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#3ECBCB";
        } else if(6 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#2EBEBE";
        } else if(7 == heatmapIntensity[i] ){
          heatmapDivs[i].style.backgroundColor = "#1FB1B1";
        } else if(heatmapIntensity[i] >= 8){
          heatmapDivs[i].style.backgroundColor = "#0FA4A4";
        } else if(heatmapIntensity[i] === true){
          heatmapDivs.innerText = "";
          heatmapDivs[i].style.pointerEvents = 'auto';
        } else {
          heatmapDivs[i].style.backgroundColor = "white";
          heatmapDivs[i].innerText = "";
          heatmapDivs[i].style.border ="";
        }

        if(heatmapIntensity[i] > 0 ){
          //heatmapDivs[i].innerText = heatmapIntensity[i];
          heatmapDivs[i].style.pointerEvents = 'auto';
          //heatmapDivs[i].style.border ="1px dashed black";

        } else {
          starAnchors[i].innerText = '';
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
          top = Math.floor((paragraphs[i].offsetTop - 120) / 24);
          total =  paragraphs[i].offsetHeight;
          iterations = total / 24;
          //total = bottom - top;

          
          while( iterations > 0 ){  
            if(heatmapIntensity[top] >= 1){
              heatmapDivs[top].style.border = "1px dashed black";
            }  
            //heatmapDivs[top].style.border = "1px dashed black";
            top++;
            iterations--;
          }
          //bottom = 
          //console.log(top, bottom)
        }
      },
      initilize: function(size){
        heatmapIntensity = initilizeHeatmap(size);

        var activeComments = $('[comment-anchor]'),
            starAnchors = $('[teacherParticipation]'),
            heatmapDivs = $('[heatmap]'),
            comments = ContextualCommentsService.getAll(),
            spot;

        ContextualCommentsService.loaded
          .then(function() {
            for(var i = 0; i < activeComments.length; i++){
              spot = calculatePosition(angular.element(activeComments[i]).prop('offsetTop'));
              if(ContextualCommentsService.profInvolvement(activeComments[i].id) && starAnchors[spot]){
                starAnchors[spot].innerHTML = "prof";
              }

              heatmapIntensity[spot]+= ContextualCommentsService.getOne(activeComments[i].id).replies.length + 1;
            }

            activeComments = $('[comment-active]');

            for( var i = 0 ; i < activeComments.length ; i++ ){
              spot = Math.ceil(calculatePosition(angular.element(activeComments[i]).prop('offsetTop')));
              //heatmapDivs[spot].style.border = "2px solid black";
            }
            
            updateHeatmapColor();
          });
      },

      getHeatmap: function(){
        return heatmapIntensity;
      },
      updateHeatmap: function(){
        updateHeatmapColor();
      },
      newAnchor: function(newAnchor){
        var spot = calculatePosition(newAnchor);

        heatmapIntensity[spot]++;
      }
    };
  });