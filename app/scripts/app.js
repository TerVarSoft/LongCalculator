'use strict';

/**
 * @ngdoc overview
 * @name longCalculatorApp
 * @description
 * # longCalculatorApp
 *
 * Main module of the application.
 */
angular
  .module('longCalculatorApp', [
    'ngRoute',
    'ngAnimate',
    'angularGrid'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
    .when('/calculator', {
        templateUrl: 'views/calculator.html',
        controller: 'calculatorCtrl'
    })
      .when('/windows', {
        templateUrl: 'views/windows.html',
        controller: 'windowsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
