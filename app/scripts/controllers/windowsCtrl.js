'use strict';

angular.module('longCalculatorApp')
  .controller('windowsCtrl', function ($scope, $http, windowsInfo) {
    var removeTemplate = '<span class="glyphicon glyphicon-trash" ng-click="grid.appScope.removeRow(row)" />';

    $scope.mySelections = [];
    
    var windowsData = windowsInfo.getWindows();
    $scope.configData = windowsInfo.getConfig();
    
    $scope.gridOptions = {
        data: windowsData,
        enableCellSelection: true,
        enableCellEdit: true,
        enableRowSelection: false,
        enableColumnResize: true,
        
        columnDefs: [{field: 'remove', displayName: '', cellTemplate: removeTemplate},
                     {field: 'name', displayName: 'Ventana', width: 200},
                     {field: 'rielSuperior', displayName:'Riel Superior'},
                     {field: 'rielInferior', displayName:'Riel Inferior'},
                     {field: 'jamba', displayName:'Jamba'},
                     {field: 'gancho', displayName:'Gancho'},
                     {field: 'cabezal', displayName:'Cabezal'},
                     {field: 'socalo', displayName:'Socalo'}]
        };
    
    $scope.configGridOptions = {
        data: $scope.configData,
        //enableCellSelection: true,
        //enableCellEdit: true,
        //enableRowSelection: false,
        enableColumnResize: true,
        
        columnDefs: [{field: 'property', displayName: 'Propiedad', width: 200},
                     {field: 'rielSuperior', displayName:'Riel Superior'},
                     {field: 'rielInferior', displayName:'Riel Inferior'},
                     {field: 'jamba', displayName:'Jamba'},
                     {field: 'gancho', displayName:'Gancho'},
                     {field: 'cabezal', displayName:'Cabezal'},
                     {field: 'socalo', displayName:'Socalo'}]
        };
    
    $scope.addNewWindow = function() {
        windowsData.push({name: 'Ventana '+windowsInfo.windowNumber, jamba: '', rielSuperior: '', rielInferior: ''});
        windowsInfo.incrementNumberWindow();
    };
    
    $scope.removeRow = function(row){
      var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
    }
    
    $scope.saveData = function() {
        windowsInfo.saveData(windowsData, $scope.configData);
    }
  });
    
    
    

