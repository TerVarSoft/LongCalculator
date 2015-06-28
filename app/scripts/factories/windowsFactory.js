'use strict';

angular.module('longCalculatorApp')
 .factory('windowsFactory', function() {
    return {
        newWindow : function(nameWindow, width, height, wallLoss, numberFrames) {        
            return {
                name: nameWindow,
                rielSuperior : {
                    long: width - wallLoss - 12,
                    quantity: 1,
                    equation: 'Ancho - Perdida/Pared - 12'
                },
                rielInferior : {
                    long: width - wallLoss - 12,
                    quantity: 1,
                    equation: 'Ancho - Perdida/Pared - 12'
                },
                jamba : {
                    long: height - wallLoss,
                    quantity: 2,
                    equation: 'Alto - Perdida/Pared'
                },
                pierna : {
                    long: height - wallLoss - 24,
                    quantity: 2,
                    equation: 'Jamba - 24'
                },
                gancho : {
                    long: height - wallLoss - 24,
                    quantity: 2,
                    equation: 'Jamba - 24'
                },
                cabezal : {
                    long: ((width - wallLoss - 12) / 2) + 6,
                    quantity: 2,
                    equation: '(Riel Superior / 2) + 6'
                },
                socalo : {
                    long: ((width - wallLoss - 12) / 2) + 6,
                    quantity: 2,
                    equation: '(Riel Superior / 2) + 6'
                },
            };
        }
    };
});