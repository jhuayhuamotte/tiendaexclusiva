(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('userCtrl', function(usuario, userinfo){
        var $ctrl = this;
        $ctrl.usuarios = [];
        $ctrl.userinfo = userinfo;

        $ctrl.location = {
            page: "Lista de Usuarios",
            list: [
                {name: "Escritorio",       url: "/"},
                {name: "Lista Usuarios",   url: "/user/list"}
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
                    $location.path('/product/edit/' + $itemScope.producto._id);
                }
            },
            {
                text: 'Eliminar',
                click: function ($itemScope, $event, modelValue, text, $li) {
                    $ctrl.deleteProduct($itemScope.$index, $itemScope.producto);
                }
            }
        ];

        usuario.list().success(function(result){
            angular.copy(result, $ctrl.usuarios);
            console.log("usuarios: ", result);
        });

    })
})();
