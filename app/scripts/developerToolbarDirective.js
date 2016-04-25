angular.module('comments')
  .directive('developerToolbar', function($window, DevParametersService, ContextualCommentsService, UserService, LoggerService, rootPrefix) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'templates/developerToolbar.html',
      scope: {},
      controller: function($scope, $window) {
        $scope.confirmQuit = function(event){
          var endSession = $window.confirm("Are you sure you want to quit?");

          if(endSession){
            LoggerService.log('experiment finished')

            $window.location.href = rootPrefix + '/study.html';
          } else {
            event.preventDefault();
          }
        }
      }
    };
  });
