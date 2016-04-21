angular.module('comments')
  .factory('CounterBalancingService', function($q) {
    return {
      participantId: null,
      clutter: false,
      contentType: 'light',
      interfaceType: 'integrated'
    };
  });
