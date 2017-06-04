(function () {
    'use strict';
    angular.module('tiendaexclusiva').directive('location',function(carro){
        return {
            required: 'field',
            restrict : 'E',
            scope: {
              location: '=',
              user: '='
            },
            templateUrl:'scripts/app/partials/location.html',
            link: function ($scope, $element, $args) {
                $scope.carro = {};
                carro.getByIdProfile($scope.user._id);
                $scope.carro = carro.carData;
            }
        };
    });
})();
