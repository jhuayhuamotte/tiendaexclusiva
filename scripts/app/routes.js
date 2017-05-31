(function () {
  'use strict';
  angular.module('krowdy-positions')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/puestos/');
    $stateProvider
    .state('puestos', {
      url: '/puestos/:offset',
      templateUrl: "scripts/app/modules/grid/views/index.html",
      controller: 'positionCtrl',
      controllerAs: '$ctrl'
    })
    .state('productlist', {
      url: '/list',
      templateUrl: 'scripts/app/modules/list/views/index.html',
      controller: 'prodListCtrl',
      controllerAs: '$ctrl'
    })
  })
})();
