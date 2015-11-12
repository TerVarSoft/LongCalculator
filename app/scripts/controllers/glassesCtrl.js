'use strict';

angular.module('longCalculatorApp')
  .controller('glassesCtrl', ['$scope', 'glassesInfo',function ($scope, glassesInfo) {
    var glassesData = glassesInfo.getGlasses();
    
    $scope.gridOptions = {
        rowData: glassesData,
        rowSelection: 'single',
        angularCompileRows: true,
        groupHeaders: true,
        
        columnDefs: [
            {
                field: 'id',
                headerName: 'Codigo',
                headerGroup: 'Ventanas',
                editable: false,
                width: 80,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'name',
                headerName: 'Nombre',
                headerGroup: 'Ventanas',
                editable: false,
                width: 150,
                cellStyle: createCellStyle('0, 0, 255')
            },
            {
                field: 'widthFixedWindowGlass',
                headerName: 'Ancho',
                headerGroup: 'Vidrio Ventana Fija',
                editable: false,
                width: 100,
                cellStyle: createCellStyle('255, 0, 0')
            },
            {
                field: 'heightFixedWindowGlass',
                headerName: 'Alto',
                headerGroup: 'Vidrio Ventana Fija',
                editable: false,
                width: 100,
                cellStyle: createCellStyle('255, 0, 0')
            },
            {
                field: 'partsFixedWindowGlass',
                headerName: 'Piezas',
                headerGroup: 'Vidrio Ventana Fija',
                editable: false,
                width: 100,
                cellStyle: createCellStyle('255, 0, 0')
            },
            {
                field: 'widthSlidingWindowGlass',
                headerName: 'Ancho',
                headerGroup: 'Vidrio Ventana Corrediza',
                editable: false,
                width: 100,
                cellStyle: createCellStyle('0, 255, 0')
            },
            {
                field: 'heightSlidingWindowGlass',
                headerName: 'Alto',
                headerGroup: 'Vidrio Ventana Corrediza',
                editable: false,
                width: 100,
                cellStyle: createCellStyle('0, 255, 0')
            },
            {
                field: 'partsSlidingWindowGlass',
                headerName: 'Piezas',
                headerGroup: 'Vidrio Ventana Corrediza',
                editable: false,
                width: 100,
                cellStyle: createCellStyle('0, 255, 0')
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
}]);