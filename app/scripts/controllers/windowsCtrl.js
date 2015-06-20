'use strict';

angular.module('longCalculatorApp')
  .controller('windowsCtrl', function ($scope, $http, windowsInfo) {
    var removeTemplate = '<span class="glyphicon glyphicon-trash" ng-click="grid.appScope.removeRow(row)" />';
    
    var numberWindow = 1;
    $scope.mySelections = [];
    
    var windowsData = [{name: 'Sala', jamba: 526, rielSuperior: 1500, rielInferior: 150, jamba: 150, gancho: 358, cabezal: 459, socalo: 458},
                       {name: 'Cocina', jamba: 1324, rielSuperior: 230, rielInferior: 2342, jamba: 150, gancho: 358, cabezal: 459, socalo: 458}];
    
    $scope.gridOptions = {
        data: windowsData,
        enableCellSelection: true,
        enableCellEdit: true,
        enableRowSelection: false,
        enableColumnResize: true,
        
        columnDefs: [{field: 'remove', displayName: '', cellTemplate: removeTemplate},
                     {field: 'name', displayName: 'Ventana'},
                     {field: 'rielSuperior', displayName:'Riel Superior'},
                     {field: 'rielInferior', displayName:'Riel Inferior'},
                     {field: 'jamba', displayName:'Jamba'},
                     {field: 'gancho', displayName:'Gancho'},
                     {field: 'cabezal', displayName:'Cabezal'},
                     {field: 'socalo', displayName:'Socalo'}]
        };
    
    $scope.addNewWindow = function() {
        windowsData.push({name: 'Ventana '+numberWindow, jamba: '', rielSuperior: '', rielInferior: ''});
        numberWindow++;
    };
    
    $scope.removeRow = function(row){
      var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
    }
    
    $scope.saveData = function() {
        windowsInfo.saveData(windowsData);
    }
  });
    
    
    

