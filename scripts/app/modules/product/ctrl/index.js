(function () {
    'use strict';

    function productController(userinfo, producto, $stateParams, $scope, Upload, $timeout, $location){
        var $ctrl = this,
            uploadUrl = "dist/assets/img/";

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
            $ctrl.product = {
                edit: false,
                nombre_producto: null,
                precio: {compra: 0, venta: 0},
                cantidad: 0,
                desc_producto: null,
                descripcion: null,
                fotos: [],
                meta_tag_title: null,
                meta_tag_desc: null,
                meta_tag_keywords: null,
                modelo: null,
                marca: null,
                codigo: null,
                clase: null,
                cantidad_min: 0,
                prioridad: 1,
                direccion:null,
                descuentos: []
            }
        }

        $ctrl.saveProduct = function(){
            $ctrl.product.desc_producto = $('#summernote').summernote('code');
            if($ctrl.product.edit){
                producto.update($ctrl.idProducto, $ctrl.product);
            }else{
                console.log("productoSave: ", $ctrl.product);
                producto.save($ctrl.product);
                initProduct();
            }
            $location.path("/grid");
        }

        $ctrl.deleteFotos = function(index){
            $ctrl.product.fotos.splice(index, 1);
        }

        $ctrl.deleteDescuentos = function(index){
            $ctrl.product.descuentos.splice(index, 1);
        }

        $ctrl.addDescuentos = function(){
            $ctrl.product.descuentos.push({
                grupo: 1,
                cantidad: 1,
                descuento: 0,
                date_start: new Date(),
                date_end: new Date()
            });
        }

        $scope.uploadPic = function(file) {
            var date = new Date();
            var time = date.getTime();
            file.upload = Upload.rename(file, time+'-'+file.name);
            file.upload = Upload.upload({
                url: 'api/v1/media/upload',
                data: {time: time, file: file}
            });

            file.upload.then(function (response) {
                var image = {url: uploadUrl+response.config.data.file.ngfName, orden: 1};
                console.log("image: ", image);
                $ctrl.product.fotos.push(image);
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (err) {
              if (err.status > 0) $scope.errorMsg = err.status + ': ' + err.data;
            }, function (evt) {
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
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
