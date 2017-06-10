(function () {
    'use strict';
    angular.module('tiendaexclusiva').directive('tiendaMenu',function(){
        return {
            required: 'field',
            restrict : 'E',
            scope: {
              user: '='
            },
            templateUrl:'scripts/app/partials/tienda-menu.html',
            link: function ($scope, $element, $args) {
                // MetisMenu
                $('#side-menu').metisMenu();

                // $("body").removeClass("skin-1");
                // $("body").removeClass("skin-2");
                // $("body").addClass("skin-3");
                //
                // $("body").addClass('boxed-layout');
                // $('#fixednavbar').prop('checked', false);
                // $('#fixednavbar2').prop('checked', false);
                // $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
                // $("body").removeClass('fixed-nav');
                // $("body").removeClass('fixed-nav-basic');
                // $(".footer").removeClass('fixed');
                // $('#fixedfooter').prop('checked', false);

            }
        };
    });
})();
