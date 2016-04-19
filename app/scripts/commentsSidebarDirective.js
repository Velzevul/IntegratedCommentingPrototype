angular.module('comments')
  .directive('commentsSidebar', function() {
    'use strict';

    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        function fixHeight() {
          var newHeight = $(window).height() - parseInt(elem.css('margin-top'));
          elem.innerHeight(newHeight);
        }

        fixHeight();
        $(window).resize(fixHeight);
      }
    };
  });