(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('ventaCtrl', function (userinfo, venta, $timeout, $location){
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

        $ctrl.deleteVenta = function(index, sales){
            venta.delete(sales._id);
            $ctrl.ventas.splice(index, 1);
        }

        $ctrl.goToExport = function(){
            $ctrl.search = {module:"ventalist"};
            $location.path('/export').search($ctrl.search);
            console.log("$location", $location.search());
        }

        $timeout(function(){
            $(document).ready(function() {
                $('.footable').footable();
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
