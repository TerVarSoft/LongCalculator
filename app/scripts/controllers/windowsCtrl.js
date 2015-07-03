'use strict';

angular.module('longCalculatorApp')
  .controller('windowsCtrl', function ($scope, windowsInfo, windowsFactory) {
    $scope.numberFrames = ["2", "3", "4"];
    $scope.lines = ["Linea 20", "Linea 25"];
    $scope.newWindowProperties = {};
    $scope.newWindowProperties.numberFrames = $scope.numberFrames[0];
    $scope.newWindowProperties.line = $scope.lines[0];
    $scope.equation = '';
    $scope.error = '';
    
    var longColumnsWidth = 70;
    var quantityColumnsWidth = 45;
    var configurationColumnsWidth = 120;
    
    var windowsData = windowsInfo.getWindows();
    var configData = windowsInfo.getConfig();
    
    $scope.gridOptions = {
        rowData: windowsData,
        rowSelection: 'single',
        angularCompileRows: true,
        groupHeaders: true,
        
        columnDefs: [
            {
                field: 'name',
                headerName: 'Nombre',
                group: 'Ventanas',
                editable: false,
                width: 150
            },
            {
                field: 'line',
                headerName: 'Nº',
                group: 'Linea',
                editable: false,
                width: 70
            },
            {
                field: 'numberFrames',
                headerName: 'Cantidad',
                group: 'Hojas',
                editable: false,
                width: 70
            },
            {
                field: 'rielSuperior',
                headerName:'Longitud',
                group: 'Riel Superior',
                editable: false,
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
                 editable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.rielSuperior.quantity'
             },
             {
                 field: 'rielInferior',
                 headerName:'Longitud',
                 group: 'Riel Inferior',
                 editable: false,
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
                 editable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.rielInferior.quantity'
             },   
             {
                 field: 'jamba',
                 headerName:'Longitud',
                 group: 'Jamba',
                 editable: false,
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
                 editable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.jamba.quantity'
             },
             {
                 field: 'pierna',
                 headerName:'Longitud',
                 group: 'Pierna',
                 editable: false,
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
                 ditable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.pierna.quantity'
             },
             {
                 field: 'gancho',
                 headerName:'Longitud',
                 group: 'Gancho',
                 editable: false,
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
                 editable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.gancho.quantity'
             },
             {
                 field: 'cabezalFijo',
                 headerName:'Longitud',
                 group: 'Cabezal F.',
                 editable: false,
                 width: longColumnsWidth,
                 valueGetter : 'data.cabezalFijo.long',
                 cellRenderer: function(params) {
                    params.$scope.cabezalFijo = "cabezalFijo";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, cabezalFijo)">' + params.value + '</div>';
                }
             },
             {
                 field: 'cabezalFijo',
                 headerName:'Nº',
                 group: 'Cabezal F.',
                 editable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.cabezalFijo.quantity'
             },
             {
                 field: 'socaloFijo',
                 headerName:'Longitud',
                 group: 'Socalo F.',
                 editable: false,
                 width: longColumnsWidth,
                 valueGetter : 'data.socaloFijo.long',
                 cellRenderer: function(params) {
                    params.$scope.socaloFijo = "socaloFijo";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, socaloFijo)">' + params.value + '</div>';
                }
             },
             {
                 field: 'socaloFijo',
                 headerName:'Nº',
                 group: 'Socalo F.',
                 editable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.socaloFijo.quantity'
             },
             {
                 field: 'cabezalCorredizo',
                 headerName:'Longitud',
                 group: 'Cabezal C.',
                 editable: false,
                 width: longColumnsWidth,
                 valueGetter : 'data.cabezalCorredizo.long',
                 cellRenderer: function(params) {
                    params.$scope.cabezalCorredizo = "cabezalCorredizo";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, cabezalCorredizo)">' + params.value + '</div>';
                }
             },
             {
                 field: 'cabezalCorredizo',
                 headerName:'Nº',
                 group: 'Cabezal C.',
                 editable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.cabezalCorredizo.quantity'
             },
             {
                 field: 'socaloCorredizo',
                 headerName:'Longitud',
                 group: 'Socalo C.',
                 editable: true,
                 width: longColumnsWidth,
                 valueGetter : 'data.socaloCorredizo.long',
                 cellRenderer: function(params) {
                    params.$scope.socaloCorredizo = "socaloCorredizo";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, socaloCorredizo)">' + params.value + '</div>';
                }
             },
             {
                 field: 'socaloCorredizo',
                 headerName:'Nº',
                 group: 'Socalo C.',
                 editable: false,
                 width: quantityColumnsWidth,
                 valueGetter : 'data.socaloCorredizo.quantity'
             }
        ]
    };
    
    $scope.configGridOptions = {
        rowData: configData,
        
        columnDefs: [
            {
                field: 'property',
                headerName: 'Propiedad',
                editable: true,
                width: configurationColumnsWidth
            },
            {
                field: 'rielSuperior',
                headerName:'Riel Superior',
                editable: true,
                width: configurationColumnsWidth
            },
            {
                field: 'rielInferior',
                headerName:'Riel Inferior',
                editable: true,
                width: configurationColumnsWidth
            },
            {
                field: 'jamba',
                headerName:'Jamba',
                editable: true,
                width: configurationColumnsWidth
            },
            {
                field: 'pierna',
                headerName:'Pierna',
                editable: true,
                width: configurationColumnsWidth
            },
            {
                field: 'gancho',
                headerName:'Gancho',
                editable: true,
                width: configurationColumnsWidth
            },
            {
                field: 'cabezal',
                headerName:'Cabezal',
                editable: true,
                width: configurationColumnsWidth
            },
            {
                field: 'socalo',
                headerName:'Socalo',
                editable: true,
                width: configurationColumnsWidth}]
        };
    
    $scope.addNewWindow = function() {
        var window = windowsFactory.newWindow($scope.newWindowProperties.name,
                                              $scope.newWindowProperties.width,
                                              $scope.newWindowProperties.height,
                                              $scope.newWindowProperties.wallLoss,
                                              $scope.newWindowProperties.numberFrames,
                                              $scope.newWindowProperties.line);
        verifyLongs(window);
        
        if($scope.error == '') {
            windowsData.push(window);
        
            windowsInfo.incrementNumberWindow();
        }
        
        
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
    
    function verifyLongs(window) {
        var configs = $scope.configGridOptions.rowData[0];
        var partsOfWindow = _.reject(_.keys(configs), function(property) { return property == "property"; });
        
        
        for(var i = 0; i < partsOfWindow.length; i++) {
            var element = partsOfWindow[i];
            
            if(element == "cabezal" || element == "socalo") {
                if(window[element + "Fijo"].long > configs[element] || window[element + "Corredizo"].long > configs[element]) {
                    $scope.error = 'El ancho o el alto es demasiado grande, longitud de las barra ' + element + ' muy pequeño';
                    return;
                }
            }
            
            else if(window[element].long > configs[element]) {
                $scope.error = 'El ancho o el alto es demasiado grande, longitud de las barra ' + element + ' muy pequeño';
                return;
            }
            else {
                $scope.error = '';
            }
        }
    }
  });
    
    
    

