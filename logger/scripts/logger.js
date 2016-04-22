(function(window) {
  var app = angular.module('logger', []);

  app.factory('LoggerService', function($http) {
    var serverUrl = 'http://localhost:5000/',
        lsPrefix = 'IntegratedCommentingStudy-';

    var getData = function() {
      var studyData = {
        participantId: localStorage.getItem(lsPrefix + 'participantId'),
        interface:     localStorage.getItem(lsPrefix + 'interface'),
        content:       localStorage.getItem(lsPrefix + 'content'),
        clutter:       localStorage.getItem(lsPrefix + 'clutter')
      };

      return studyData;
    };
    var setData = function(obj) {
      localStorage.setItem(lsPrefix + 'participantId', obj.participantId);
      localStorage.setItem(lsPrefix + 'interface', obj.interface);
      localStorage.setItem(lsPrefix + 'content', obj.content);
      localStorage.setItem(lsPrefix + 'clutter', obj.clutter);
    };

    return {
      log: function(message) {
        var payload = Object.assign({}, getData(), {
          message: message,
          createdAt: new Date().toString()
        });

        return $http.post(serverUrl + 'logs/', payload);
      },
      setData: function(obj) {
        setData(obj);
        console.log('data set', getData());
      },
      getData: getData
    };
  });

  window.logger = app;
})(window);
