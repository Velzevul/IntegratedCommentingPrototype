angular.module('comments')
  .directive('commentAnchor', function(ContextualCommentsService, HeatmapService) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        id: '='
      },
      /*
      * IMPORTANT NOTE
      * There are undefined comments as the web page is waiting for the AJAX call to finish,
      * and this has been crudely taken care off with checks ot $scope.comment
      */
      link: function($scope, elem, attrs) {
        ContextualCommentsService.loaded
          .then(function() {
            $scope.comment = ContextualCommentsService.getOne($scope.id);

            $scope.$parent.$watchGroup(['activeTab', 'filterValue', 'activeLines.length'], function(value, value2, scope) {
              //console.log(elem.prop('id') ==  1)
              
              if($scope.$parent.prototypeValue == 'integrated'){
                var filterValue = value[1];
                if(filterValue === undefined || filterValue === ''){
                  addClasses();
                } else {
                  if($scope.comment && $scope.comment.text.toLowerCase().indexOf(filterValue.toLowerCase()) != -1){
                    addClasses();
                  } else {
                    removeClasses();
                  }
                }
              } else if($scope.$parent.prototypeValue == 'heatmap'){
                var valueActiveLine = $scope.$parent.activeLines,
                    filterValue = value[1],
                    heatmapIntensity = HeatmapService.getHeatmap(),
                    spot = Math.floor((angular.element(elem).prop('offsetTop')-120)/24) ;

                if(filterValue === undefined || filterValue == '' ){
                  if( value[1] != true && valueActiveLine.indexOf(spot) >= 0 ){
                    addClasses();
                  } else {
                    removeClasses();
                  }
                } else{
                  $scope.$parent.showProfOnly = false;
                  $scope.$parent.onlyProf = false;
                  if($scope.comment && $scope.$parent.newSearchValue >= 0){
                    //this stops the heatmap from doubling
                    $scope.$parent.newSearchValue++;
                  }
                  if($scope.comment && $scope.comment.text.toLowerCase().indexOf(filterValue.toLowerCase()) != -1){
                    if($scope.$parent.newSearchValue >= 0){
                      heatmapIntensity[spot]++;
                    }
                    if(valueActiveLine.indexOf(spot) >= 0 ){
                      addClasses();
                    } else {
                      removeClasses();
                    }
                  } else {
                    removeClasses();
                  }
                }
                
                if($scope.$parent.contextualComments && $scope.$parent.newSearchValue == $scope.$parent.contextualComments.length){
                  $scope.$parent.newSearchValue = -1;
                }
                HeatmapService.updateHeatmap('commentAnchor');
              } else if($scope.$parent.prototypeValue == 'paragraph'){
                var valueActiveTab = value[0],
                    filterValue = value[1];

                  if(filterValue === undefined || filterValue == ''){
                    if (  elem[0].parentElement.id == valueActiveTab ){
                      addClasses();
                    } else {
                      removeClasses();
                    }
                  } else{
                    //filter anchors
                    if($scope.comment && $scope.comment.text.toLowerCase().indexOf(filterValue.toLowerCase()) != -1){              
                      elem.addClass('comment-contains', false);
                      if (  elem[0].parentElement.id == valueActiveTab ){
                        addClasses();
                      } else {
                        removeClasses();
                      }
                    } else {
                      removeClasses();
                      elem.removeClass('comment-contains', false);
                    }

                  }
                $scope.$parent.updateCommentButtonsNumber()
              }

              ContextualCommentsService.reposition();
            });

            function removeClasses(){
              elem.removeClass( 'document__anchor' );
              elem.removeClass( 'document__anchor--teal' );
              elem.removeClass( 'document__anchor--num' )
              elem.removeAttr( 'comment-active', false );
            }

            function addClasses(){
              //add number to anchors( +1 because you need to add parent comment )
              var num
              if($scope.comment){
                num = $scope.comment.replies.length + 1;
              }

              elem.addClass( 'document__anchor' );
              elem.addClass( 'document__anchor--teal' );
              elem.addClass( 'document__anchor--num' )
              elem.attr( 'comment-active', false );

              if( $scope.comment && $scope.comment.hasInstructor ){
                elem.attr( 'data-content', num + ", prof" );
              } else {
                elem.attr( 'data-content', num );
              }
            }

            $scope.$watch('comment.isSelected', function(value) {
              if ($scope.$parent.activeTab == 'contextual') {
                if (value) {
                  elem.addClass('document__anchor--selected');
                } else {
                  elem.removeClass('document__anchor--selected');
                }
              }
            });

            $scope.$watch('comment.highlightedAnchor', function(value) {
              if ($scope.$parent.activeTab == 'contextual') {
                if (value) {
                  elem.addClass('document__anchor--highlighted');
                } else {
                  elem.removeClass('document__anchor--highlighted');
                }
              }
            });

            $(elem).click(function() {
              if ($scope.comment && !$scope.comment.isSelected) {
                ContextualCommentsService.activate($scope.id);
                $scope.$apply()
              }
            });

            $(elem).hover(function() {
              if($scope.comment){
                $scope.comment.highlightedAnchor = true;
                $scope.comment.isHighlighted = true;
                $scope.$apply();
              }
            }, function() {
              if($scope.comment){
                $scope.comment.highlightedAnchor = false;
                $scope.comment.isHighlighted = false;
                $scope.$apply();
              }
            });
          });
      }
    }
  });