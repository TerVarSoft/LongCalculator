'use strict';

angular.module('longCalculatorApp')
  .controller('saveDocumentCtrl', ['$scope', 'windowsInfo', 'cutsInfo', 'glassesInfo',function ($scope, windowsInfo, cutsInfo, glassesInfo) {

    $scope.saveDocument = function(){
        saveDocumentPDF();
    }
    
    function saveDocumentPDF() {
        var documentPDF = new jsPDF('p', 'pt', 'legal');
        var yPDF = 50;
        var actualRow = 1;
        var actualNumberOfStick = 1;
        var actualTableTitle = '';
        var actualNumberRowsUsed = 0;
        var newStickY = 0;
        var longsY = 0;
        
        var actualCellColor = {
            redValue: 250,
            greenValue: 250,
            blueValue: 250
        };
        
        var columns = [
            {
                dataKey: "numberOfStick",
                title: "Numero de la Barra"
            },
            {
                dataKey: "stickLong",
                title: "Longitud de\nla Barra"
            },
            {
                dataKey: "lostMilimeters",
                title: "Perdida [mm]"
            },
            {
                dataKey: "window",
                title: "Ventana"
            },
            {
                dataKey: "long",
                title: "Corte [mm]"
            }            
        ]; 
        
        var columnsGlasses = [
            {
                dataKey: "id",
                title: "Codigo"
            },
            {
                dataKey: "name",
                title: "Nombre"
            },
            {
                dataKey: "widthFixedWindowGlass",
                title: "Ancho\nVidrio\nFijo"
            },
            {
                dataKey: "heightFixedWindowGlass",
                title: "Alto\nVidrio\nFijo"
            },
            {
                dataKey: "partsFixedWindowGlass",
                title: "Partes\nVidrio\nFijo"
            },
            {
                dataKey: "widthSlidingWindowGlass",
                title: "Ancho\nVidrio\nCorredizo"
            },
            {
                dataKey: "heightSlidingWindowGlass",
                title: "Alto\nVidrio\nCorredizo"
            },
            {
                dataKey: "partsSlidingWindowGlass",
                title: "Partes\nVidrio\nCorredizo"
            }
        ];
        
        var dataGlasses = glassesInfo.getGlasses();
        var actualSelectedWindowPart = $scope.selectedWindowPart;
        
        documentPDF.setFont("Courier");
        documentPDF.setFontType("Bold");
        documentPDF.setFontSize(30);
        documentPDF.text("Ferreteria Cesar", 200, yPDF);
        documentPDF.setFontSize(20);
        
        if($scope.mode === 'windowMode') {
            $scope.windowsPartsNames = windowsInfo.getWindowsPartsNames();
        }
        else if($scope.mode === 'generalMode') {
            $scope.windowsPartsNames = cutsInfo.getPartsNames();
        }
        
        console.log($scope.windowsPartsNames.length);
        for (var j = 0; j < $scope.windowsPartsNames.length; j++) {
            var windowPartName = $scope.windowsPartsNames[j];
            $scope.windowPartDetails(windowPartName);
            var data = generateData($scope.sticksDetails);
            actualTableTitle = windowPartName;
            
            documentPDF.autoTable(columns, data, {
                startY: yPDF + 80,
                
                styles: {
                    fillStyle: 'DF',
                    lineColor: [0, 0, 0],
                    lineWidth: 0.5,
                    valign: 'middle'
                },
                
                headerStyles: {
                    fontSize: 9,
                    fillColor: [11, 81, 135],
                    halign: 'center',
                },
                
                bodyStyles: {
                    fontSize: 7,
                    lineWidth: 0.5,
                    halign: 'left',
                    rowHeight: 15
                },
                
                drawRow: function(row, rowData) {
                    if(row.index === 0) {
                        row.y = row.y - 70;
                        var xText = rowData.settings.margin.left + (rowData.table.width / 2);
                        var yText = row.y + 5 + (row.height / 2);
                        
                        documentPDF.rect(rowData.settings.margin.left, row.y, rowData.table.width, 30, 'F');
                        documentPDF.autoTableText("Tabla de Cortes para: " + actualTableTitle, xText, yText, {
                            halign: 'right',
                            valign: 'middle'
                        });
                    }
                },
                
                createdCell: function(cell, cellData) {
                    if(data[cellData.row.index].numberOfStick % 2 === 0) {
                        cell.styles.fillColor = [225, 225, 225];
                        cell.styles.fontStyle = 'bold';
                    }
                    else{
                        cell.styles.fillColor = [255, 255, 255];
                    }
                }
            });
            
            yPDF = documentPDF.autoTableEndPosY();
        }
        
        documentPDF.autoTable(columnsGlasses, dataGlasses, {
            startY: yPDF + 80,
            pageBreak: 'always',
                
            styles: {
                fillStyle: 'DF',
                lineColor: [0, 0, 0],
                lineWidth: 0.5,
                valign: 'middle'
            },

            headerStyles: {
                fontSize: 9,
                fillColor: [11, 81, 135],
                halign: 'center',
            },

            bodyStyles: {
                fontSize: 7,
                lineWidth: 0.5,
                halign: 'left',
                rowHeight: 15
            },

            drawRow: function(row, rowData) {
                if(row.index === 0) {
                    row.y = row.y - 70;
                    var xText = rowData.settings.margin.left + (rowData.table.width / 2);
                    var yText = row.y + 5 + (row.height / 2);

                    documentPDF.rect(rowData.settings.margin.left, row.y, rowData.table.width, 30, 'F');
                    documentPDF.autoTableText("Vidrios", xText, yText, {
                        halign: 'center',
                        valign: 'middle'
                    });
                }
            },

            createdCell: function(cell, cellData) {
                if(cellData.row.index % 2 === 0) {
                    cell.styles.fillColor = [225, 225, 225];
                    cell.styles.fontStyle = 'bold';
                }
                else{
                    cell.styles.fillColor = [255, 255, 255];
                }
            }
        });
        
        documentPDF.save('Reporte Cortes.pdf');
        
        $scope.windowPartDetails(actualSelectedWindowPart);
    }
    
    function generateData(dataLongs) {
        var dataGenerated = [];
        
        for(var i = 0; i < dataLongs.length; i++) {
            var dataLong = dataLongs[i];

            for(var j = 0; j < dataLong.values.length; j++) {
                dataGenerated.push({
                    numberOfStick: dataLong.numberOfStick,
                    stickLong: dataLong.stickLong,
                    window: dataLong.values[j].name,
                    long: dataLong.values[j].value,
                    lostMilimeters: dataLong.lostMilimeters,
                    quantityLongsOfStick: dataLong.values.length
               });
            }
        }
        
        return dataGenerated;
    }
  }]);
