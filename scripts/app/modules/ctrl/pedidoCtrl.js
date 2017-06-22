(function () {
    'use strict';

    function pedidoController(userinfo, pedido, $stateParams, $scope, Upload, $timeout, $location){
        var $ctrl = this,
            uploadUrl = "dist/assets/img/";

        $ctrl.userinfo = userinfo;
        $ctrl.pedido = {};
        $ctrl.idPedido = $stateParams.id;
        $ctrl.location = {
            page: "Nuevo Pedido",
            list: [
                {name: "Escritorio", url: "/"},
                {name: "Pedidos", url: "/orders"},
                {name: "Nuevo Pedido", url: "/order/"}
            ]
        };

        initPedido();
        if("undefined" !== typeof $ctrl.idPedido){
            if ($ctrl.idPedido.trim().length>0) {
                $ctrl.location.page = "Editar Pedido";
                $ctrl.location.list[2] = {
                    name: "Editar Pedido",
                    url: "/order/edit/"+$ctrl.idPedido
                };
                loadPedido();
            }
        }

        function loadPedido(){
            pedido.getById($ctrl.idPedido);
            $ctrl.pedido = pedido.edit;
        }

        function initPedido(){
            $ctrl.pedido = {
                id_pedido: 192830,
                edit: false,
                estado: 0,
                cliente: {
                    nombre: null,
                    email: null,
                    telefono: null,
                    celular: null
                },
                productos: []
            }
        }

        $ctrl.savePedido = function(){
            if($ctrl.pedido.edit){
                pedido.update($ctrl.idPedido, $ctrl.pedido);
            }else{
                console.log("pedidoSave: ", $ctrl.pedido);
                pedido.save($ctrl.pedido);
                initPedido();
            }
            $location.path("/orders");
        }

        $ctrl.deleteProductos = function(index){
            $ctrl.pedido.productos.splice(index, 1);
        }

        $ctrl.addProductos = function(){
            $ctrl.pedido.productos.push({
                cantidad: 1,
                nombre_producto: null,
                marca: null,
                modelo: null,
                precio: 0
            });
        }

        $(document).ready(function(){
            $('.input-group.date').datepicker(
                {
                    todayBtn: "linked",
                    keyboardNavigation: false,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true
                }
            );
        });
    }

    angular.module('tiendaexclusiva').controller('pedidoCtrl', pedidoController);
})();
