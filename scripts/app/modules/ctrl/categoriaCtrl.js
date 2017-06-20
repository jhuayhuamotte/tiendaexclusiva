(function () {
    'use strict';

    function categoriaController(userinfo, categoria, $stateParams, $scope, Upload, $timeout, $location){
        var $ctrl = this,
            uploadUrl = "dist/assets/img/";

        $ctrl.userinfo = userinfo;
        $ctrl.categoria = {};
        $ctrl.idCategoria = $stateParams.id;
        $ctrl.location = {
            page: "Nuevo Categoria",
            list: [
                {name: "Escritorio", url: "/"},
                {name: "Categorias", url: "/category/list"},
                {name: "Nueva Categoria", url: "/category"}
            ]
        };

        initCategoria();
        if("undefined" !== typeof $ctrl.idCategoria){
            if ($ctrl.idCategoria.trim().length>0) {
                $ctrl.location.page = "Editar Categoria";
                $ctrl.location.list[2] = {
                    name: "Editar Categoria",
                    url: "/category/edit/"+$ctrl.idCategoria
                };
                loadCategoria();
            }
        }

        function loadCategoria(){
            categoria.getById($ctrl.idCategoria);
            $ctrl.categoria = categoria.edit;
        }

        function initCategoria(){
            $ctrl.categoria = {
                edit: false,
                nombre_categoria: null,
                fotoUrl: null,
                descripcion: null,
                estado: 0
            }
        }

        $ctrl.saveCategoria = function(){
            if($ctrl.categoria.edit){
                categoria.update($ctrl.idCategoria, $ctrl.categoria);
            }else{
                console.log("categoriaSave: ", $ctrl.categoria);
                categoria.save($ctrl.categoria);
                initCategoria();
            }
            $location.path("/category/list");
        }

        $ctrl.deleteFotos = function(index){
            $ctrl.categoria.fotos.splice(index, 1);
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
                var imageURL = uploadUrl+response.config.data.file.ngfName;
                console.log("image: ", imageURL);
                $ctrl.categoria.fotoUrl = imageURL;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (err) {
              if (err.status > 0) $scope.errorMsg = err.status + ': ' + err.data;
            }, function (evt) {
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }

    angular.module('tiendaexclusiva').controller('categoriaCtrl', categoriaController);
})();
