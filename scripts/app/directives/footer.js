(function () {
    'use strict';
    angular.module('tiendaexclusiva').directive('footer',function(){
        return {
            required: 'field',
            restrict : 'E',
            scope: {

            },
            templateUrl:'scripts/app/partials/footer.html',
            link: function ($scope, $element, $args) {


            }
        };
    });
})();
