'use strict';

angular.module('longCalculatorApp')
 .service('cutsInfo', [function (){
    this.cuts = [];
    
    this.configuration = [
        {
            property : 'Long. barras',
            longitud: 5980,
        }
    ];
    
    this.addCut = function(cut) {
        this.cuts.push({
            name: cut.name,
            long: cut.long
        });
    };
    
    this.getCuts = function() {
        return this.cuts;
    };
        
    this.getConfig = function(){
        return this.configuration;
    };
     
    this.getPartsNames = function(){
        return ['Longitud'];
    };
     
    this.saveData = function(cuts, configuration) {
        this.cuts = cuts;
        this.configuration = configuration;
    };
    
    this.getSticksSizes = function(cutsPartName){
        var propertyKey = toPropertyKey(cutsPartName);
        var sticksSizes = [];
        
        for(var i = 0; i < this.configuration.length; i++) {
            sticksSizes.push(parseInt(this.configuration[i][propertyKey]));
        }
        
        return sticksSizes;
    };
     
    this.getLongs = function(cutPartName) {
        var longObjects = populateResults(this.cuts);
        
        return longObjects;
    };
     
    function populateResults(longObjects) {
        var results = [];
        var lenght = longObjects.length
        
        for(var i=0;i<lenght;i++) {
            //remove quantity property
            results.push({
                name: longObjects[i].name,
                value: parseInt(longObjects[i].long)
            });
        }
        
        return results;
    };
    
    function toPropertyKey(propertyString) {
        var propNoSpaces = propertyString.replace(/\s+/g, '');
        return propNoSpaces.substr(0,1).toLowerCase()+propNoSpaces.substr(1,propNoSpaces.length);
    };
}]);