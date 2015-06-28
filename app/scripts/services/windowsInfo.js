'use strict';

angular.module('longCalculatorApp')
 .service('windowsInfo', function(){
    this.windowNumber = 1;
    this.windows=[];
    
    this.getNumberWindow = function(){
        return this.windowNumber;
    }
    
    this.incrementNumberWindow = function(){
        this.windowNumber++;
    }
    
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
        rielInferior: 3000,
        jamba: 4000,
        pierna: 6000,
        gancho: 1000,
        cabezal: 2000,
        socalo: 4000
    }
    ];

    this.updateConfig = function(windowPartName, sticksSize){
        var propertyKey = toPropertyKey(windowPartName);
        this.sticksSizes[propertyKey] = sticksSize;
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
    
    this.getSticksSize = function(windowPartName){
        var propertyKey = toPropertyKey(windowPartName);
        return this.configuration[0][propertyKey];
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
                    name: (j==0) ? longObjects[i].fixedName : longObjects[i].fixedName+'*',
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