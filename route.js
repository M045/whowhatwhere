var routerApp = angular.module('routerApp', ['ui.router', 'ngMap']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'mapController'
        })
        .state('map', {
            url: '/map/:location/:item',
            templateUrl: 'views/map.html',
            controller: 'mapController'
        });
});