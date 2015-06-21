'use strict';

angular.module('longCalculatorApp')
  .controller('windowsCtrl', function ($scope, $http, windowsInfo) {
    var removeTemplate = '<i class="glyphicon glyphicon-trash" ng-click="removeRow(row)" />';
    var longColumnsWidth = 70;
    var quantityColumnsWidth = 40;
    
    var windowsData = windowsInfo.getWindows();
    
    $scope.gridOptions = {
        columnDefs: [{field: 'remove', headerName: '', group: 'Ventanas', template: removeTemplate, width: 30},
                     {field: 'name', headerName: 'Ventana', group: 'Ventanas', editable: true, width: 150},
                     {field: 'rielSuperior', headerName:'Longitud', group: 'Riel Superior', editable: true, width: longColumnsWidth},
                     {field: 'rielSuperiorQuantity', headerName:'Nº', group: 'Riel Superior', editable: true, width: quantityColumnsWidth},
                     {field: 'rielInferior', headerName:'Longitud', group: 'Riel Inferior', editable: true, width: longColumnsWidth},
                     {field: 'rielInferiorQuantity', headerName:'Nº', group: 'Riel Inferior', editable: true, width: quantityColumnsWidth},
                     {field: 'jamba', headerName:'Longitud', group: 'Jamba', editable: true, width: longColumnsWidth},
                     {field: 'jambaQuantity', headerName:'Nº', group: 'Jamba', editable: true, width: quantityColumnsWidth},
                     {field: 'gancho', headerName:'Longitud', group: 'Gancho', editable: true, width: longColumnsWidth},
                     {field: 'ganchoQuantity', headerName:'Nº', group: 'Gancho', editable: true, width: quantityColumnsWidth},
                     {field: 'cabezal', headerName:'Longitud', group: 'Cabezal', editable: true, width: longColumnsWidth},
                     {field: 'cabezalQuantity', headerName:'Nº', group: 'Cabezal', editable: true, width: quantityColumnsWidth},
                     {field: 'socalo', headerName:'Longitud', group: 'Socalo', editable: true, width: longColumnsWidth},
                     {field: 'socaloQuantity', headerName:'Nº', group: 'Socalo', editable: true, width: quantityColumnsWidth}],
   
        rowData: windowsData,
        angularCompileRows: true,
        groupHeaders: true,
    };
    
    $scope.addNewWindow = function() {
        windowsData.push({name: 'Ventana '+windowsInfo.windowNumber,
                          rielSuperior: '',
                          rielSuperiorQuantity: '',
                          rielInferior: '',
                          rielInferiorQuantity: '',
                          jamba: '',
                          jambaQuantity: '',
                          gancho: '',
                          ganchoQuantity: '',
                          cabezal: '',
                          cabezalQuantity: '',
                          socalo: '',
                          socaloQuantity: ''});
        
        windowsInfo.incrementNumberWindow();
        $scope.gridOptions.api.onNewRows();
    };
    
    $scope.removeRow = function(row){
        var index = $scope.windowsData.indexOf(row.entity);
        windowsData.splice(1, 1);
//        $scope.gridOptions.api.onNewRows();
    }
    
    $scope.saveData = function() {
        windowsInfo.saveData(windowsData);
    }
  });
    
    
    

