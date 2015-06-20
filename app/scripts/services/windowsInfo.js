'use strict';

angular.module('longCalculatorApp')
 .service('windowsInfo', function(){
    this.windows=[];
    
    this.getWindowsPartsNames = function()
    {
        return  [
                    'Riel Superior',
                    'Riel Inferior',
                    'Jamda',
                    'Gancho',
                    'Cabezal',
                    'Socalo'
                ];
    };
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
        return _.map(this.windows, function(window){
            window['value'] = window[propertyKey]
            return _.pick(window,'name','value')});
    };
    
    this.addLong = function(longValue, windowName, windowPartName){
        
        var window = _.find(this.windows, function(window){return window.name==windowName});
        var propertyKey = toPropertyKey(windowPartName);
        window[propertyKey] = longValue;
        console.log(propertyKey);
    }
    
    this.removeLong = function(windowName, windowPartName){
        var window = _.find(this.windows, function(window){return window.name==windowName});
        var propertyKey = toPropertyKey(windowPartName);
        delete window[propertyKey];
    }
    
    function toPropertyKey(propertyString){
        var propNoSpaces = propertyString.replace(/\s+/g, '');
        return propNoSpaces.substr(0,1).toLowerCase()+propNoSpaces.substr(1,propNoSpaces.length);
    }
});