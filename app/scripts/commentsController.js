angular.module('comments')
  .controller('commentsController', function($scope, $route, ContextualCommentsService, SelectionService, InitialCommentsService) {
    'use strict';
     
    $scope.prototypeValue = null;
    
     $scope.deselectAllComments = function($event) {
        var isContextualComment = $($event.target).parents('.thread-contextual').length,
            isAnchor = $event.target.tagName.slice(0,4) == 'NOTE';

        if (!isContextualComment && !isAnchor) {
            ContextualCommentsService.deactivateAll();
        }
    };
    
  });