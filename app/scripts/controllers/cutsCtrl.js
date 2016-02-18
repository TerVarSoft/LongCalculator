'use strict';

angular.module('longCalculatorApp')
.controller('cutsCtrl', ['$scope', 'cutsInfo', function ($scope, cutsInfo) {
    $scope.newCutProperties = {};
    
    var cutsData = cutsInfo.getCuts();
    var configData = cutsInfo.getConfig();
    
    $scope.gridOptions = {
        rowData: cutsData,
        rowSelection: 'single',
        angularCompileRows: true,
        groupHeaders: true,
        
        columnDefs: [
            {
                field: 'name',
                headerName: 'Nombre',
                headerGroup: 'Barras',
                editable: false,
                width: 420,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'long',
                headerName: 'Longitud',
                headerGroup: 'Longitud',
                editable: false,
                width: 420,
                cellStyle: createCellStyle('255, 0, 0')
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
                width: 420,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'longitud',
                headerName:'Longitud',
                editable: true,
                width: 420,
                cellStyle: createCellStyle('165, 42, 42')
            }
        ]
    };
    
    function createCellStyle(redIntensity, greenIntensity, blueIntensity) {
        var backgroundColor = 'rgba('+ redIntensity + ',0.2)';
        return {
            background: backgroundColor,
            color: '#555555'
        };
    }
    
    $scope.addNewCut = function() {
        var cut = {
            name: $scope.newCutProperties.name,
            long: $scope.newCutProperties.long
        }
        
        verifyLongs(cut);
        
        if($scope.error == '') {
            cutsInfo.addCut(cut);
        }
          
        $scope.gridOptions.api.onNewRows();
    };
    
    $scope.removeCut = function(){
        var selectedCut = $scope.gridOptions.selectedRows[0];
        var selectedId = cutsData.indexOf(selectedCut);
        cutsData.splice(selectedId, 1);
        $scope.gridOptions.api.onNewRows();
    }
    
    $scope.addNewConfiguration = function() {
        configData.push({
            property : 'Restos',
            long: 0,
        });
          
        $scope.configGridOptions.api.onNewRows();
    };
    
    function verifyLongs(cut) {
        var configs = $scope.configGridOptions.rowData[0];
        var partsOfCut = _.reject(_.keys(configs), function(property) { return property == "property"; });
        
        for(var i = 0; i < partsOfCut.length; i++) {
            var element = partsOfCut[i];
            
            if(cut.long > configs[element]) {
                $scope.error = 'La longitud del corte es muy largo';
                return;
            }
            else {
                $scope.error = '';
            }
        }
    }
    
    $scope.saveData = function() {
        cutsInfo.saveData(cutsData, configData);
    }
}]);