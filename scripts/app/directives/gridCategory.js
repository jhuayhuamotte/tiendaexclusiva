(function () {
    'use strict';
    angular.module('tiendaexclusiva').directive('gridCategory',function($location){
        return {
            required: 'field',
            restrict : 'E',
            scope: {
              category: '='
            },
            templateUrl:'scripts/app/modules/views/partials/grid-category.html',
            link: function ($scope, $element, $args) {
                $scope.showProductCategory = function(cat){
                    $location.path("/product/list/category/"+cat._id)
                    .search({cat:capitalize(cat.nombre_categoria.toLowerCase())});
                }

                function capitalize(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
            }
        };
    });
})();
