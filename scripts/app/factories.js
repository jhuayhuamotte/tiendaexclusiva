(function () {
    'use strict';

    function carrosFactory( $http ){
        var carro = {};
        carro.values = [];
        carro.carData = {};

        carro.list = function(){
            return $http
            .get('/api/v1/carros')
            .success( function(carros) {
                angular.copy(carros, carro.values);
            })
            .error( function(err) {
                console.log("List Cars Error: ", err);
            });
        }

        carro.getById = function(id){
            return $http
            .get('/api/v1/carro/'+id)
            .success( function(carro) {
                return carro;
            })
            .error( function(err) {
                console.log("Get Car By Id Error: ", err);
            });
        }

        carro.getByIdProfile = function(id){
            return $http
            .get('/api/v1/carro/profile/'+id)
            .success( function(response) {
                if(response !== null){
                    var car = response;
                    car.edit = true;
                    angular.copy(car,carro.carData);
                }
            })
            .error( function(err) {
                console.log("Get Car By id Profile Error: ", err);
            });
        }

        carro.save = function(row){
            return $http
            .post('/api/v1/carro', row)
            .success( function(response) {
                carro.carData.edit = true;
                console.log("Car Saved: ", response);
            })
            .error( function(err) {
                console.log("Save Car Error: ", err);
            });
        }

        carro.update = function(id, row){
            return $http
            .put('/api/v1/carro/'+id, row)
            .success( function(response) {
                console.log("Car Updated: ", response);
            })
            .error( function(err) {
                console.log("Update Car Error: ", err);
            });
        }

        carro.updateByProfile = function(id, row){
            return $http
            .put('/api/v1/carro/profile/'+id, row)
            .success( function(response) {
                console.log("Car Updated: ", response);
            })
            .error( function(err) {
                console.log("Update Car Error: ", err);
            });
        }

        carro.delete = function(id){
            return $http
            .delete('/api/v1/carro/'+id)
            .success( function(response) {
                carro.carData.edit = false;
                console.log("Car Deleted: ", response);
            })
            .error( function(err) {
                console.log("Deleted Car Error: ", err);
            });
        }

        return carro;
    }

    function pedidosFactory( $http ){
        var pedido = {};
        pedido.dataOrder = [];

        pedido.list = function(){
            return $http
            .get('/api/v1/pedidos')
            .success( function(response) {
                angular.copy(response, pedido.dataOrder);
            })
            .error( function(err) {
                console.log("List Pedidos Error: ", err);
            });
        }

        pedido.getById = function(id){
            return $http
            .get('/api/v1/pedido/'+id)
            .success( function(pedido) {
                return pedido;
            })
            .error( function(err) {
                console.log("Get Pedido By Id Error: ", err);
            });
        }

        pedido.save = function(row){
            return $http
            .post('/api/v1/pedido', row)
            .success( function(response) {
                console.log("Pedido Saved: ", response);
            })
            .error( function(err) {
                console.log("Save Pedido Error: ", err);
            });
        }

        pedido.update = function(id, row){
            return $http
            .put('/api/v1/pedido/'+id)
            .success( function(pedido) {
                console.log("Pedido Updated: ", pedido);
            })
            .error( function(err) {
                console.log("Update Pedido Error: ", err);
            });
        }

        pedido.delete = function(id){
            return $http
            .delete('/api/v1/pedido/'+id)
            .success( function(response) {
                console.log("Pedido Deleted: ", response);
            })
            .error( function(err) {
                console.log("Deleted Pedido Error: ", err);
            });
        }

        return pedido;
    }

    function productosFactory( $http ){
        var producto = {};
        producto.dataList = [];
        producto.edit = {};

        producto.list = function(){
            return $http
            .get('/api/v1/productos')
            .success( function(response) {
                console.log("response: list: ", response);
                angular.copy(response, producto.dataList);
            })
            .error( function(err) {
                console.log("List Products Error: ", err);
            });
        }

        producto.getById = function(id){
            return $http
            .get('/api/v1/producto/'+id)
            .success( function(response) {
                var prod = response;
                prod.edit = true;
                console.log("producto.getById: ", prod);
                angular.copy(prod, producto.edit);
            })
            .error( function(err) {
                console.log("Get Product By Id Error: ", err);
            });
        }

        producto.save = function(row){
            return $http
            .post('/api/v1/producto', row)
            .success( function(response) {
                console.log("Product Saved: ", response);
            })
            .error( function(err) {
                console.log("Save Product Error: ", err);
            });
        }

        producto.update = function(id, row){
            console.log("row: ", id, row);
            return $http
            .put('/api/v1/producto/'+id, row)
            .success( function(response) {
                console.log("Product Updated: ", response);
            })
            .error( function(err) {
                console.log("Update Product Error: ", err);
            });
        }

        producto.delete = function(id){
            return $http
            .delete('/api/v1/producto/'+id)
            .success( function(response) {
                console.log("Product Deleted: ", response);
            })
            .error( function(err) {
                console.log("Deleted Product Error: ", err);
            });
        }

        return producto;
    }

    function ventasFactory( $http ){
        var venta = {};
        venta.values = [];

        venta.list = function(){
            return $http
            .get('/api/v1/ventas')
            .success( function(ventas) {
                angular.copy(ventas, venta.values);
            })
            .error( function(err) {
                console.log("List Ventas Error: ", err);
            });
        }

        venta.getById = function(id){
            return $http
            .get('/api/v1/venta/'+id)
            .success( function(venta) {
                return venta;
            })
            .error( function(err) {
                console.log("Get Venta By Id Error: ", err);
            });
        }

        venta.save = function(row){
            return $http
            .post('/api/v1/venta', row)
            .success( function(venta) {
                console.log("Venta Saved: ", venta);
            })
            .error( function(err) {
                console.log("Save Venta Error: ", err);
            });
        }

        venta.update = function(id, row){
            return $http
            .put('/api/v1/venta/'+id)
            .success( function(venta) {
                console.log("Venta Updated: ", venta);
            })
            .error( function(err) {
                console.log("Update Venta Error: ", err);
            });
        }

        venta.delete = function(id){
            return $http
            .delete('/api/v1/venta/'+id)
            .success( function(venta) {
                console.log("Venta Deleted: ", venta);
            })
            .error( function(err) {
                console.log("Deleted Venta Error: ", err);
            });
        }

        return venta;
    }

    angular
    .module('tiendaexclusiva')
    .factory('carro',     carrosFactory)
    .factory('pedido',    pedidosFactory)
    .factory('producto',  productosFactory)
    .factory('venta',     ventasFactory);

})();
