angular.module('comments')
  .directive('optionsPanel', function( ContextualCommentsService, UserService, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/optionsPanel.html',
      controller: function($scope) {
        $scope.showOptions = true;
      },
      link: function($scope, elem, attrs) {
        $('article').mousedown(function(e){
            $scope.optionsPanel = false;          
        });
      }
    };
  });
