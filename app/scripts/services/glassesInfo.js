'use strict';

angular.module('longCalculatorApp')
 .service('glassesInfo', ['windowsInfo', function(windowsInfo) {
    
    this.glasses = [];
    
    var idGlass = 1;
    var widthSlidingGlass;
    var heightSlidingGlass;
    var partsSlidingGlass;
    var widthFixedGlass;
    var heightFixedGlass;
    var partsFixedGlass;

    this.getGlasses = function() {
        this.glasses = calculateGlasses();

        return this.glasses;
    };

    function calculateGlasses() {
        var idGlass = 1;
        var glasses = [];
        var windows = windowsInfo.getWindows();
        
        _.each(windows, function(window) {
            calculateDimensions(window);

            glasses.push({
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
        });

        return glasses;
    }
    
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
    
    this.removeGlass = function(selectedId){
        this.glasses.splice(selectedId, 1);
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
}]);