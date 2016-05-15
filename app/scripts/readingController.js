angular.module('comments')
  .controller('readingController', function($scope, $interval, $window, $http, $routeParams, LoggerService, rootPrefix) {
    'use strict';

    var data = LoggerService.getData();

    var content = {
      integrated: data.session === 'training' ? 'frit' : data.content,
      paragraph:  data.session === 'training' ? 'chimney' : data.content,
      heatmap:    data.session === 'training' ? 'eggplant' : data.content
    };
    
    $http.get(rootPrefix + '/data/' + content[data.interface] + '.json')
      .then(function(response) {
        $scope.title = response.data.title;
        $scope.paragraphs = response.data.paragraphs;
      });

    $interval(function() {
      $scope.stage = LoggerService.getStage();
    }, 100);


    $scope.$watch('stage', function(value) {
      if (value === 'answering') {
        var urlParams = ['content=' + data.content, 'clutter=' + data.clutter, 'session=' + data.session];

        $window.location.href = rootPrefix + '#/' + data.interface + '?' + urlParams.join('&');
      }
    });
  });