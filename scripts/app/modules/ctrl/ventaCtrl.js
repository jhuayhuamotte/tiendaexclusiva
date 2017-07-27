(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('ventaCtrl', function (userinfo, venta, $timeout, $location){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        venta.list();
        $ctrl.ventas = venta.dataVenta;
        $ctrl.venta_detail = {};

        $ctrl.location = {
            page: "Lista Ventas",
            list: [
                {name: "Escritorio",      url: "/"},
                {name: "Lista Ventas",   url: "/ventas"}
            ]
        };

        $ctrl.context_menu = [
            {
                text: 'Opciones'
            },
            null,
            {
                text: 'Eliminar',
                click: function ($itemScope, $event, modelValue, text, $li) {
                    $ctrl.deleteVenta($itemScope.$index, $itemScope.venta);
                }
            }
        ];

        $ctrl.deleteVenta = function(index, sales){
            venta.delete(sales._id);
            $ctrl.ventas.splice(index, 1);
        }

        $ctrl.goToExport = function(){
            $ctrl.search = {module:"ventalist"};
            $location.path('/export').search($ctrl.search);
            console.log("$location", $location.search());
        }

        $ctrl.show_venta_detail = function(venta_detail){
            $ctrl.venta_detail = venta_detail;
            $('#venta_detail').modal();
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
