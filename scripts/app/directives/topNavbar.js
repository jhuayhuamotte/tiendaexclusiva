(function () {
    'use strict';
    angular.module('tiendaexclusiva').directive('topNavbar',function(){
        return {
            required: 'field',
            restrict : 'E',
            scope: {

            },
            templateUrl:'scripts/app/partials/top-navbar.html',
            link: function ($scope, $element, $args) {
                $(document).ready(function (){
                    $('.navbar-minimalize').on('click', function () {
                        console.log("navbar: ", $("body"));
                        $("body").toggleClass("mini-navbar");
                        SmoothlyMenu();

                    });

                    function SmoothlyMenu() {
                        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                            // Hide menu in order to smoothly turn on when maximize menu
                            $('#side-menu').hide();
                            // For smoothly turn on menu
                            setTimeout(
                                function () {
                                    $('#side-menu').fadeIn(400);
                                }, 200);
                        } else if ($('body').hasClass('fixed-sidebar')) {
                            $('#side-menu').hide();
                            setTimeout(
                                function () {
                                    $('#side-menu').fadeIn(400);
                                }, 100);
                        } else {
                            // Remove all inline style from jquery fadeIn function to reset menu state
                            $('#side-menu').removeAttr('style');
                        }
                    }
                });
            }
        };
    });
})();
