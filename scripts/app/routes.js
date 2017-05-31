(function () {
  'use strict';
  angular.module('krowdy-positions')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/puestos/');
    $stateProvider
    .state('puestos', {
      resolve:{
        userinfo:function($http){
          return $http({ method: 'GET', url:'/session-user'})
         .then(function (response) {
           return response.data.user;
         });
       }
      },
      url: '/puestos/:offset',
      templateUrl: "scripts/app/modules/grid/views/index.html",
      controller: 'positionCtrl',
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
  })
})();
