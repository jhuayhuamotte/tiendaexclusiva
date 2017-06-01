(function () {
  'use strict';
  angular.module('tiendaexclusiva').
  factory('onets',function($http){
    var onets = {};
    onets.value = {};
    onets.valueModal = {};

    onets.getById = function(id_onet,modal){
      return $http.get('/api/v1/onets/'+id_onet)
      .success(function(response){
        if(modal){
          angular.copy(response,onets.valueModal);
        }else{
          angular.copy(response,onets.value);
        }
      }).error(function(err){
        console.error("Error en onets.getById: ", err);
      })
    }

    return onets;
  }).
  factory('jobzone', function($http){
    var jobzone = {};
    jobzone.value = {};
    jobzone.valueModal = {};

    jobzone.getById = function(id,modal){
      return $http.get('/api/info/jobzone/'+id).success(function(response){
        if(modal){
          angular.copy(response, jobzone.valueModal);
        }else{
          angular.copy(response, jobzone.value);
        }
      }).error(function(err){
        console.error("Error en jobzone.getById: ", err);
      })
    }

    return jobzone;
  })
})();
