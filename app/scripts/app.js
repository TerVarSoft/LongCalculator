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
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
    .when('/calculator/:mode', {
        templateUrl: 'views/calculator.html',
        controller: 'calculatorCtrl'
    })
      .when('/windows', {
        templateUrl: 'views/windows.html',
        controller: 'windowsCtrl'
      })
    .when('/glasses', {
        templateUrl: 'views/glasses.html',
        controller: 'glassesCtrl'
      })
    .when('/cuts', {
        templateUrl: 'views/cuts.html',
        controller: 'cutsCtrl'
      })
      .otherwise({
        redirectTo: '/windows'
      });
  }]);
