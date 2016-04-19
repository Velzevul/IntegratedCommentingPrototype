angular.module('comments')
  .factory('DevParametersService', function() {
    'use strict';

    var params = {
      truncate: 10
    };

    return {
      getParams: function() {
        return params;
      }
    };
  });