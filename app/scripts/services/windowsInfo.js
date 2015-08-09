'use strict';

angular.module('longCalculatorApp')
 .service('windowsInfo', function(windowsFactory){ 
//    var window1 = windowsFactory.newWindow('Ventana 2000',
//                                              2012,
//                                              2012,
//                                              0,
//                                              2,
//                                              'Linea 20');
//        
//        var window2 = windowsFactory.newWindow('Ventana 200',
//                                              212,
//                                              212,
//                                              0,
//                                              2,
//                                              'Linea 20');
//        var window3 = windowsFactory.newWindow('Ventana 500',
//                                              512,
//                                              512,
//                                              0,
//                                              2,
//                                              'Linea 20');
//        var window4 = windowsFactory.newWindow('Ventana 900',
//                                              912,
//                                              912,
//                                              0,
//                                              2,
//                                              'Linea 20');
//        var window5 = windowsFactory.newWindow('Ventana 3500',
//                                              3512,
//                                              3512,
//                                              0,
//                                              2,
//                                              'Linea 20');
//    
//    
    this.windows=[];
    
//    this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window2);
//        this.windows.push(window2);
//        this.windows.push(window2);
//        this.windows.push(window3);
//        this.windows.push(window3);
//        this.windows.push(window4);
//        this.windows.push(window4);
//        this.windows.push(window4);
//        this.windows.push(window5);
//        this.windows.push(window5);
//        this.windows.push(window5);
//        
//        this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window2);
//        this.windows.push(window2);
//        this.windows.push(window2);
//        
//        this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window1);
//        this.windows.push(window2);
//        this.windows.push(window2);
//        this.windows.push(window2);
    
    this.getWindowsPartsNames = function(){
        return  [
                    'Riel Superior',
                    'Riel Inferior',
                    'Jamba',
                    'Pierna',
                    'Gancho',
                    'Cabezal',
                    'Socalo'
                ];
    };
    
   this.configuration = [
        {
            property : 'Long. barras',
            rielSuperior: 5000,
            rielInferior: 6000,
            jamba: 5000,
            pierna: 6000,
            gancho: 5000,
            cabezal: 6000,
            socalo: 5000
        },
//        {
//            property : 'Restos',
//            rielSuperior: 3000,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 100,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 100,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 800,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 1000,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 1000,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 1500,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 1500,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 1500,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        },
//        {
//            property : 'Restos',
//            rielSuperior: 1500,
//            rielInferior: 0,
//            jamba: 0,
//            pierna: 0,
//            gancho: 0,
//            cabezal: 0,
//            socalo: 0        
//        }           
    ];

    this.updateConfig = function(windowPartName, sticksSizes){
        var propertyKey = toPropertyKey(windowPartName);
        this.sticksSizes[propertyKey] = sticksSizes;
    }
    this.getWindows = function(){
      return this.windows;  
    }; 
    
    this.getNames = function(){
        return _.pluck(this.windows, 'name');
    };
    
    this.getConfig = function(){
        return this.configuration;
    }    
    
    this.getSticksSizes = function(windowPartName){
        var propertyKey = toPropertyKey(windowPartName);
        var sticksSizes = [];
        
        for(var i = 0; i < this.configuration.length; i++) {
            sticksSizes.push(parseInt(this.configuration[i][propertyKey]));
        }
        return sticksSizes;
    }
    
    this.getLongs = function(windowPartName){
        var propertyKey = toPropertyKey(windowPartName);
            
        var longObjects;
        if(propertyKey!=='cabezal' && propertyKey!=='socalo'){
            longObjects = this.getLongObjectsByPropertyKey(propertyKey, '');
        }
        else{
            longObjects = this.getLongObjectsByPropertyKey(propertyKey+"Corredizo", " corr");
            var longObjectsFixed = this.getLongObjectsByPropertyKey(propertyKey+"Fijo", " fijo");
            Array.prototype.push.apply(longObjects, longObjectsFixed);
        }
        return longObjects;
    };
    
    this.addWindow = function(window){
        this.windows.push(window);
        
    };
     
    this.getLongObjectsByPropertyKey = function (propertyKey, addToName){        
       var longObjects =_.map(this.windows, function(window){
                window['value'] = window[propertyKey].long;
                window['quantity'] = window[propertyKey].quantity;
                window['fixedName'] = window.name + addToName;
            return _.pick(window,'fixedName','value', 'quantity');
        });
        
        var longObjectsModifiedByQuantityValues = ModifyListByQuantityValues(longObjects);
        
        return _.filter(longObjectsModifiedByQuantityValues, function(longObject){return longObject.value});         
    }
    

    this.saveData = function(windows, configuration) {
        this.windows = windows;
        this.configuration = configuration;
    };
    
    function ModifyListByQuantityValues(longObjects){
        var results = [];
        var lenght = longObjects.length
        
        for(var i=0;i<lenght;i++){
            if(longObjects[i].quantity!==1){
                var quantity = longObjects[i].quantity;
                
                //add a longs quantity times
                for(var j=0;j<quantity;j++){
                    results.push({
                    name:  longObjects[i].fixedName,
                    value: longObjects[i].value
                    });
                }
            }
            else{
                //remove quantity property
                results.push({
                    name: longObjects[i].fixedName,
                    value: longObjects[i].value
                });
            }
        }
        
        return results
    }
    function toPropertyKey(propertyString){
        var propNoSpaces = propertyString.replace(/\s+/g, '');
        return propNoSpaces.substr(0,1).toLowerCase()+propNoSpaces.substr(1,propNoSpaces.length);
    }
});