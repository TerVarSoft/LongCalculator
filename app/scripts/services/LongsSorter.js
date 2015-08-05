'use strict';

angular.module('longCalculatorApp')
 .service('LongsSorter', function(){
    
    
    this.sortLongs = function(longs, sticksSizes){
        var sortedLongs = [];
        
        //Index 0 is for the default StickSize
        var iSticksSizes = 0;
        
        if(longs.length==0) {
            return;
        }
        
        //Sort from major to minor value
        var upperSortedLongs = Array.prototype.slice.call(longs);
        upperSortedLongs.sort(function(a, b){return b.value-a.value;});
        //Adds the biggest long to sortedLongs array based on the stickSize
        var firstLongToAdd = {};
        var leftoverMilimeters;
        if(iSticksSizes < sticksSizes.length-1){
            while(_.isEmpty(firstLongToAdd)) {
                firstLongToAdd = this.getFirstLongToAdd(upperSortedLongs, sticksSizes[iSticksSizes]);
                iSticksSizes++;
            }
            
            leftoverMilimeters = sticksSizes[iSticksSizes-1]-firstLongToAdd.value; 
        }
        else{
            firstLongToAdd = this.getFirstLongToAdd(upperSortedLongs, sticksSizes[sticksSizes.length-1]);
            leftoverMilimeters = sticksSizes[sticksSizes.length-1]-firstLongToAdd.value;
        }

        sortedLongs.push(firstLongToAdd);
        var remainingLongs = Array.prototype.slice.call(upperSortedLongs).slice(0, upperSortedLongs.length);
        remainingLongs.splice(upperSortedLongs.indexOf(firstLongToAdd), 1);
        
        while(sortedLongs.length!==upperSortedLongs.length){            
            
            var longsToAdd = this.getLongsToAdd(remainingLongs, leftoverMilimeters);            
            
            //if not empty, add lognsToAdd to the result
            if(longsToAdd.length!==0){
                Array.prototype.push.apply(sortedLongs, longsToAdd);
                
                //Remove longsToAdd from the remainingLogs
                for(var i=0; i< longsToAdd.length; i++){
                    remainingLongs.splice(remainingLongs.indexOf(longsToAdd[i]),1);
                }
            }
            
            //Adds the next biggest long to sortedLongs array
            if(remainingLongs.length!==0){     
                if(iSticksSizes < sticksSizes.length-1){
                    firstLongToAdd = this.getFirstLongToAdd(remainingLongs, sticksSizes[iSticksSizes]);
                    leftoverMilimeters = sticksSizes[iSticksSizes]-firstLongToAdd.value;
                    iSticksSizes++;  
                }
                else{
                    firstLongToAdd = this.getFirstLongToAdd(remainingLongs, sticksSizes[sticksSizes.length-1]);
                    leftoverMilimeters =sticksSizes[sticksSizes.length-1]-firstLongToAdd.value;
                }
    
                sortedLongs.push(firstLongToAdd);
                //remainingLongs.splice(0,1);
                remainingLongs.splice(remainingLongs.indexOf(firstLongToAdd), 1);
            }
        }
        
        return sortedLongs;
    }
    
    this.getFirstLongToAdd = function(longsArray, stickSize){
        
        var i=0;
        var result = {};
        while(i < (longsArray.length) && longsArray[i].value > stickSize) {
            i++;
        }
        
        if(i < longsArray.length) {
            result = longsArray[i];
        }
        
        return result;
    }
    
    this.getLongsToAdd = function(longsArray, neededSum){
        var sum=0;
        var i=0;
        var results=[];
        var remainingMilimeters;
        
        //Excludes numbers bigger than the neededSum
        while(i<longsArray.length && longsArray[i].value>neededSum){
            i++;
        }
        
        if(i >= longsArray.length) return results;
        
        //Adding values up to the sum is not bigger than the neededSum
        while(i<longsArray.length && sum+longsArray[i].value<=neededSum){
            sum+=longsArray[i].value;
            results.push(longsArray[i]);
            i++;    
        }
       
        remainingMilimeters = neededSum - sum;
         
        var notUsedLongs=Array.prototype.slice.call(longsArray).slice(i,longsArray.length);
        i=0;
        while(i<results.length)
        {
            var replacement = this.getReplaceFor(results[i], notUsedLongs, remainingMilimeters);
            if(replacement.length>0)
            {           
                var iResult = results[i];
                results = this.addRemoveLongs(results, replacement, [iResult]);
                notUsedLongs = this.addRemoveLongs(notUsedLongs, [iResult], replacement);
                remainingMilimeters -= (this.getSum(replacement)-iResult.value);
            }
            else
            {
                i++;
            }
        }
        
        i=0;
        while(i<notUsedLongs.length)
        {
            var toReplace = this.getArrayToReplace(notUsedLongs[i], results, remainingMilimeters);
            if(toReplace.length>0)
            {  
                var iResult = notUsedLongs[i];       
                results = this.addRemoveLongs(results, [iResult], toReplace);
                notUsedLongs = this.addRemoveLongs(notUsedLongs, toReplace, [iResult]);
                remainingMilimeters -= iResult.value-this.getSum(toReplace);
            }
            else
            {
                i++;
            }
        }
        return results;
    }
    
    this.getReplaceFor = function (toReplace, notUsedLongs, remainingMilimeters){
        var sum=0;
        var results=[];

        var i=0;

        while(i<notUsedLongs.length){
            if(sum+notUsedLongs[i].value-toReplace.value<=remainingMilimeters) {
               sum += notUsedLongs[i].value;
               results.push(notUsedLongs[i]); 
            }
            
            
            i++;
        }

        if(this.getSum(results) <= toReplace.value){
            results = [];
        }

        return results;
    }
    
    this.getArrayToReplace = function (replacement, results, remainingMilimeters){
        var sum=0;   
        var toReplace = [];

        for(var i=0;i<results.length;i++)
        {
            if(results[i].value<replacement.value && sum+results[i].value<replacement.value){
                sum += results[i].value;

                toReplace.push(results[i]);
            }
        }


        if(replacement.value-this.getSum(toReplace)>remainingMilimeters){
            toReplace = [];
        }

        return toReplace;
    }         
    
    this.addRemoveLongs = function (arrayToModify, longsToAdd, longsToRemove)
    {
        var results = Array.prototype.slice.call(arrayToModify);

        for(var i=0;i<longsToRemove.length;i++){
            results.splice(results.indexOf(longsToRemove[i]), 1);
        }

        for(var i=0;i<longsToAdd.length;i++){
            results.push(longsToAdd[i]);
        }

        results.sort(function(a, b){return b.value-a.value;});

        return results;
    }
    
    
    this.getSum = function (arrayToSum)
    {
        var result=0;
        for(var i=0;i<arrayToSum.length;i++){
            result+=arrayToSum[i].value;
        }

        return result;
    }
 });