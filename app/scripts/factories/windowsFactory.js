'use strict';

angular.module('longCalculatorApp')
 .factory('windowsFactory', function() {
    return {
        newWindow : function(nameWindow, width, height, wallLoss, numberFramesWindow, lineWindow) {
            var summandSocaloFijo = 0;
            var summandSocaloCorredizo = 0;
            var summandCabezalFijo = 0;
            var summandCabezalCorredizo = 0;
            
            var subtrahendRielSuperior = 0;
            var subtrahendRielInferior = 0;
            var subtrahendPierna = 0;
            var subtrahendGancho = 0;
            
            var rielSuperiorQuantity = 1;
            var rielInferiorQuantity = 1;
            var jambaQuantity = 2;
            var piernaQuantity = 0;
            var ganchoQuantity = 0;
            var cabezalFijoQuantity = 0;
            var cabezalCorredizoQuantity = 0;
            var socaloFijoQuantity = 0;
            var socaloCorredizoQuantity = 0;
            
            if(numberFramesWindow == "2") {
                piernaQuantity = 2;
                ganchoQuantity = 2;
                cabezalFijoQuantity = 1;
                cabezalCorredizoQuantity = 1;
                socaloFijoQuantity = 1;
                socaloCorredizoQuantity = 1;
            }
            else if(numberFramesWindow == "3") {
                piernaQuantity = 2;
                ganchoQuantity = 4;
                cabezalFijoQuantity = 1;
                cabezalCorredizoQuantity = 2;
                socaloFijoQuantity = 1;
                socaloCorredizoQuantity = 2;
            }
            else if(numberFramesWindow == "4") {
                piernaQuantity = 4;
                ganchoQuantity = 4;
                cabezalFijoQuantity = 4;
                socaloFijoQuantity = 4;
                cabezalFijoQuantity = 2;
                cabezalCorredizoQuantity = 2;
                socaloFijoQuantity = 2;
                socaloCorredizoQuantity = 2;
            }
            
            if(lineWindow == "Linea 20") {
                subtrahendRielSuperior = 12;
                subtrahendRielInferior = 12;
                subtrahendPierna = 24;
                subtrahendGancho = 24;
                
                if(numberFramesWindow == "2") {
                    summandCabezalCorredizo = 6;
                    summandSocaloCorredizo = 6;
                }
                else if(numberFramesWindow == "3") {
                    summandCabezalFijo = 3;
                    summandCabezalCorredizo = 10;
                    summandSocaloFijo = 3;
                    summandSocaloCorredizo = 10;
                }
                else if(numberFramesWindow == "4") {
                    summandCabezalCorredizo = 5;
                    summandSocaloCorredizo = 5;
                }
            }
            else if(lineWindow == "Linea 25") {
                subtrahendRielSuperior = 18;
                subtrahendRielInferior = 18;
                subtrahendPierna = 33;
                subtrahendGancho = 33;
                
                if(numberFramesWindow == "2") {
                    summandCabezalCorredizo = 13;
                    summandSocaloCorredizo = 13;
                }
                else if(numberFramesWindow == "3") {
                    summandCabezalFijo = -3;
                    summandCabezalCorredizo = 21;
                    summandSocaloFijo = -3;
                    summandSocaloCorredizo = 21;
                }
                else if(numberFramesWindow == "4") {
                    summandCabezalCorredizo = 11;
                    summandSocaloCorredizo = 11;
                }
            }
            
            return {
                name : nameWindow,
                rielSuperior : {
                    long: width - wallLoss - subtrahendRielSuperior,
                    quantity: rielSuperiorQuantity,
                    equation: 'Ancho - Perdida/Pared - ' + subtrahendRielSuperior
                },
                rielInferior : {
                    long: width - wallLoss -subtrahendRielInferior,
                    quantity: rielInferiorQuantity,
                    equation: 'Ancho - Perdida/Pared - ' + subtrahendRielInferior
                },
                jamba : {
                    long: height - wallLoss,
                    quantity: jambaQuantity,
                    equation: 'Alto - Perdida/Pared'
                },
                pierna : {
                    long: height - wallLoss - subtrahendPierna,
                    quantity: piernaQuantity,
                    equation: 'Jamba - ' + subtrahendPierna
                },
                gancho : {
                    long: height - wallLoss - subtrahendGancho,
                    quantity: ganchoQuantity,
                    equation: 'Jamba - ' + subtrahendGancho
                },
                cabezalFijo : {
                    long: ((width - wallLoss - subtrahendRielSuperior) / numberFramesWindow) + summandCabezalCorredizo + summandCabezalFijo,
                    quantity: cabezalFijoQuantity,
                    equation: '(Riel Superior / ' + numberFramesWindow + ') + ' + summandCabezalCorredizo + ' + ' + summandCabezalFijo,
                },
                cabezalCorredizo : {
                    long: ((width - wallLoss - subtrahendRielSuperior) / numberFramesWindow) + summandCabezalCorredizo,
                    quantity: cabezalFijoQuantity,
                    equation: '(Riel Superior / ' + numberFramesWindow + ') + ' + summandCabezalCorredizo,
                },
                socaloFijo : {
                    long: ((width - wallLoss - subtrahendRielSuperior) / numberFramesWindow) + summandSocaloCorredizo + summandSocaloFijo,
                    quantity: socaloFijoQuantity,
                    equation: '(Riel Superior / ' + numberFramesWindow + ') + ' + summandSocaloCorredizo + ' + ' + summandSocaloFijo
                },
                socaloCorredizo : {
                    long: ((width - wallLoss - subtrahendRielSuperior) / numberFramesWindow) + summandSocaloCorredizo,
                    quantity: socaloFijoQuantity,
                    equation: '(Riel Superior / ' + numberFramesWindow + ') + ' + summandSocaloCorredizo
                },
                line : lineWindow,
                numberFrames : numberFramesWindow
            };
        }
    };
});