(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('categoriaListCtrl', function (userinfo, categoria, $timeout, $location){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        categoria.list();
        $ctrl.categorias = categoria.dataList;
        $ctrl.location = {
            page: "Lista Categorias",
            list: [
                {name: "Escritorio",        url: "/"},
                {name: "Categorias",         url: "/category/grid"},
                {name: "Lista Categorias",   url: "/category/list"}
            ]
        };

        $ctrl.context_menu = [
            {
                text: 'Opciones'
            },
            null,
            {
                text: 'Editar',
                click: function ($itemScope, $event, modelValue, text, $li) {
                    $location.path('/category/edit/' + $itemScope.categoria._id);
                }
            },
            {
                text: 'Eliminar',
                click: function ($itemScope, $event, modelValue, text, $li) {
                    $ctrl.deleteCategoria($itemScope.$index, $itemScope.categoria);
                }
            }
        ];

        $ctrl.deleteCategoria = function(index, cat){
            categoria.delete(cat._id);
            $ctrl.categorias.splice(index, 1);
        }

        $ctrl.goToExport = function(){
            $ctrl.search = {module:"categorialist"};
            $location.path('/export').search($ctrl.search);
            console.log("$location", $location.search());
        }

        $timeout(function(){
            $(document).ready(function() {
                $('.footable').footable();
                $(".table>tbody>tr").click(function(){
                    $(this).addClass("row-active").siblings().removeClass("row-active");
                });
            });
        }, 500);
    });
})();
