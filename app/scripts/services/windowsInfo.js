'use strict';

angular.module('longCalculatorApp')
 .service('windowsInfo', function(){
    this.windowNumber = 1;
    this.windows=[
        {
            name:'Ventana Sala',
            rielSuperior: 1000,
            rielInferior: 2000,
            jamba: 300,
            gancho: 700,
            cabezal: 1500,
            socalo: 3000
        },
        {
            name:'Ventana Cocina',
            rielSuperior: 1000,
            rielInferior: 2000,
            jamba: 300,
            gancho: 700,
            cabezal: 1500,
            socalo: 3000
        },
        {
            name:'Ventana Cuarto',
            rielSuperior: 1000,
            rielInferior: 2000,
            jamba: 300,
            gancho: 700,
            cabezal: 1500,
            socalo: 3000
        }
        
    ];
    
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
        property : 'Longitud de las barras',
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
        var multiplier = this.getMultiplier(propertyKey);
        var substrahend = this.getSubstrahend(propertyKey);
        var nameLongs = _.map(this.windows, function(window){
                window['value'] = window[propertyKey];
                window['realValue'] = (window[propertyKey]-substrahend)*multiplier;
            return _.pick(window,'name','value', 'realValue');
        });
        
        return _.filter(nameLongs, function(nameLong){return nameLong.value});
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
    
    function toPropertyKey(propertyString){
        var propNoSpaces = propertyString.replace(/\s+/g, '');
        return propNoSpaces.substr(0,1).toLowerCase()+propNoSpaces.substr(1,propNoSpaces.length);
    }
});