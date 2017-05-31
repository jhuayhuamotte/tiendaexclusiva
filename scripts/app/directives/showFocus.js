(function () {
  'use strict';
  angular.module('krowdy-positions')
  .directive('kdyFocus', function($timeout) {
    return function(scope, element, attrs) {
      scope.$watch(attrs.kdyFocus,
        function (newValue) {
          // console.log('newValue',newValue);
          $timeout(function() {
            newValue && element.focus();
          });
        },true);
      };
    });
  })();
