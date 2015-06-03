'use strict';

/**
 * @ngdoc function
 * @name longCalculatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the longCalculatorApp
 */
angular.module('longCalculatorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
