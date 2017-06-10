(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('ventaCtrl', function (userinfo, venta, $timeout){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        venta.list();
        $ctrl.ventas = venta.dataVenta;

        $ctrl.location = {
            page: "Lista Ventas",
            list: [
                {name: "Escritorio",      url: "/"},
                {name: "Lista Ventas",   url: "/ventas"}
            ]
        };

        $ctrl.deleteVenta = function(index, venta){
            venta.delete(venta._id);
            $ctrl.ventas.splice(index, 1);
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
