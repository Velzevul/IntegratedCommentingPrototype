angular.module('comments')
  .directive('commentsSidebar', function() {
    'use strict';

    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        var sidebarHead = elem.find('.comments-sidebar__head'),
            sidebarBody = elem.find('.comments-sidebar__body');


        function fixHeight() {
          var newHeight = $(window).height() - sidebarHead.outerHeight();
          sidebarBody.innerHeight(newHeight);
        }

        fixHeight();
        $(window).resize(fixHeight);
      }
    };
  });