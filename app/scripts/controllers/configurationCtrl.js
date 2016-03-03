'use strict';

angular.module('longCalculatorApp')
  .controller('configurationCtrl', ['$scope', 'windowsInfo', 'cutsInfo', 'moment', 'download',
    function ($scope, windowsInfo, cutsInfo, moment, download) {

    $scope.exportJson = function()
    {
        var currentDate = moment().format("YYYYMMDD_HHmmss dddd");

        var objectToPersist =  {
            currentDate: currentDate,
            windows: windowsInfo.getWindows(),
            windowsConfig: windowsInfo.getConfig(),
            cuts: cutsInfo.getCuts(),
            cutsConfig: cutsInfo.getConfig() 
        }
        download.fromData(JSON.stringify(objectToPersist), "application/json", currentDate + "-LongCalculator.json");

    }
}]);