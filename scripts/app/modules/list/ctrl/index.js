(function () {
'use strict';
angular.module('krowdy-positions')
.controller('prodListCtrl', function (userinfo){
  var $ctrl = this;
  $(document).ready(function() {
    $('.footable').footable();
  });
});
})();
