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
      templateUrl: "scripts/app/modules/grid/views/index.html",
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
      templateUrl: 'scripts/app/modules/list/views/index.html',
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
      templateUrl: 'scripts/app/modules/product/views/index.html',
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
      templateUrl: 'scripts/app/modules/product/views/index.html',
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
      templateUrl: 'scripts/app/modules/detail/views/index.html',
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
      templateUrl: 'scripts/app/modules/carro/views/index.html',
      controller: 'carroCtrl',
      controllerAs: '$ctrl'
    })
    .state('pedidos', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/orders',
      templateUrl: 'scripts/app/modules/pedido/views/index.html',
      controller: 'orderCtrl',
      controllerAs: '$ctrl'
    })
  })
})();
