(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('pedidoListCtrl', function (userinfo, pedido, $timeout){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        pedido.list();
        $ctrl.pedidos = pedido.dataPedido;

        $ctrl.location = {
            page: "Lista Pedidos",
            list: [
                {name: "Escritorio",      url: "/"},
                {name: "Lista Pedidos",   url: "/pedidos"}
            ]
        };

        $ctrl.deletePedido = function(index, order){
            pedido.delete(order._id);
            $ctrl.pedidos.splice(index, 1);
        }

        $timeout(function(){
            $('.table').trigger('footable_redraw');
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
