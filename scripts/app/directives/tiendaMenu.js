(function () {
  'use strict';
  angular.module('krowdy-positions').directive('tiendaMenu',function(){
    return {
      required: 'field',
      restrict : 'E',
      scope: {

      },
      templateUrl:'scripts/app/partials/tienda-menu.html',
      link: function ($scope, $element, $args) {
        //codigo tienda menu

      }
    };
  });
})();
