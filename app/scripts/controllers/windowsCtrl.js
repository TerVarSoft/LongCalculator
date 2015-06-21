'use strict';

angular.module('longCalculatorApp')
  .controller('windowsCtrl', function ($scope, windowsInfo) {
    var longColumnsWidth = 70;
    var quantityColumnsWidth = 45;
    var configurationColumnsWidth = 120;
    
    var windowsData = windowsInfo.getWindows();
    var configData = windowsInfo.getConfig();
    
    $scope.gridOptions = {
        columnDefs: [{field: 'name', headerName: 'Ventana', group: 'Ventanas', editable: true, width: 150},
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
        rowSelection: 'single',
        angularCompileRows: true,
        groupHeaders: true,
    };
    
    $scope.configGridOptions = {
        rowData: configData,
        
        columnDefs: [{field: 'property', headerName: 'Propiedad', editable: true, width: configurationColumnsWidth},
                     {field: 'rielSuperior', headerName:'Riel Superior', editable: true, width: configurationColumnsWidth},
                     {field: 'rielInferior', headerName:'Riel Inferior', editable: true, width: configurationColumnsWidth},
                     {field: 'jamba', headerName:'Jamba', editable: true, width: configurationColumnsWidth},
                     {field: 'gancho', headerName:'Gancho', editable: true, width: configurationColumnsWidth},
                     {field: 'cabezal', headerName:'Cabezal', editable: true, width: configurationColumnsWidth},
                     {field: 'socalo', headerName:'Socalo', editable: true, width: configurationColumnsWidth}]
        };
    
    $scope.addNewWindow = function() {
        windowsData.push({name: 'Ventana '+windowsInfo.windowNumber,
                          rielSuperior: '',
                          rielSuperiorQuantity: 1,
                          rielInferior: '',
                          rielInferiorQuantity: 1,
                          jamba: '',
                          jambaQuantity: 1,
                          gancho: '',
                          ganchoQuantity: 1,
                          cabezal: '',
                          cabezalQuantity: 1,
                          socalo: '',
                          socaloQuantity: 1});
        
        windowsInfo.incrementNumberWindow();
        $scope.gridOptions.api.onNewRows();
    };
    
    $scope.removeWindow = function(){
        var selectedWindow = $scope.gridOptions.selectedRows[0];
        var selectedId = windowsData.indexOf(selectedWindow);
        windowsData.splice(selectedId, 1);
        $scope.gridOptions.api.onNewRows();
    }
    
    $scope.saveData = function() {
        windowsInfo.saveData(windowsData, configData);
    }
  });
    
    
    

