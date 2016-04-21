(function(window) {
  var app = angular.module('logger', []);

  app.factory('LoggerService', function($q) {
    var serverUrl = '//vdziubak.com:8000',
        lsPrefix = 'IntegratedCommentingStudy-';

    return {
      log: function(message) {
        studyData = {
          participantId: localStorage.getItem(lsPrefix + 'participantId'),
          session:       localStorage.getItem(lsPrefix + 'session'),
          interface:     localStorage.getItem(lsPrefix + 'interface'),
          content:       localStorage.getItem(lsPrefix + 'content'),
          clutter:       localStorage.getItem(lsPrefix + 'clutter')
        };
        var payload = Object.assign({}, studyData, {
              timestamp: new Date().toString(),
              message: message
            });

        console.log(payload);
        // $q.post(serverUrl + '/logs', payload);
      },
      setData: function(obj) {
        localStorage.setItem(lsPrefix + 'participantId', obj.participantId);
        localStorage.setItem(lsPrefix + 'session', obj.session);
        localStorage.setItem(lsPrefix + 'interface', obj.interface);
        localStorage.setItem(lsPrefix + 'content', obj.content);
        localStorage.setItem(lsPrefix + 'clutter', obj.clutter);
      },
      get: function(key) {
        return localStorage.getItem(lsPrefix + key);
      }
    };
  });

  window.logger = app;
})(window);
