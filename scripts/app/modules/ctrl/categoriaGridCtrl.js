(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('categoriaGridCtrl', function (userinfo, categoria){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        categoria.list();
        $ctrl.categorias = categoria.dataList;
        $ctrl.location = {
            page: "Categorias",
            list: [
                {name: "Escritorio", url: "/"},
                {name: "Categorias",  url: "/grid"}
            ]
        };
    });
})();
