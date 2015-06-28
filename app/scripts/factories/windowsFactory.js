'use strict';

angular.module('longCalculatorApp')
 .factory('windowsFactory', function() {
    return {
        newWindow : function(nameWindow, width, height, wallLoss, numberFrames, line) {
            var summandSocalo = 0;
            var summandCabezal = 0;
            
            var subtrahendRielSuperior = 0;
            var subtrahendRielInferior = 0;
            var subtrahendPierna = 0;
            var subtrahendGancho = 0;
            
            var rielSuperiorQuantity = 1;
            var rielInferiorQuantity = 1;
            var jambaQuantity = 2;
            var piernaQuantity = 0;
            var ganchoQuantity = 0;
            var cabezalQuantity = 0;
            var socaloQuantity = 0;
            
            if(numberFrames == "2") {
                piernaQuantity = 2;
                ganchoQuantity = 2;
                cabezalQuantity = 2;
                socaloQuantity = 2;
            }
            else if(numberFrames == "3") {
                piernaQuantity = 2;
                ganchoQuantity = 4;
                cabezalQuantity = 3;
                socaloQuantity = 3;
            }
            else if(numberFrames == "4") {
                piernaQuantity = 4;
                ganchoQuantity = 4;
                cabezalQuantity = 4;
                socaloQuantity = 4;
            }
            
            if(line == "Linea 20") {
                subtrahendRielSuperior = 12;
                subtrahendRielInferior = 12;
                subtrahendPierna = 24;
                subtrahendGancho = 24;
                
                if(numberFrames == "2") {
                    summandCabezal = 6;
                    summandSocalo = 6;
                }
                else if(numberFrames == "3") {
                    summandCabezal = 10;
                    summandSocalo = 10;
                }
                else if(numberFrames == "4") {
                    summandCabezal = 5;
                    summandSocalo = 5;
                }
            }
            else if(line == "Linea 25") {
                subtrahendRielSuperior = 18;
                subtrahendRielInferior = 18;
                subtrahendPierna = 33;
                subtrahendGancho = 33;
                
                if(numberFrames == "2") {
                    summandCabezal = 13;
                    summandSocalo = 13;
                }
                else if(numberFrames == "3") {
                    summandCabezal = 21;
                    summandSocalo = 21;
                }
                else if(numberFrames == "4") {
                    summandCabezal = 11;
                    summandSocalo = 11;
                }
            }
            
            return {
                name: nameWindow,
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
                cabezal : {
                    long: ((width - wallLoss - subtrahendRielSuperior) / numberFrames) + summandCabezal,
                    quantity: cabezalQuantity,
                    equation: '(Riel Superior / ' + numberFrames + ') + ' + summandCabezal,
                },
                socalo : {
                    long: ((width - wallLoss - subtrahendRielSuperior) / numberFrames) + summandSocalo,
                    quantity: socaloQuantity,
                    equation: '(Riel Superior / ' + numberFrames + ') + ' + summandCabezal
                },
            };
        }
    };
});