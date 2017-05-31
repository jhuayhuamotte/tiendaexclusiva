(function () {
  'use strict';
  angular.module('krowdy-positions')
  .directive('ngEnterkey', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
              scope.$eval(attrs.ngEnterkey);
          });
          event.preventDefault();
        }
      });
    };
  });
})();
