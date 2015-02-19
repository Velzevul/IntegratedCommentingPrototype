angular.module('comments')
  .factory('UserService', function() {
    'use strict';

    var mock = {
      name: 'Volodymyr Dziubak',
      commentingColor: 'orange',
      role: 'student'
    };

    return {
      getCurrent: function() {
        return mock;
      }
    };
  });