(function () {
  'use strict';
  angular.module('krowdy-positions')
  .directive('gridProduct',function(consolidado, sugerencias,positions, $filter){
    return {
      required: 'field',
      restrict : 'E',
      scope: {

      },
      templateUrl:'scripts/app/modules/grid/views/partials/grid-product.html',
      link: function ($scope, $element, $args) {
        //consolidado.getConsolidado();

      }
    };
  });
})();
