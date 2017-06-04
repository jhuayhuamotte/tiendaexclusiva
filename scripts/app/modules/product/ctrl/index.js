(function () {
    'use strict';

    function productController(userinfo, producto, $stateParams){
        var $ctrl = this;
        $ctrl.userinfo = userinfo;
        $ctrl.product = {};
        $ctrl.idProducto = $stateParams.id;
        $ctrl.location = {
            page: "Nuevo Producto",
            list: [
                {name: "Escritorio", url: "/"},
                {name: "Productos", url: "/grid"},
                {name: "Nuevo Producto", url: "/product"}
            ]
        };

        initProduct();
        if("undefined" !== typeof $ctrl.idProducto){
            if ($ctrl.idProducto.trim().length>0) {
                $ctrl.location.page = "Editar Producto";
                $ctrl.location.list[2] = {
                    name: "Editar Producto",
                    url: "/product/edit/"+$ctrl.idProducto
                };
                loadProduct();
            }
        }

        function loadProduct(){
            producto.getById($ctrl.idProducto);
            $ctrl.product = producto.edit;
        }

        function initProduct(){
            console.log("log: ", userinfo);
            $ctrl.product = {
                edit: false,
                nombre: null,
                precio: 0,
                cantidad: 0,
                desc_producto: null,
                fotos: [
                    {url: "www.google.com", orden: 1},
                    {url: "www.youtube.com", orden: 2}
                ],
                tag_title: null,
                tag_desc: null,
                tag_keywords: null,
                modelo: null,
                codigo: null,
                clase: null,
                cantidad_min: 0,
                prioridad: 1,
                direccion:null,
                estado: 0,
                descuentos: [
                    {
                        grupo: "Grupo 1",
                        cantidad: 10,
                        descuento: 10,
                        date_start: "07/09/2014",
                        date_end: "07/01/2014"
                    },
                    {
                        grupo: "Grupo 2",
                        cantidad: 20,
                        descuento: 30,
                        date_start: "08/09/2014",
                        date_end: "08/01/2014"
                    }
                ]
            }
        }

        $ctrl.saveProduct = function(){
            $ctrl.product.desc_producto = $('#summernote').summernote('code');
            if($ctrl.product.edit){
                producto.update($ctrl.idProducto, $ctrl.product);
            }else{
                producto.save($ctrl.product);
                initProduct();
            }
        }


        $(document).ready(function(){
            $('.summernote').summernote();
            $('.input-group.date').datepicker(
                {
                    todayBtn: "linked",
                    keyboardNavigation: false,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true
                }
            );
        });
    }

    angular.module('tiendaexclusiva').controller('productCtrl', productController);
})();
