(function(window) {
  var app = angular.module('logger', []);

  app.factory('LoggerService', function($q) {
    var serverUrl = '//vdziubak.com:8000',
        lsPrefix = 'IntegratedCommentingStudy-';

    var getData = function() {
      var studyData = {
        participantId: localStorage.getItem(lsPrefix + 'participantId'),
        session:       localStorage.getItem(lsPrefix + 'session'),
        interface:     localStorage.getItem(lsPrefix + 'interface'),
        content:       localStorage.getItem(lsPrefix + 'content'),
        clutter:       localStorage.getItem(lsPrefix + 'clutter')
      };

      return studyData;
    };
    var setData = function(obj) {
      localStorage.setItem(lsPrefix + 'participantId', obj.participantId);
      localStorage.setItem(lsPrefix + 'session', obj.session);
      localStorage.setItem(lsPrefix + 'interface', obj.interface);
      localStorage.setItem(lsPrefix + 'content', obj.content);
      localStorage.setItem(lsPrefix + 'clutter', obj.clutter);
    };

    return {
      log: function(message) {
        var payload = Object.assign({}, getData(), {
              timestamp: new Date().toString(),
              message: message
            });

        console.log(payload);
        // $q.post(serverUrl + '/logs', payload);
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
