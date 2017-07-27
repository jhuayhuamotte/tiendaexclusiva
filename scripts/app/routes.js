(function () {
  'use strict';
  angular.module('tiendaexclusiva').config(function ($stateProvider,
  $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/category/grid');

    function get_user_info($http, usuario){
        return usuario.session_info().then(function(result){
            return result.data.user;
        });
    }

    $stateProvider
    .state('productgrid', {
      resolve: {
        userinfo: get_user_info
      },
      url: '/grid',
      templateUrl: "scripts/app/modules/views/producto-grid.template.html",
      controller: 'prodGridCtrl',
      controllerAs: '$ctrl'
    })
    .state('productlist', {
      resolve:{
        userinfo: get_user_info
      },
      url: '/product/list',
      templateUrl: 'scripts/app/modules/views/producto-list.template.html',
      controller: 'prodListCtrl',
      controllerAs: '$ctrl'
    })
    .state('productCategorylist', {
      resolve:{
        userinfo: get_user_info
      },
      url: '/product/list/category/:categoryid',
      templateUrl: 'scripts/app/modules/views/producto-list.template.html',
      controller: 'prodListCtrl',
      controllerAs: '$ctrl'
    })
    .state('addProduct', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/product',
      templateUrl: 'scripts/app/modules/views/producto.template.html',
      controller: 'productCtrl',
      controllerAs: '$ctrl'
    })
    .state('editProduct', {
      resolve:{
        userinfo: get_user_info
      },
      url: '/product/edit/:id',
      templateUrl: 'scripts/app/modules/views/producto.template.html',
      controller: 'productCtrl',
      controllerAs: '$ctrl'
    })
    .state('productDetail', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/product/detail/:id',
      templateUrl: 'scripts/app/modules/views/producto-detail.template.html',
      controller: 'productDetailCtrl',
      controllerAs: '$ctrl'
    })
    .state('carro', {
      resolve:{
        userinfo: get_user_info
      },
      url: '/car/:id',
      templateUrl: 'scripts/app/modules/views/carro.template.html',
      controller: 'carroCtrl',
      controllerAs: '$ctrl'
    })
    .state('order', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/order/:id',
      templateUrl: 'scripts/app/modules/views/pedido.template.html',
      controller: 'pedidoCtrl',
      controllerAs: '$ctrl'
    })
    .state('orderEdit', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/order/edit/:id',
      templateUrl: 'scripts/app/modules/views/pedido.template.html',
      controller: 'pedidoCtrl',
      controllerAs: '$ctrl'
    })
    .state('orderList', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/orders',
      templateUrl: 'scripts/app/modules/views/pedido-list.template.html',
      controller: 'pedidoListCtrl',
      controllerAs: '$ctrl'
    })
    .state('ventas', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/ventas',
      templateUrl: 'scripts/app/modules/views/venta.template.html',
      controller: 'ventaCtrl',
      controllerAs: '$ctrl'
    })
    .state('export', {
      resolve:{
        userinfo: get_user_info
      },
      url: '/export',
      templateUrl: 'scripts/app/modules/views/export.template.html',
      controller: 'exportCtrl',
      controllerAs: '$ctrl'
    })
    .state('categoriagrid', {
      resolve: {
        userinfo: get_user_info
      },
      url: '/category/grid',
      templateUrl: "scripts/app/modules/views/categoria-grid.template.html",
      controller: 'categoriaGridCtrl',
      controllerAs: '$ctrl'
    })
    .state('categorialist', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/category/list',
      templateUrl: 'scripts/app/modules/views/categoria-list.template.html',
      controller: 'categoriaListCtrl',
      controllerAs: '$ctrl'
    })
    .state('addCategoria', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/category',
      templateUrl: 'scripts/app/modules/views/categoria.template.html',
      controller: 'categoriaCtrl',
      controllerAs: '$ctrl'
    })
    .state('editCategoria', {
      resolve:{
        userinfo:get_user_info
      },
      url: '/category/edit/:id',
      templateUrl: 'scripts/app/modules/views/categoria.template.html',
      controller: 'categoriaCtrl',
      controllerAs: '$ctrl'
    })


    .state('users', {
      resolve:{
        userinfo: get_user_info
      },
      url: '/user/list',
      templateUrl: 'scripts/app/modules/views/usuarios.template.html',
      controller: 'userCtrl',
      controllerAs: '$ctrl'
    })
  })
})();
