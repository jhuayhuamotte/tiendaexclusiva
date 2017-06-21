(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('carroCtrl', function (userinfo,
        carro, producto, venta, $stateParams, $location, $timeout){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        $ctrl.idProfile = $stateParams.id;
        $ctrl.carro = {};
        $ctrl.cuentaTotal = 0;
        $ctrl.productos = [];

        console.log("producto: ", $ctrl.productos);

        if("undefined" !== typeof $ctrl.idProfile){
            if($ctrl.idProfile.trim().length>0){
                loadCarro();
                $timeout(function(){
                    var prodIDS = $ctrl.calculateTotal();
                    console.log("prodIDS2: ", prodIDS);
                    var strIDS = prodIDS.toString();
                    var str = strIDS.replace(/,/g , "-");
                    console.log("str: ", str);
                    producto.listByIds(str);
                    $ctrl.productos = producto.dataList;
                }, 1000);
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
            var prodIDS = [];
            $ctrl.cuentaTotal = 0;
            for(var x in $ctrl.carro.productos){
                var prod = $ctrl.carro.productos[x];
                prodIDS.push(prod._id);
                if(!isNaN(prod.cantidad)){
                    var precio = (parseInt(prod.cantidad) * parseFloat(prod.precio));
                    $ctrl.cuentaTotal = $ctrl.cuentaTotal + precio;
                }
            }
            console.log("prodIDS2: ", prodIDS);
            return prodIDS;
        }

        $ctrl.deleteProducto = function(index){
            if($ctrl.carro.productos.length==1){
                carro.delete($ctrl.carro._id);
                $location.path("/category/grid");
            }
            $ctrl.carro.productos.splice(index, 1);
        }

        $ctrl.deleteCarro = function(){
            carro.delete($ctrl.carro._id);
            $location.path("/category/grid");
        }

        $ctrl.saveVenta = function(){
            var row = {
                id_venta: "834932",
                productos: $ctrl.carro.productos,
                estado: 0,
                profile: {
                    id: $ctrl.idProfile,
                    displayName: $ctrl.userinfo.profiles[0].name+" "+
                                 $ctrl.userinfo.profiles[0].lastName
                },
                costo_total: $ctrl.cuentaTotal
            }



            for (var i = 0; i < $ctrl.productos.length; i++) {
                for (var j = 0; j < $ctrl.carro.productos.length; j++) {
                    var prod = $ctrl.productos[i];
                    var carr = $ctrl.carro.productos[j];
                    if(prod._id == carr.id_producto){
                        if (carr.cantidad > prod.cantidad) {
                            $ctrl.message = "Cantidad de productos "+prod.nombre_producto
                            +" superado. Disponible solo " + prod.cantidad + " unidades."
                            return;
                        }
                    }
                }
            }

            venta.save(row);
            $ctrl.carro.edit = false;
            $location.path("/category/grid");
        }

        function loadCarro(){
            carro.getByIdProfile($ctrl.userinfo._id);
            $ctrl.carro = carro.carData;
            console.log("carro: ", $ctrl.carro);
        }

    });
})();
