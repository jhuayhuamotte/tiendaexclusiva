(function () {
  'use strict';
  angular.module('tiendaexclusiva').controller('prodListCtrl', function (userinfo){
    var $ctrl = this;
    $(document).ready(function() {
      $('.footable').footable();
    });
  });
})();
