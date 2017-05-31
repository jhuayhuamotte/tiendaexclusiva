(function () {
    'use strict';
    angular.module('krowdy-positions')
    .filter('exclude', function() {
      return function(input, exclude, prop) {
        if (!angular.isArray(input))
            return input;

        if (!angular.isArray(exclude))
            exclude = [];

        if (prop) {
            exclude = exclude.map(function byProp(item) {
                return item[prop];
            });
        }

        return input.filter(function byExclude(item) {
            return exclude.indexOf(prop ? item[prop] : item) === -1;
        });
    };
  })
})();
