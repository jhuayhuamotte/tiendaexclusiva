(function () {
    'use strict';
    angular.module('tiendaexclusiva').directive('gridProduct',function(){
        return {
            required: 'field',
            restrict : 'E',
            scope: {
              producto: '='
            },
            templateUrl:'scripts/app/modules/grid/views/partials/grid-product.html',
            link: function ($scope, $element, $args) {


            }
        };
    });
})();
