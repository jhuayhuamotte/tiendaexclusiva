(function () {
  'use strict';
  angular.module('krowdy-positions')
  .directive('tiendaMenu',function(consolidado, sugerencias,positions, $filter){
    return {
      required: 'field',
      restrict : 'E',
      scope: {

      },
      templateUrl:'scripts/app/modules/grid/views/partials/tienda-menu.html',
      link: function ($scope, $element, $args) {
        //consolidado.getConsolidado();

      }
    };
  });
})();
