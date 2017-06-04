(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('productDetailCtrl', function (userinfo, producto, carro, $stateParams){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        $ctrl.product = {};
        $ctrl.carro = {};
        $ctrl.idProducto = $stateParams.id;
        $ctrl.location = {
            page: "Detalle Producto",
            list: [
                {name: "Escritorio",        url: "/"},
                {name: "Productos",         url: "/grid"},
                {name: "Detalle Producto",  url: "/product/detail/"+$ctrl.idProducto}
            ]
        };

        if("undefined" !== typeof $ctrl.idProducto){
            if($ctrl.idProducto.trim().length>0){
                loadProduct();
            }
        }

        $ctrl.addToCar = function(){
            console.log("$ctrl.carro: ", $ctrl.carro);
            if($ctrl.carro.edit){
                initCarro();
                carro.updateByProfile($ctrl.userinfo._id, $ctrl.carro.productos[0]);
            }else{
                initCarro();
                carro.save($ctrl.carro);
            }
        }

        function initCarro(){
            $ctrl.carro = {
                edit:false,
                id_profile: $ctrl.userinfo._id,
                productos: [
                    {
                        id_producto: $ctrl.idProducto,
                        cantidad: 1,
                        precio: $ctrl.product.precio,
                        descuento: 0,
                        nombre_producto: $ctrl.product.nombre,
                        descripcion: $ctrl.product.descripcion,
                        descripcion_list: "",
                        img_url: "www.google.com"
                    }
                ]
            }
        }

        function loadProduct(){
            producto.getById($ctrl.idProducto);
            carro.getByIdProfile($ctrl.userinfo._id);
            $ctrl.product = producto.edit;
            $ctrl.carro = carro.carData;
        }

        $(document).ready(function(){

            $('.product-images').slick({
                dots: true
            });

        });
    });
})();
