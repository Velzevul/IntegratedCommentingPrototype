angular.module('comments')
  .directive('contextualAwareness', function($timeout) {
    'use strict';

    var thresholdTop = 200,
        thresholdBottom = 150,
        thresholdOcclusion = 10;

    return {
      restrict: 'A',
      scope: {
      },
      link: function(scope, elem, attrs) {
        var type = attrs.contextualAwareness,
            timeoutId;

        function widgetIsOccluded() {
          var notes = $('.thread-contextual'),
              windowTop = $(window).scrollTop(),
              res = false;

          angular.forEach(notes, function(note) {
            var noteBottom = note.offsetTop + $(note).outerHeight();

            if (Math.abs(windowTop - noteBottom) < thresholdOcclusion) {
              res = true;
            }
          });

          return res;
        }

        function indicatorIsHidden() {
          var res;

          if (type == 'top') {
            res = ($(window).scrollTop() < thresholdTop) || widgetIsOccluded();
          } else if (type == 'bottom') {
            res = true;
          }

          return res;
        }

        function processScroll() {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          timeoutId = $timeout(function() {
            if (indicatorIsHidden()) {
              elem.addClass('contextual-awareness__indicator--hidden');
            } else {
              elem.removeClass('contextual-awareness__indicator--hidden');
            }
          }, 100).$$timeoutId;
        }

        processScroll();
        $(window).scroll(processScroll);
      }
    };
  });