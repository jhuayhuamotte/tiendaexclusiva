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
