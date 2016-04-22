(function(window) {
  'use strict';

  var app = angular.module('study', ['logger']);

  app.controller('studyController', function($scope, LoggerService) {
    $scope.data = LoggerService.getData();

    $scope.submit = function(e) {
      var valid = $scope.data.participantId && $scope.data.interface &&
                  ($scope.data.session === 'training' ||
                   ($scope.data.content && $scope.data.clutter));

      if (valid) {
        alert('redirect to url');
        LoggerService.setData({
          participantId: $scope.data.participantId,
          session: $scope.data.session,
          interface: $scope.data.interface,
          content: $scope.data.content,
          clutter: $scope.data.clutter,
        });
        LoggerService.log('starting session');
      } else {
        alert('please, set all the values first');
      }
    };
  });

  window.study = app;
})(window);
