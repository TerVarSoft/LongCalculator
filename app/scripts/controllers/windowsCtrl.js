'use strict';

angular.module('longCalculatorApp')
  .controller('windowsCtrl', function ($scope, windowsInfo, windowsFactory) {
    $scope.numberFrames = [2, 3, 4];
    $scope.lines = [20, 25];
    $scope.equation = '';
    
    var longColumnsWidth = 70;
    var quantityColumnsWidth = 45;
    var configurationColumnsWidth = 120;
    
    var windowsData = windowsInfo.getWindows();
    var configData = windowsInfo.getConfig();
    
    $scope.gridOptions = {
        columnDefs: [
            {
                field: 'name',
                headerName: 'Ventana',
                group: 'Ventanas',
                editable: true,
                width: 150
            },
            {
                field: 'rielSuperior',
                headerName:'Longitud',
                group: 'Riel Superior',
                editable: true,
                width: longColumnsWidth,
                valueGetter : 'data.rielSuperior.long',
                cellRenderer: function(params) {
                    params.$scope.rielSuperior = "rielSuperior";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, rielSuperior)">' + params.value + '</div>';
                }
             },
             {
                 field: 'rielSuperior',
                 headerName:'Nº',
                 group: 'Riel Superior',
                 editable: true,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.rielSuperior.quantity'
             },
             {
                 field: 'rielInferior',
                 headerName:'Longitud',
                 group: 'Riel Inferior',
                 editable: true,
                 width: longColumnsWidth,
                 valueGetter : 'data.rielInferior.long',
                 cellRenderer: function(params) {
                    params.$scope.rielInferior = "rielInferior";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, rielInferior)">' + params.value + '</div>';
                }
             },
             {
                 field: 'rielInferior',
                 headerName:'Nº',
                 group: 'Riel Inferior',
                 editable: true,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.rielInferior.quantity'
             },   
             {
                 field: 'jamba',
                 headerName:'Longitud',
                 group: 'Jamba',
                 editable: true,
                 width: longColumnsWidth,
                 valueGetter : 'data.jamba.long',
                 cellRenderer: function(params) {
                    params.$scope.jamba = "jamba";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, jamba)">' + params.value + '</div>';
                }
             },
             {
                 field: 'jamba',
                 headerName:'Nº',
                 group: 'Jamba',
                 editable: true,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.jamba.quantity'
             },
             {
                 field: 'pierna',
                 headerName:'Longitud',
                 group: 'Pierna',
                 editable: true,
                 width: longColumnsWidth,
                 valueGetter : 'data.pierna.long',
                 cellRenderer: function(params) {
                    params.$scope.pierna = "pierna";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, pierna)">' + params.value + '</div>';
                }
             },
             {
                 field: 'pierna',
                 headerName:'Nº',
                 group: 'Pierna', 
                 ditable: true,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.pierna.quantity'
             },
             {
                 field: 'gancho',
                 headerName:'Longitud',
                 group: 'Gancho',
                 editable: true,
                 width: longColumnsWidth,
                 valueGetter : 'data.gancho.long',
                 cellRenderer: function(params) {
                    params.$scope.gancho = "gancho";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, gancho)">' + params.value + '</div>';
                }
             },
             {
                 field: 'gancho',
                 headerName:'Nº',
                 group: 'Gancho',
                 editable: true,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.gancho.quantity'
             },
             {
                 field: 'cabezal',
                 headerName:'Longitud',
                 group: 'Cabezal',
                 editable: true,
                 width: longColumnsWidth,
                 valueGetter : 'data.cabezal.long',
                 cellRenderer: function(params) {
                    params.$scope.cabezal = "cabezal";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, cabezal)">' + params.value + '</div>';
                }
             },
             {
                 field: 'cabezal',
                 headerName:'Nº',
                 group: 'Cabezal',
                 editable: true,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.cabezal.quantity'
             },
             {
                 field: 'socalo',
                 headerName:'Longitud',
                 group: 'Socalo',
                 editable: true,
                 width: longColumnsWidth,
                 valueGetter : 'data.socalo.long',
                 cellRenderer: function(params) {
                    params.$scope.socalo = "socalo";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, socalo)">' + params.value + '</div>';
                }
             },
             {
                 field: 'socalo',
                 headerName:'Nº',
                 group: 'Socalo',
                 editable: true,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.socalo.quantity'
             }
        ],
   
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
        var window = windowsFactory.newWindow($scope.newWindowProperties.name, $scope.newWindowProperties.width, $scope.newWindowProperties.height, $scope.newWindowProperties.wallLoss, $scope.newWindowProperties.numberFrames);
        windowsData.push(window);
        
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
    
    $scope.showEquation = function(data, partOfWindowName){
        $scope.equation = data[partOfWindowName].equation;
    }
  });
    
    
    

