(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('categoriaGridCtrl', function (userinfo, categoria){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        categoria.list();
        $ctrl.categorias = categoria.dataList;
        $ctrl.location = {
            page: "Productos Stock",
            list: [
                {name: "Escritorio", url: "/"},
                {name: "Productos Stock",  url: "/category/grid"}
            ]
        };
    });
})();
