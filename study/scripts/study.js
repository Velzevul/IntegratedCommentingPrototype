(function(window) {
  'use strict';

  var rootUrl;

  if (typeof(DEVELOPMENT) === 'undefined') {
    rootUrl = '//vdziubak.com/integratedCommentingStudy/';
  } else {
    rootUrl = '//localhost:3000/';
  }

  var app = angular.module('study', ['logger']);

  app.controller('studyController', function(LoggerService, $scope, $window) {
    LoggerService.setStage('selecting');

    $scope.data = LoggerService.getData();

    $scope.submit = function(e) {
      var valid = $scope.data.participantId && $scope.data.interface &&
                  ($scope.data.session === 'training' || $scope.data.clutter && $scope.data.content);

      if (valid) {
        var urlParams = [],
            trainingContent = {
              'heatmap': 'eggplant',
              'integrated': 'fritware',
              'paragraph': 'chimney'
            };

        if ($scope.data.session === 'training') {
          $scope.data.content = trainingContent[$scope.data.interface];
          $scope.data.clutter = 'off';
        }

        LoggerService.setData({
          participantId: $scope.data.participantId,
          session: $scope.data.session,
          interface: $scope.data.interface,
          content: $scope.data.content,
          clutter: $scope.data.clutter
        });
        LoggerService.log('start reading stage');
        LoggerService.setStage('reading');

        $window.location.href = rootUrl + '#/reading';
      } else {
        alert('please, set all the values first');
      }
    };
  });

  window.study = app;
})(window);
