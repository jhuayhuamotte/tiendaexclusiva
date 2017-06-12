(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('exportCtrl', function (userinfo,
        venta, producto, pedido, $timeout, $location){
        var $ctrl = this;
        var tableTitle = "";
        $ctrl.userinfo = userinfo;
        venta.list();
        $ctrl.search = $location.search();
        $ctrl.showVentas = false;
        $ctrl.showPedidos = false;
        $ctrl.showProductos = false;
        $ctrl.ventas = [];
        $ctrl.pedidos = [];
        $ctrl.productos = [];
        $ctrl.location = {
            page: "Vista Previa Descarga",
            list: [
                {name: "Escritorio",      url: "/"},
                {name: "Vista Previa Descarga",   url: "/export"}
            ]
        };

        if(angular.equals({}, $location.search())){
            $location.path("/");
        }

        switch ($ctrl.search.module) {
            case "productolist":
                producto.list();
                $ctrl.productos = producto.dataList;
                $ctrl.showProductos = true;
                tableTitle = "Lista de productos";
                break;
            case "pedidolist":
                pedido.list();
                $ctrl.pedidos = pedido.dataPedido;
                $ctrl.showPedidos = true;
                tableTitle = "Lista de pedidos";
                break;
            case "ventalist":
                venta.list();
                $ctrl.ventas = venta.dataVenta;
                $ctrl.showVentas = true;
                tableTitle = "Lista de ventas";
                break;
        }

        $timeout(function(){
            $('.dataTables-example').DataTable({
                pageLength: 25,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    { extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: tableTitle},
                    {extend: 'pdf', title: tableTitle},

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
