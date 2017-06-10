(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('exportCtrl', function (userinfo, venta, $timeout){
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
            $('.dataTables-example').DataTable({
                pageLength: 25,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    { extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},

                    {extend: 'print',
                     customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                    }
                    }
                ]

            });
        }, 500);
    });
})();
