'use strict';

angular.module('longCalculatorApp')
  .controller('saveDocumentCtrl', function ($scope, windowsInfo) {
    $scope.saveDocument = function(type){
        saveDocumentPDF(type);
    }
    
    function saveDocumentPDF(type) {
        var documentPDF = new jsPDF('p', 'pt', 'letter');
        var y = 80;
        var actualRow = 1;
        var actualTableTitle = '';
        
        var actualCellColor = {
            redValue: 250,
            greenValue: 250,
            blueValue: 250
        };
        
        var columns = [
            {
                key: "numberOfStick",
                title: "Numero de la Barra"
            },
            {
                key: "window",
                title: "Ventana"
            },
            {
                key: "long",
                title:"Corte [mm]"
            },
            {
                key: "lostMilimeters",
                title: "Perdida [mm]"
            }
        ];

        var cell = function (x, y, width, height, key, value, row, settings) {
            var rowsUsed = 1;
            var incrementTitleHeight = 20;
            y = y - height;
            
            if(row === 0) {
                if(key === 'numberOfStick') {
                    y = y - incrementTitleHeight - 25;
                    height = height + incrementTitleHeight;

                    documentPDF.setFillColor(255, 255, 255);
                    documentPDF.rect(x, y, documentPDF.internal.pageSize.width - settings.margins.horizontal * 2, height, 'F');
                    documentPDF.setFontSize(20);
                    x = x + settings.padding;
                    y = y + settings.lineHeight / 2 + documentPDF.autoTableTextHeight() / 2 - 2.5;
                    documentPDF.text("Tabla de Cortes para: " + actualTableTitle, x, y);
                }
            }
            else
            {
                if (key === 'numberOfStick') {    
                    if(row === actualRow) {
                        for(var i = 0; i < data.length; i++) {
                            if(data[i].numberOfStick == value) {
                                if(data[i].numberOfStick % 2 == 0) {
                                    actualCellColor = {
                                        redValue: 200,
                                        greenValue: 200,
                                        blueValue: 200
                                    };
                                }
                                else {
                                    actualCellColor = {
                                        redValue: 250,
                                        greenValue: 250,
                                        blueValue: 250
                                    };
                                }

                                rowsUsed = data[i].quantityLongsOfStick;
                                height = height * rowsUsed;
                                actualRow = row + rowsUsed;
                                i = data.length;
                            }
                        }
                        
                        documentPDF.setFillColor(actualCellColor.redValue, actualCellColor.greenValue, actualCellColor.blueValue);
                        documentPDF.rect(x, y, width, height, 'F');
                        documentPDF.rect(x, y, width, height, 'S');
                        x = x + (width / 2) - (documentPDF.getStringUnitWidth('' + value) * documentPDF.internal.getFontSize() / 2);
                        y = y + (settings.lineHeight * rowsUsed / 2) + (documentPDF.autoTableTextHeight() / 2) - 2.5;
                        documentPDF.setFontStyle('Bold');
                        documentPDF.setFontSize(12);
                        documentPDF.text(value, x, y);
                    }
                }
                else {
                    documentPDF.setFillColor(actualCellColor.redValue, actualCellColor.greenValue, actualCellColor.blueValue);
                    documentPDF.rect(x, y, width, height, 'F');
                    documentPDF.rect(x, y, width, height, 'S');
                    documentPDF.setFontSize(12);
                    x = x + settings.padding;
                    y = y + settings.lineHeight / 2 + documentPDF.autoTableTextHeight() / 2 - 2.5;
                    documentPDF.text(value, x, y);
                }
            }
        };
             
        documentPDF.setFont("Courier");
        documentPDF.setFontType("Bold");
        documentPDF.setFontSize(30);
        documentPDF.text("Ferreteria Cesar", 200, y);
        documentPDF.setFontSize(20);
        
        for (var j = 0; j < $scope.windowsPartsNames.length; j++) {
            var windowPartName = $scope.windowsPartsNames[j];
            $scope.windowPartDetails(windowPartName);
            var data = generateData($scope.sticksDetails);
            actualTableTitle = windowPartName;
            
            documentPDF.autoTable(columns, data, {
                startY: y + 80,
                avoidPageSplit: true,
                renderCell: cell,
                margins: {
                    horizontal: 40,
                    top: 100,
                    bottom: 40
                }
            });
            
            y = documentPDF.autoTableEndPosY();
            actualRow = 1;
        }
        
        documentPDF.save('Reporte ' + type + '.pdf');
    }
    
    function generateData(dataLongs) {
        var dataGenerated = [];
        
        dataGenerated.push({
            numberOfStick: '',
            window: '',
            long: '',
            lostMilimeters: '',
            quantityLongsOfStick: ''
       });
        
        for(var i = 0; i < dataLongs.length; i++) {
            var dataLong = dataLongs[i];
            
            for(var j = 0; j < dataLong.values.length; j++) {
                dataGenerated.push({
                    numberOfStick: dataLong.numberOfStick,
                    window: dataLong.values[j].name,
                    long: dataLong.values[j].value,
                    lostMilimeters: dataLong.lostMilimeters,
                    quantityLongsOfStick: dataLong.values.length
               });
            }
        }
        
        return dataGenerated;
    }
  });