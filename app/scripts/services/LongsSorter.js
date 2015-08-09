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
        var remainingLongs = Array.prototype.slice.call(longs);
        remainingLongs.sort(function(a, b){return b.value-a.value;});
        var leftoverMilimeters;
        
        while(sortedLongs.length!==longs.length) {  
            var longsToAdd = this.knapspack(remainingLongs, sticksSizes[iSticksSizes]);
            
            //if not empty, add lognsToAdd to the result
            if(longsToAdd.length!==0){
                Array.prototype.push.apply(sortedLongs, longsToAdd);
                
                //Remove longsToAdd from the remainingLogs
                for(var i=0; i< longsToAdd.length; i++){
                    remainingLongs.splice(remainingLongs.indexOf(longsToAdd[i]),1);
                }   
            }
            
            if(iSticksSizes < sticksSizes.length-1) {
                iSticksSizes++;
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
        while(i<longsArray.length){
            if(sum+longsArray[i].value<=neededSum){
                sum+=longsArray[i].value;
                results.push(longsArray[i]);    
            }
            
            i++;    
        }
        remainingMilimeters = neededSum - sum;
         
        var notUsedLongs=Array.prototype.slice.call(longsArray).slice(i,longsArray.length);
        i=0;
        while(i<results.length)
        {
            if(neededSum == 800) {
            }
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
        var limit = toReplace.value + remainingMilimeters;

        var i=0;

        while(i<notUsedLongs.length){
            if(sum+notUsedLongs[i].value <= limit) {
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

    this.knapspack = function(data, stickSize) {
        var m= [[0]]; // maximum pack value found so far
        var b= [[0]]; // best combination found so far
        var opts= [0]; // item index for 0 of item 0 
        var P= [1]; // item encoding for 0 of item 0
        var choose= 0;
        for (var j= 0; j<data.length; j++) {
            opts[j+1]= opts[j]+1; // item index for 0 of item j+1
            P[j+1]= P[j]*(1+1); // item encoding for 0 of item j+1
        }
        
        for (var j= 0; j<opts[data.length]; j++) {
            m[0][j+1]= b[0][j+1]= 0; // best values and combos for empty pack: nothing
        }
        
        //To avoid decimals problem with the algorithm
        var stickSizeTen = stickSize*10;
        
        for (var w=1; w<=stickSizeTen; w++) {
            m[w]= [0];
            b[w]= [0];
            for (var j=0; j<data.length; j++) {
                var N= 1; // how many of these can we have?
                var base= opts[j]; // what is the item index for 0 of these?
                
                for (var n= 1; n<=N; n++) {
                    
                    //*10 to avoid decimals problem
                    var W= n*(data[j].value*10); // how much do these items weigh?
                    var s= w>=W ?1 :0; // can we carry this many?
                    var v= s*n*(data[j].value*10); // how much are they worth?
                    var I= base+n; // what is the item number for this many?
                    var wN= w-s*W; // how much other stuff can we be carrying?
                    var C= n*P[j] + b[wN][base]; // encoded combination
                    m[w][I]= Math.max(m[w][I-1], v+m[wN][base]); // best value
                    choose= b[w][I]= m[w][I]>m[w][I-1] ?C :b[w][I-1];
                }
            }
        }
        var best= [];
        for (var j= data.length-1; j>=0; j--) {
            best[j]= Math.floor(choose/P[j]);
            choose-= best[j]*P[j];
        }

        var result = [];

        for (var i= 0; i<best.length; i++) {
            if (0==best[i]) continue;
            result.push(data[i]);
        }
        return result;
    }
 });