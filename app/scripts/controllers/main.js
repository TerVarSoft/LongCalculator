'use strict';

/**
 * @ngdoc function
 * @name longCalculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the longCalculatorApp
 */
angular.module('longCalculatorApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
