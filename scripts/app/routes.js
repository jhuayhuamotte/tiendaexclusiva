(function () {
  'use strict';
  angular.module('tiendaexclusiva').config(function ($stateProvider,
  $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/grid');

    $stateProvider
    .state('productgrid', {
      resolve: {
        userinfo: function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then ( function (response) {
           return response.data.user;
         });
       }
      },
      url: '/grid',
      templateUrl: "scripts/app/modules/views/producto-grid.template.html",
      controller: 'prodGridCtrl',
      controllerAs: '$ctrl'
    })
    .state('productlist', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/list',
      templateUrl: 'scripts/app/modules/views/producto-list.template.html',
      controller: 'prodListCtrl',
      controllerAs: '$ctrl'
    })
    .state('addProduct', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/product',
      templateUrl: 'scripts/app/modules/views/producto.template.html',
      controller: 'productCtrl',
      controllerAs: '$ctrl'
    })
    .state('editProduct', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/product/edit/:id',
      templateUrl: 'scripts/app/modules/views/producto.template.html',
      controller: 'productCtrl',
      controllerAs: '$ctrl'
    })
    .state('productDetail', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/product/detail/:id',
      templateUrl: 'scripts/app/modules/views/producto-detail.template.html',
      controller: 'productDetailCtrl',
      controllerAs: '$ctrl'
    })
    .state('carro', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/car/:id',
      templateUrl: 'scripts/app/modules/views/carro.template.html',
      controller: 'carroCtrl',
      controllerAs: '$ctrl'
    })
    .state('order', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/order/:id',
      templateUrl: 'scripts/app/modules/views/pedido.template.html',
      controller: 'pedidoCtrl',
      controllerAs: '$ctrl'
    })
    .state('orderEdit', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/order/edit/:id',
      templateUrl: 'scripts/app/modules/views/pedido.template.html',
      controller: 'pedidoCtrl',
      controllerAs: '$ctrl'
    })
    .state('orderList', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/orders',
      templateUrl: 'scripts/app/modules/views/pedido-list.template.html',
      controller: 'pedidoListCtrl',
      controllerAs: '$ctrl'
    })
    .state('ventas', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/ventas',
      templateUrl: 'scripts/app/modules/views/venta.template.html',
      controller: 'ventaCtrl',
      controllerAs: '$ctrl'
    })
    .state('export', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/export',
      templateUrl: 'scripts/app/modules/views/export.template.html',
      controller: 'exportCtrl',
      controllerAs: '$ctrl'
    })
  })
})();
