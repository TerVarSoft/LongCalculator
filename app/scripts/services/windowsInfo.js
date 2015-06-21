'use strict';

angular.module('longCalculatorApp')
 .service('windowsInfo', function(){
    this.windows=[
        {
            name:'Ventana Sala',
            rielSuperior: 1000,
            rielInferior: 2000,
            jamda: 300,
            gancho: 700,
            cabezal: 1500,
            socalo: 3000
        },
        {
            name:'Ventana Cocina',
            rielSuperior: 1000,
            rielInferior: 2000,
            jamda: 300,
            gancho: 700,
            cabezal: 1500,
            socalo: 3000
        },
        {
            name:'Ventana Cuarto',
            rielSuperior: 1000,
            rielInferior: 2000,
            jamda: 300,
            gancho: 700,
            cabezal: 1500,
            socalo: 3000
        }
        
    ];
    
    this.getWindowsPartsNames = function(){
        return  [
                    'Riel Superior',
                    'Riel Inferior',
                    'Jamda',
                    'Gancho',
                    'Cabezal',
                    'Socalo'
                ];
    };
    
    this.sticksSizes = {
        rielSuperior: 5000,
        rielInferior: 3000,
        jamda: 4000,
        gancho: 1000,
        cabezal: 2000,
        socalo: 4000
    };
    
    this.multipliers = {
        rielSuperior: 1,
        rielInferior: 1,
        jamda: 1,
        gancho: 1,
        cabezal: 1,
        socalo: 1
    };
    
    this.substrahends = {
        rielSuperior: 0,
        rielInferior: 0,
        jamda: 0,
        gancho: 0,
        cabezal: 0,
        socalo: 0
    };

    this.updateConfig = function(windowPartName, sticksSize, multiplier, substrahend){
        var propertyKey = toPropertyKey(windowPartName);
        this.sticksSizes[propertyKey] = sticksSize;
        this.multipliers[propertyKey] = multiplier;
        this.substrahends[propertyKey] = substrahend;
    }
    this.getWindows = function(){
      return this.windows;  
    };   
    
    this.addWindow = function(window){
        this.windows.push(window);
        
    };
    
    this.getNames = function(){
        return _.pluck(this.windows, 'name');
    };
    
    this.getLongs = function(windowPartName){
        var propertyKey = toPropertyKey(windowPartName);
        var multiplier = this.multipliers[propertyKey];
        var substrahend = this.substrahends[propertyKey];
        return _.map(this.windows, function(window){
            window['value'] = window[propertyKey];
            window['realValue'] = (window[propertyKey]-substrahend)*multiplier;
            return _.pick(window,'name','value', 'realValue');
        });
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
    
    this.getConfiguration = function(windowPartName){
      var propertyKey = toPropertyKey(windowPartName);    
      return {
          sticksSize:this.sticksSizes[propertyKey],
          multiplier:this.multipliers[propertyKey],
          substrahend:this.substrahends[propertyKey],
      };  
    };
    
    function toPropertyKey(propertyString){
        var propNoSpaces = propertyString.replace(/\s+/g, '');
        return propNoSpaces.substr(0,1).toLowerCase()+propNoSpaces.substr(1,propNoSpaces.length);
    }
});