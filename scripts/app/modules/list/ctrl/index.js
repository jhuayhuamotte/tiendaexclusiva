(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('prodListCtrl', function (userinfo, producto, $timeout){
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

        $timeout(function(){
            $('.table').trigger('footable_redraw');
        }, 100);
    });
})();
