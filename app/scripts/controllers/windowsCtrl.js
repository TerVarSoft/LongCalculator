'use strict';

angular.module('longCalculatorApp')
  .controller('windowsCtrl', ['$scope', 'windowsInfo', 'windowsFactory', 'glassesInfo', 'download', 'moment',
    function ($scope, windowsInfo, windowsFactory, glassesInfo, download, moment) {

    $scope.numberFrames = ["2", "3", "4"];
    $scope.lines = ["Linea 20", "Linea 25"];
    $scope.newWindowProperties = {};
    $scope.newWindowProperties.numberFrames = $scope.numberFrames[0];
    $scope.newWindowProperties.line = $scope.lines[0];
    $scope.stickTypes = windowsInfo.getWindowsPartsNames();
    $scope.configurations = {};
    $scope.configurations.stickType = $scope.stickTypes[0];
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
                headerGroup: 'Ventanas',
                editable: false,
                width: 150,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'width',
                headerName: 'Ancho',
                headerGroup: 'Ventanas',
                editable: false,
                width: 70,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'height',
                headerName: 'Alto',
                headerGroup: 'Ventanas',
                editable: false,
                width: 70,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'wallLoss',
                headerName: 'P/Pared',
                headerGroup: 'Ventanas',
                editable: false,
                width: 70,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'line',
                headerName: 'Nº',
                headerGroup: 'Linea',
                editable: false,
                width: 70,
                cellStyle: createCellStyle('255, 0, 0')
            },
            {
                field: 'numberFrames',
                headerName: 'Cantidad',
                headerGroup: 'Hojas',
                editable: false,
                width: 70,
                cellStyle: createCellStyle('0, 255, 0')
            },
            {
                field: 'rielSuperior',
                headerName:'Longitud',
                headerGroup: 'Riel Superior',
                editable: false,
                width: longColumnsWidth,
                cellStyle: createCellStyle('165, 42, 42'),
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
                 headerGroup: 'Riel Superior',
                 editable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('165, 42, 42'),
                 valueGetter : 'data.rielSuperior.quantity'
             },
             {
                 field: 'rielInferior',
                 headerName:'Longitud',
                 headerGroup: 'Riel Inferior',
                 editable: false,
                 width: longColumnsWidth,
                 cellStyle: createCellStyle('255, 165, 0'),
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
                 headerGroup: 'Riel Inferior',
                 editable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('255, 165, 0'),
                 valueGetter : 'data.rielInferior.quantity'
             },   
             {
                 field: 'jamba',
                 headerName:'Longitud',
                 headerGroup: 'Jamba',
                 editable: false,
                 width: longColumnsWidth,
                 cellStyle: createCellStyle('102, 0, 102'),
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
                 headerGroup: 'Jamba',
                 editable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('102, 0, 102'),
                 valueGetter : 'data.jamba.quantity'
             },
             {
                 field: 'pierna',
                 headerName:'Longitud',
                 headerGroup: 'Pierna',
                 editable: false,
                 width: longColumnsWidth,
                 cellStyle: createCellStyle('204, 153, 0'),
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
                 headerGroup: 'Pierna', 
                 ditable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('204, 153, 0'),
                 valueGetter : 'data.pierna.quantity'
             },
             {
                 field: 'gancho',
                 headerName:'Longitud',
                 headerGroup: 'Gancho',
                 editable: false,
                 width: longColumnsWidth,
                 cellStyle: createCellStyle('102, 102, 255'),
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
                 headerGroup: 'Gancho',
                 editable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('102, 102, 255'),
                 valueGetter : 'data.gancho.quantity'
             },
             {
                 field: 'cabezalFijo',
                 headerName:'Longitud',
                 headerGroup: 'Cabezal F.',
                 editable: false,
                 width: longColumnsWidth,
                 cellStyle: createCellStyle('255, 255, 0'),
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
                 headerGroup: 'Cabezal F.',
                 editable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('255, 255, 0'),
                 valueGetter : 'data.cabezalFijo.quantity'
             },
             {
                 field: 'socaloFijo',
                 headerName:'Longitud',
                 headerGroup: 'Socalo F.',
                 editable: false,
                 width: longColumnsWidth,
                 cellStyle: createCellStyle('0, 153, 204'),
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
                 headerGroup: 'Socalo F.',
                 editable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('0, 153, 204'),
                 valueGetter : 'data.socaloFijo.quantity'
             },
             {
                 field: 'cabezalCorredizo',
                 headerName:'Longitud',
                 headerGroup: 'Cabezal C.',
                 editable: false,
                 width: longColumnsWidth,
                 valueGetter : 'data.cabezalCorredizo.long',
                 cellStyle: createCellStyle('153, 255, 51'),
                 cellRenderer: function(params) {
                    params.$scope.cabezalCorredizo = "cabezalCorredizo";
                    params.$scope.data = params.data;
                    return '<div ng-click="showEquation(data, cabezalCorredizo)">' + params.value + '</div>';
                }
             },
             {
                 field: 'cabezalCorredizo',
                 headerName:'Nº',
                 headerGroup: 'Cabezal C.',
                 editable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('153, 255, 51'),
                 valueGetter : 'data.cabezalCorredizo.quantity'
             },
             {
                 field: 'socaloCorredizo',
                 headerName:'Longitud',
                 headerGroup: 'Socalo C.',
                 editable: true,
                 width: longColumnsWidth,
                 cellStyle: createCellStyle('102, 153, 153'),
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
                 headerGroup: 'Socalo C.',
                 editable: false,
                 width: quantityColumnsWidth,
                 cellStyle: createCellStyle('102, 153, 153'),
                 valueGetter : 'data.socaloCorredizo.quantity'
             }
        ]
    };
    
    $scope.configGridOptions = {
        rowData: configData,
        rowSelection: 'single',
        
        columnDefs: [
            {
                field: 'property',
                headerName: 'Propiedad',
                editable: true,
                width: configurationColumnsWidth,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'rielSuperior',
                headerName:'Riel Superior',
                editable: true,
                width: configurationColumnsWidth,
                cellStyle: createCellStyle('165, 42, 42')
            },
            {
                field: 'rielInferior',
                headerName:'Riel Inferior',
                editable: true,
                width: configurationColumnsWidth,
                cellStyle: createCellStyle('255, 165, 0')
            },
            {
                field: 'jamba',
                headerName:'Jamba',
                editable: true,
                width: configurationColumnsWidth,
                cellStyle: createCellStyle('102, 0, 102')
            },
            {
                field: 'pierna',
                headerName:'Pierna',
                editable: true,
                width: configurationColumnsWidth,
                cellStyle: createCellStyle('204, 153, 0')
            },
            {
                field: 'gancho',
                headerName:'Gancho',
                editable: true,
                width: configurationColumnsWidth,
                cellStyle: createCellStyle('102, 102, 255')
            },
            {
                field: 'cabezal',
                headerName:'Cabezal',
                editable: true,
                width: configurationColumnsWidth,
                cellStyle: createCellStyle('255, 255, 0')
            },
            {
                field: 'socalo',
                headerName:'Socalo',
                editable: true,
                width: configurationColumnsWidth,
                cellStyle: createCellStyle('0, 153, 204')
            }
        ]
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
            glassesInfo.addGlass(window);
        }
          
        $scope.gridOptions.api.onNewRows();
    };
    
    $scope.removeWindow = function(){
        var selectedWindow = $scope.gridOptions.selectedRows[0];
        var selectedId = windowsData.indexOf(selectedWindow);
        windowsInfo.removeWindow(selectedId);
        $scope.gridOptions.api.onNewRows();
    }
    
    $scope.saveData = function() {
        windowsInfo.saveData(windowsData, configData);
    }

    // Files Managment Functions
    $scope.exportJson = function()
    {
        var currentDate = moment().format("YYYYMMDD_HHmmss dddd");

        var objectToPersist =  {
            currentDate: currentDate,
            windows: windowsData,
            config: configData 
        }
        download.fromData(JSON.stringify(objectToPersist), "application/json", currentDate + "-LongCalculator.json");

        /*var currentDate = moment().format("YYYYMMDD_HHmmss dddd");
        console.log("Hello");
        var data = new Blob([JSON.stringify({
            currentDate: currentDate,
            windows: windowsData,
            config: configData
        })          
        ], { type: 'text/plain;charset=utf-8' });

        FileSaver.saveAs(data, 'LCBackUp' + '-' + currentDate + '.txt');*/

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
    
    $scope.addNewConfiguration = function() {
        configData.push({
            property : 'Restos',
            rielSuperior: 0,
            rielInferior: 0,
            jamba: 0,
            pierna: 0,
            gancho: 0,
            cabezal: 0,
            socalo: 0
        });
          
        $scope.configGridOptions.api.onNewRows();
    };
    
    $scope.removeConfiguration = function(){
        var selectedConfiguration = $scope.configGridOptions.selectedRows[0];
        var selectedId = configData.indexOf(selectedConfiguration);
        config = configData[selectedId];
        config[type] = 0;
        $scope.configGridOptions.api.onNewRows();
    }
    
    function createCellStyle(redIntensity, greenIntensity, blueIntensity) {
        var backgroundColor = 'rgba('+ redIntensity + ',0.2)';
        return {
            background: backgroundColor,
            color: '#555555'
        };
    }
  }]);
    
    
    

