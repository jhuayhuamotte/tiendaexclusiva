(function () {
  'use strict';
  angular.module('krowdy-positions')
  .directive('kdyInput',function(){
    return {
      required: 'field',
      restrict : 'E',
      scope: {
        field: '=',
        index: '='
      },
      link: function ($scope, $element, $args) {
        $scope.contentUrl='scripts/app/modules/puestos/views/partials/input-autocompletado.html';

        $scope.addHomo = function(value){
          $scope.field.funciones.push({nombre:value});
        }

        $scope.removeHomo = function(index){
          $scope.field.funciones.splice(index,1);
        }

        $scope.editHomo = function(value, index){
          $scope.field.funciones[index].nombre = value;
        }
      },
      template: '<div ng-include="contentUrl"></div>'
    };
  })
})();
