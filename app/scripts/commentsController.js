angular.module('comments')
  .controller('commentsController', function($scope, ContextualCommentsService, SelectionService, GeneralCommentsService) {
    'use strict';

    $scope.activeTab = null;

    // contextual comments
    $scope.contextualComments = ContextualCommentsService.getAll();

    // general comments
    $scope.generalComments = GeneralCommentsService.getAll();
    $scope.generalCommentFormShown = false;
  });