angular.module('comments')
  .controller('learningController', function($scope, $routeParams, $q, ContextualCommentsService, SelectionService, InitialCommentsService) {
    'use strict';

    ContextualCommentsService.setMock($routeParams.content, false, true);
    $scope.contextualComments = ContextualCommentsService.getAll();

    $scope.$parent.prototypeValue = $routeParams.prototype;

  });