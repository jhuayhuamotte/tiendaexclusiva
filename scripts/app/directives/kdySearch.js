(function () {
  'use strict';
  angular.module('krowdy-positions')
  .directive('kdySearch',function(consolidado, sugerencias,positions, $filter){
    return {
      required: 'field',
      restrict : 'E',
      scope: {
        results:'=',
        english:'=',
        spanish:'=',
        refresh:'&'
      },
      templateUrl:'scripts/app/modules/puestos/views/partials/input-search.html',
      link: function ($scope, $element, $args) {
        //consolidado.getConsolidado();
        $scope.top = 5;
        $scope.english = true;
        $scope.spanish = true;
        $scope.consolStatus = consolidado.status;
        $scope.actividades = consolidado.actividades;
        $scope.categorias = consolidado.categorias;
        $scope.commodities = consolidado.commodities;
        $scope.puestosonet = [];
        $scope.table = 'actividades';

        var typingTimer;                //timer identifier
        var doneTypingInterval = 1000;  //time in ms, 5 seconds

        $scope.search = function(){
          if($scope.text.length<=0){
            $scope.actividades = [];
            $scope.categorias = [];
            $scope.commodities = [];
            $scope.puestosonet = [];
          }
          clearTimeout(typingTimer);
          typingTimer = setTimeout(getDataSearch, doneTypingInterval);
        };

        function getDataSearch(){
          $scope.actividades = [];
          $scope.categorias = [];
          $scope.commodities = [];
          if($scope.text.length>3){
            var row = {
              text:$scope.text,
              actividades:$scope.table=='actividades'?true:false,
              categorias:$scope.table=='categorias'?true:false,
              commodities:$scope.table=='commodities'?true:false
            };
            consolidado.getConsolidado(row);
            switch($scope.table){
              case "actividades":
                $scope.actividades = consolidado.actividades;
                break;
              case "categorias":
                $scope.categorias = consolidado.categorias;
                break;
              case "commodities":
                $scope.commodities = consolidado.commodities;
                break;
            }
          }else{
            $scope.consolStatus.loading=false;
            $scope.consolStatus.noResults=false;
          }
        }

        $scope.getGlobes = function(obj){
          $scope.puestosonet = [];
          switch($scope.table){
            case "actividades":
              sugerencias.getPositions(obj.gwa_id);
              $scope.puestosonet = sugerencias.positions;
              break;
            case "categorias":
              sugerencias.getPositions(obj.cat_id);
              $scope.puestosonet = sugerencias.positions;
              break;
            case "commodities":
              consolidado.getToolsTechnology(obj.commodity_id);
              $scope.puestosonet = consolidado.toolsTechnology;
              break;
          }
          loadPuestosOnet();
        };

        function loadPuestosOnet(){
          if($scope.puestosonet.length>0){
            var puestos = $filter('limitTo')($scope.puestosonet, $scope.top, 0);
            $scope.refresh({$puestos:puestos});
          }else{
            setTimeout(function(){
              if("undefined" !== typeof $scope.puestosonet){
                loadPuestosOnet();
              }
            },500);
          }
        }

        $scope.selectPuesto = function(item){
          positions.inputs[0].puesto.push({id:item.onet_code,nombre:item._id.title});
        };

        $(document).on("click", ".rows", function(){
          $(this).addClass("selected").siblings().removeClass("selected");
        });
      }
    };
  });
})();
