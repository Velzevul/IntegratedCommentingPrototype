angular.module('comments')
  .factory('LoggerService', function($q) {
    var serverUrl = '//vdziubak.com:8000';

    var studyData = {
      participantId: null,
      session: '',
      interface: '',
      content: '',
      clutter: null
    };

    var log = function(message) {
      $q.post(serverUrl + '/logs', Object.assign({}, studyData, {
        timestamp: new Date().toString(),
        message: message
      }));
    };

    return {
      studyData: studyData,
      log: log
    };
  });
