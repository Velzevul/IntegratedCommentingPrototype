angular.module('comments')
  .controller('StartScreenController', function($scope, $q, CounterBalancingService, $routeProvider) {
    $scope.test = CounterBalancingService.interfaceType;

    $scope.submit = function(interface) {
      CounterBalancingService.interface = interface;
      $routeProvider.redirectTo('/interface');
    };
  });