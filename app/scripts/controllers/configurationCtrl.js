'use strict';

angular.module('longCalculatorApp')
  .controller('configurationCtrl', ['$scope', '$location', 'moment', 'download', '$window', 'generalConfig', 'windowsInfo', 'cutsInfo', 
    function ($scope, $location, moment, download, $window, generalConfig, windowsInfo, cutsInfo) {

    $scope.enableLoadingFiles = generalConfig.enableLoadingFiles;

    // Export File
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

    // Import file
    function handleFileSelect(evt) {
        
        var jsonResult;
        var file = evt.target.files[0]; 

        var reader = new FileReader();  

        reader.onload = (function (theFile) {
            return function (e) {
                console.log('e readAsText = ', e);
                console.log('e readAsText target = ', e.target);
                try {
                    jsonResult = JSON.parse(e.target.result);
                    cutsInfo.saveData(jsonResult.cuts, jsonResult.cutsConfig);
                    windowsInfo.saveData(jsonResult.windows, jsonResult.windowsConfig);
                    redirectWhenSuccesfullyLoading(jsonResult);                    
                } catch (ex) {
                    alert('Error al leer el archivo de configuracion ' + ex);
                }
            }
        })(file);

        reader.readAsText(file);  
    }
    document.getElementById('import').addEventListener('change', handleFileSelect, false);

    function redirectWhenSuccesfullyLoading(jsonResult)
    {
        if(jsonResult.windows.length > 0) {
            $window.location.href = '#/windows';
        }
        else {
            $window.location.href = '#/cuts';
        }
    }
}]);