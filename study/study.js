(function(window) {
  'use strict';

  var app = angular.module('study', ['logger']);

  app.controller('studyController', function(LoggerService, $scope, $window) {
    $scope.data = LoggerService.getData();

    $scope.submit = function(e) {
      var valid = $scope.data.participantId && $scope.data.interface &&
                  ($scope.data.session === 'training' ||
                   ($scope.data.content && $scope.data.clutter));

      if (valid) {
        LoggerService.setData({
          participantId: $scope.data.participantId,
          session: $scope.data.session,
          interface: $scope.data.interface,
          content: $scope.data.content,
          clutter: $scope.data.clutter,
        });
        LoggerService.log('session started');

        var urlParams = ['content=' + $scope.data.content, 'session=' + $scope.data.session, 'clutter=' + $scope.data.clutter],
            urlPath = '/#/' + $scope.data.interface;

        $window.location.href = urlPath + '?' + urlParams.join('&');
      } else {
        alert('please, set all the values first');
      }
    };
  });

  window.study = app;
})(window);
