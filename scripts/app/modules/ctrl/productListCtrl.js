(function () {
    'use strict';
    angular.module('tiendaexclusiva').controller('prodListCtrl', function (userinfo,
        producto, carro, $timeout, $location, $stateParams){

        var $ctrl = this;
        $ctrl.carro = {};
        $ctrl.userinfo = userinfo;
        $ctrl.productos = [];
        $ctrl.showCategory = false;
        $ctrl.params = $location.search();
        $ctrl.idCategoria = $stateParams.categoryid;

        $ctrl.location = {
            page: "Lista Productos",
            list: [
                {name: "Escritorio",        url: "/"},
                {name: "Productos",         url: "/category/grid"},
                {name: "Lista Productos",   url: "/list"}
            ]
        };

        if("undefined" !== typeof $stateParams.categoryid){
            $ctrl.location.page = "Stock "+$ctrl.params.cat;
            $ctrl.location.list[2] = {
                name: $ctrl.location.page,
                url: "/product/list/category/"+$ctrl.idCategoria
            };
            producto.listByCategory($ctrl.idCategoria);
            carro.getByIdProfile($ctrl.userinfo._id);
            $ctrl.carro = carro.carData;
            $ctrl.showCategory = true;
        }else{
            producto.list();
        }

        $ctrl.productos = producto.dataList;

        $ctrl.deleteProduct = function(index, prod){
            producto.delete(prod._id);
            $ctrl.productos.splice(index, 1);
        }

        $ctrl.addToCar = function(producto){
            console.log("$ctrl.carro1: ", $ctrl.carro);
            if($ctrl.carro.edit){
                initCarro(producto);
                console.log("$ctrl.carro2: ", $ctrl.carro);
                carro.updateByProfile($ctrl.userinfo._id, $ctrl.carro.productos[0]);
            }else{
                initCarro(producto);
                carro.save($ctrl.carro);
            }
        }

        function initCarro(producto){
            $ctrl.carro = {
                edit:false,
                id_profile: $ctrl.userinfo._id,
                productos: [
                    {
                        id_producto: producto._id,
                        cantidad: 1,
                        precio: producto.precio.venta,
                        descuento: 0,
                        nombre_producto: producto.nombre_producto,
                        descripcion: producto.descripcion,
                        descripcion_list: "",
                        marca: producto.marca,
                        modelo: producto.modelo,
                        img_url: ""
                    }
                ]
            }
        }

        $ctrl.goToExport = function(){
            $ctrl.search = {module:"productolist"};
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
