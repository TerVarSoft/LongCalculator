'use strict';

angular.module('longCalculatorApp')
 .service('glassesInfo', function(){
    this.glasses = [];
    
    var idGlass = 1;
    var widthSlidingGlass;
    var heightSlidingGlass;
    var partsSlidingGlass;
    var widthFixedGlass;
    var heightFixedGlass;
    var partsFixedGlass;
    
    function calculateDimensions(window) {
        if(window.line === "Linea 20") {
            if(window.numberFrames == "2" || window.numberFrames == "4") {
                widthFixedGlass = window.socaloFijo.long - 59;
                heightFixedGlass = window.pierna.long - 86;
                partsFixedGlass = window.socaloFijo.quantity;
                widthSlidingGlass = widthFixedGlass;
                heightSlidingGlass = heightFixedGlass;
                partsSlidingGlass = window.socaloCorredizo.quantity;
            }
            else if(window.numberFrames == "3") {
                widthFixedGlass = window.socaloFijo.long - 35;
                heightFixedGlass = window.pierna.long - 86;
                partsFixedGlass = window.socaloFijo.quantity;
                widthSlidingGlass = window.socaloCorredizo.long - 54;
                heightSlidingGlass = heightFixedGlass;
                partsSlidingGlass = window.socaloCorredizo.quantity;
            }
        }
        else if(window.line == "Linea 25") {
            if(window.numberFrames == "2" || window.numberFrames == "4") {
                widthFixedGlass = window.socaloFijo.long - 72;
                heightFixedGlass = window.pierna.long - 96;
                partsFixedGlass = window.socaloFijo.quantity;
                widthSlidingGlass = widthFixedGlass;
                heightSlidingGlass = heightFixedGlass;
                partsSlidingGlass = window.socaloCorredizo.quantity;
            }
            else if(window.numberFrames == "3") {
                widthFixedGlass = window.socaloFijo.long - 60;
                heightFixedGlass = window.pierna.long - 96;
                partsFixedGlass = window.socaloFijo.quantity;
                widthSlidingGlass = window.socaloCorredizo.long - 72;
                heightSlidingGlass = heightFixedGlass;
                partsSlidingGlass = window.socaloCorredizo.quantity;
            }
        }
    }
    
    this.addGlass = function(window) {
        calculateDimensions(window);

        this.glasses.push({
            id: idGlass,
            name: window.name,
            widthSlidingWindowGlass: widthSlidingGlass,
            heightSlidingWindowGlass: heightSlidingGlass,
            partsSlidingWindowGlass: partsSlidingGlass,
            widthFixedWindowGlass: widthFixedGlass,
            heightFixedWindowGlass: heightFixedGlass,
            partsFixedWindowGlass: partsFixedGlass
        });
        
        idGlass++;
    };
    
    this.getGlasses = function() {
        return this.glasses;
    };
    
    this.prueba = function(windows) {
        for(var i = 0; i < windows.length; i++) {
            var window = windows[i];
            
            calculateDimensions(window);
            
            this.glasses.push({
                id: idGlass,
                name: window.name,
                widthSlidingWindowGlass: widthSlidingGlass,
                heightSlidingWindowGlass: heightSlidingGlass,
                partsSlidingWindowGlass: partsSlidingGlass,
                widthFixedWindowGlass: widthFixedGlass,
                heightFixedWindowGlass: heightFixedGlass,
                partsFixedWindowGlass: partsFixedGlass
            });
            
            idGlass++;
        }
    }
});