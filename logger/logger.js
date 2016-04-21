(function(window) {
  var app = angular.module('logger', [])

  app.factory('LoggerService', function($q) {
    var serverUrl = '//vdziubak.com:8000';

    var studyData = {
      participantId: null,
      session: '',
      interface: '',
      content: '',
      clutter: null
    };

    var log = function(message) {
      var payload = Object.assign({}, studyData, {
            timestamp: new Date().toString(),
            message: message
          });
          
      console.log(payload);
      // $q.post(serverUrl + '/logs', payload);
    };

    return {
      studyData: studyData,
      log: log
    };
  });

  window.logger = app;
})(window);
