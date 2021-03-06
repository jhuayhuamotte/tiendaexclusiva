(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('pedidoListCtrl',
    function (userinfo, pedido, $timeout, $location){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        pedido.list();
        $ctrl.pedidos = pedido.dataPedido;
        $ctrl.pedido_detail = {};

        $ctrl.location = {
            page: "Lista Pedidos",
            list: [
                {name: "Escritorio",      url: "/"},
                {name: "Lista Pedidos",   url: "/orders"}
            ]
        };

        $ctrl.context_menu = [
            {
                text: 'Opciones'
            },
            null,
            {
                text: 'Editar',
                click: function ($itemScope, $event, modelValue, text, $li) {
                    $location.path('/order/edit/' + $itemScope.pedido._id);
                }
            },
            {
                text: 'Eliminar',
                click: function ($itemScope, $event, modelValue, text, $li) {
                    $ctrl.deletePedido($itemScope.$index, $itemScope.pedido);
                }
            }
        ];

        $ctrl.deletePedido = function(index, order){
            pedido.delete(order._id);
            $ctrl.pedidos.splice(index, 1);
        }

        $ctrl.show_modal_productos = function(pedido_detail){
            $ctrl.pedido_detail = pedido_detail;
            $('#pedido_detail').modal();
        }

        $ctrl.goToExport = function(){
            $ctrl.search = {module:"pedidolist"};
            $location.path('/export').search($ctrl.search);
            console.log("$location", $location.search());
        }

        $timeout(function(){
            $(document).ready(function() {
                $('.footable').footable();
                $(".table>tbody>tr").click(function(){
                    $(this).addClass("row-active").siblings().removeClass("row-active");
                });
            });
        }, 500);

        $(document).ready(function() {

            $('#date_added').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true
            });

            $('#date_modified').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true
            });

        });
    });
})();
