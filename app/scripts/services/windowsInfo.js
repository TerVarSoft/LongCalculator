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
                    'Gancho',
                    'Cabezal',
                    'Socalo'
                ];
    };
    
    /*this.sticksSizes = {
        rielSuperior: 5000,
        rielInferior: 3000,
        jamba: 4000,
        gancho: 1000,
        cabezal: 2000,
        socalo: 4000
    };
    
    this.multipliers = {
        rielSuperior: 1,
        rielInferior: 1,
        jamba: 1,
        gancho: 1,
        cabezal: 1,
        socalo: 1
    };
    
    this.substrahends = {
        rielSuperior: 0,
        rielInferior: 0,
        jamba: 0,
        gancho: 0,
        cabezal: 0,
        socalo: 0
    };
    */
    this.configuration = [
    {
        property : 'Long. barras',
        rielSuperior: 5000,
        rielInferior: 3000,
        jamba: 4000,
        gancho: 1000,
        cabezal: 2000,
        socalo: 4000
    },
    {
        property : 'Substraendos',
        rielSuperior: 0,
        rielInferior: 0,
        jamba: 0,
        gancho: 0,
        cabezal: 0,
        socalo: 0
    },    
    {
        property : 'Multiplicadores',
        rielSuperior: 1,
        rielInferior: 1,
        jamba: 1,
        gancho: 1,
        cabezal: 1,
        socalo: 1
        
    }
    ];

    this.updateConfig = function(windowPartName, sticksSize, multiplier, substrahend){
        var propertyKey = toPropertyKey(windowPartName);
        this.sticksSizes[propertyKey] = sticksSize;
        this.multipliers[propertyKey] = multiplier;
        this.substrahends[propertyKey] = substrahend;
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
    
    this.getSubstrahend = function(windowPartName){
        var propertyKey = toPropertyKey(windowPartName);
        return this.configuration[1][propertyKey];
    }
    
    this.getMultiplier = function(windowPartName){
        var propertyKey = toPropertyKey(windowPartName);
        return this.configuration[2][propertyKey];
    }
    
    
    
    this.getLongs = function(windowPartName){
        var propertyKey = toPropertyKey(windowPartName);
        var propertyQuantityKey = toPropertyKey(windowPartName)+'Quantity';
        
        var multiplier = this.getMultiplier(propertyKey);
        var substrahend = this.getSubstrahend(propertyKey);
        
        var longObjects = _.map(this.windows, function(window){
                window['value'] = window[propertyKey];
                window['realValue'] = (window[propertyKey]-substrahend)*multiplier;
                window['quantity'] = window[propertyQuantityKey];
            return _.pick(window,'name','value', 'realValue', 'quantity');
        });
        
        var longObjectsModifiedByQuantityValues = ModifyListByQuantityValues(longObjects);
        
        return _.filter(longObjectsModifiedByQuantityValues, function(longObject){return longObject.value});
    };
    
    this.addWindow = function(window){
        this.windows.push(window);
        
    };
     
    
    this.addLong = function(longValue, windowName, windowPartName){
        
        var window = _.find(this.windows, function(window){return window.name===windowName;});
        var propertyKey = toPropertyKey(windowPartName);
        window[propertyKey] = longValue;
        console.log(propertyKey);
    };
    
    this.removeLong = function(windowName, windowPartName){
        var window = _.find(this.windows, function(window){return window.name===windowName;});
        var propertyKey = toPropertyKey(windowPartName);
        delete window[propertyKey];
    };
    
    

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
                    name: (j==0) ? longObjects[i].name : longObjects[i].name+'*',
                    value: longObjects[i].value,
                    realValue: longObjects[i].realValue
                    });
                }
            }
            else{
                //remove quantity property
                results.push({
                    name: longObjects[i].name,
                    value: longObjects[i].value,
                    realValue: longObjects[i].realValue
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