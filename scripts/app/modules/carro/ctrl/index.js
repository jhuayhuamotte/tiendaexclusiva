(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('carroCtrl', function (userinfo, carro, producto, pedido, $stateParams, $location){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        $ctrl.idProfile = $stateParams.id;
        $ctrl.carro = {};
        $ctrl.cuentaTotal = 0;
        producto.list();
        $ctrl.productos = producto.dataList;
        console.log("producto: ", $ctrl.productos);

        if("undefined" !== typeof $ctrl.idProfile){
            if($ctrl.idProfile.trim().length>0){
                loadCarro();
            }
        }

        $ctrl.location = {
            page: "Carro de Compra",
            list: [
                {name: "Escritorio",        url: "/"},
                {name: "Carro de Compra",   url: "/car/"+$ctrl.idProfile}
            ]
        };

        $ctrl.calculateTotal = function(){
            $ctrl.cuentaTotal = 0;
            for(var x in $ctrl.carro.productos){
                var prod = $ctrl.carro.productos[x];
                if(!isNaN(prod.cantidad)){
                    var precio = (parseInt(prod.cantidad) * parseFloat(prod.precio));
                    $ctrl.cuentaTotal = $ctrl.cuentaTotal + precio;
                }
            }
        }

        $ctrl.deleteProducto = function(index){
            if($ctrl.carro.productos.length==1){
                carro.delete($ctrl.carro._id);
                $location.path("/grid");
            }
            $ctrl.carro.productos.splice(index, 1);
        }

        $ctrl.savePedido = function(){
            var row = {
                id_pedido: "834932",
                estado: 0,
                profile: {
                    id: $ctrl.idProfile,
                    displayName: $ctrl.userinfo.profiles[0].name+" "+
                                 $ctrl.userinfo.profiles[0].lastName
                },
                costo_total: $ctrl.cuentaTotal
            }
            pedido.save(row);
            $location.path("/grid");
        }

        function loadCarro(){
            carro.getByIdProfile($ctrl.userinfo._id);
            $ctrl.carro = carro.carData;
            console.log("carro: ", $ctrl.carro);
        }
    });
})();
