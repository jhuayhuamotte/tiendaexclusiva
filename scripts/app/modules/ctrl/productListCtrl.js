(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('prodListCtrl', function (userinfo, producto, $timeout, $location){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        producto.list();
        $ctrl.productos = producto.dataList;
        $ctrl.location = {
            page: "Lista Productos",
            list: [
                {name: "Escritorio",        url: "/"},
                {name: "Productos",         url: "/grid"},
                {name: "Lista Productos",   url: "/list"}
            ]
        };

        $ctrl.deleteProduct = function(index, prod){
            producto.delete(prod._id);
            $ctrl.productos.splice(index, 1);
        }

        $ctrl.goToExport = function(){
            $ctrl.search = {module:"productolist"};
            $location.path('/export').search($ctrl.search);
            console.log("$location", $location.search());
        }

        $timeout(function(){
            $(document).ready(function() {
                $('.footable').footable();
            });
        }, 500);
    });
})();
