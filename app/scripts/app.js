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
    'ngRoute'
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
      .otherwise({
        redirectTo: '/'
      });
  });
