(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('prodGridCtrl', function (userinfo, producto){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        producto.list();
        $ctrl.productos = producto.dataList;
        $ctrl.location = {
            page: "Productos",
            list: [
                {name: "Escritorio", url: "/"},
                {name: "Productos",  url: "/grid"}
            ]
        };
    });
})();
