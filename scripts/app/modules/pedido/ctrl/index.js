(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('orderCtrl', function (userinfo, pedido){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        pedido.list();
        $ctrl.pedidos = pedido.dataOrder;

        $ctrl.location = {
            page: "Lista Pedidos",
            list: [
                {name: "Escritorio",      url: "/"},
                {name: "Lista Pedidos",   url: "/orders"}
            ]
        };

        $ctrl.deletePedido = function(index, order){
            pedido.delete(order._id);
            $ctrl.pedidos.splice(index, 1);
        }

        $(document).ready(function() {

            $('.footable').footable();

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
