angular.module('comments')
  .factory('LoggerService', function($q, server) {
    var studyData = {
      participantId: null,
      session: '',
      interface: '',
      content: '',
      clutter: null
    };

    var log = function(message) {
      $q.post(server + '/logs', Object.assign({}, studyData, {
        timestamp: new Date().toString(),
        message: message
      }));
    };

    return {
      studyData: studyData,
      log: log
    };
  });
