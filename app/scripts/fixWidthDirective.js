angular.module('comments')
  .directive('fixWidth', function() {
    'use strict';

    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        function recalculateWidth() {
          elem.css('position', 'static');
          var parentWidth = elem.width();
          elem.css('position', 'fixed');

          elem.width(parentWidth);
        }

        recalculateWidth();
        $(window).on('resize', recalculateWidth);
      }
    };
  });