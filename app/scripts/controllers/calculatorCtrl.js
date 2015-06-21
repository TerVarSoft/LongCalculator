'use strict';


angular.module('longCalculatorApp')
  .controller('calculatorCtrl', function ($scope, windowsInfo) {
    $scope.longValue = '';
    
    
    $scope.windowsPartsNames = windowsInfo.getWindowsPartsNames();
    $scope.selectedWindowPart = $scope.windowsPartsNames[0];
    
    $scope.sticksSize = windowsInfo.getSticksSize($scope.selectedWindowPart);
    $scope.multiplier = windowsInfo.getMultiplier($scope.selectedWindowPart);
    $scope.substrahend = windowsInfo.getSubstrahend($scope.selectedWindowPart);
    
    $scope.canvasData ={
        numberOfSticks : 1,
        accumulatedMilimeters :0,
        lastXposition: 5
    };
    
    $scope.longObjects = windowsInfo.getLongs($scope.selectedWindowPart);
    $scope.longRows = _.pluck($scope.longObjects,'realValue');
    $scope.sticksDetails = [];
    var sortedLongs = [];


    $scope.refreshCanvas = function(){        
        $scope.sticksSize = windowsInfo.getSticksSize($scope.selectedWindowPart);
        $scope.multiplier = windowsInfo.getMultiplier($scope.selectedWindowPart);
        $scope.substrahend = windowsInfo.getSubstrahend($scope.selectedWindowPart);
        $scope.longObjects = windowsInfo.getLongs($scope.selectedWindowPart);
        $scope.longRows = _.pluck($scope.longObjects,'realValue');
        sortLongs();
        recalculateDetails();
        repaintCanvas();
        sortedLongs = [];
    }
    
    
    function sortLongs(){
        if($scope.longObjects.length==0) {
            return;
        }
        var upperSortedLongs = Array.prototype.slice.call($scope.longObjects);
        upperSortedLongs.sort(function(a, b){return b.realValue-a.realValue;});
        
        //Adds the biggest long to sortedLongs array
        sortedLongs.push(upperSortedLongs[0]);         
        
        var leftoverMilimeters =$scope.sticksSize-sortedLongs[0].realValue;
        var remainingLongs = Array.prototype.slice.call(upperSortedLongs).slice(1, upperSortedLongs.length);
        
        while(sortedLongs.length!==upperSortedLongs.length){            

            var longsToAdd = getLongsToAdd(remainingLongs, leftoverMilimeters)
            
            if(longsToAdd.length!==0){
                Array.prototype.push.apply(sortedLongs, longsToAdd);
                
                for(var i=0; i< longsToAdd.length; i++){
                    remainingLongs.splice(remainingLongs.indexOf(longsToAdd[i]),1);
                }
            }
            
            //Adds the next biggest long to sortedLongs array
            if(remainingLongs.length!==0){                
                leftoverMilimeters =$scope.sticksSize-remainingLongs[0].realValue;
                sortedLongs.push(remainingLongs[0]);
                remainingLongs.splice(0,1);
            }
        }
    }
    
    
    function getLongsToAdd(longsArray, neededSum){
        var sum=0;
        var i=0;
        var results=[];
        var remainingMilimeters;

        while(i<longsArray.length && sum+longsArray[i].realValue<=neededSum){
            sum+=longsArray[i].realValue;
            results.push(longsArray[i]);
            i++;    
        }
        
        remainingMilimeters = neededSum - sum;
        var notUsedLongs=Array.prototype.slice.call(longsArray).slice(i,longsArray.length);
        var i=0;
        while(i<results.length)
        {
            var replacement = getReplaceFor(results[i], notUsedLongs, remainingMilimeters);

            if(replacement.length>0)
            {           
                var iResult = results[i];
                results = addRemoveLongs(results, replacement, [iResult]);
                notUsedLongs = addRemoveLongs(notUsedLongs, [iResult], replacement);
                remainingMilimeters -= (getRealValuesSum(replacement)-iResult);
            }
            else
            {
                i++;
            }
        }

        i=0;
        while(i<notUsedLongs.length)
        {
            var toReplace = getArrayToReplace(notUsedLongs[i], results, remainingMilimeters);

            if(toReplace.length>0)
            {  
                var iResult = notUsedLongs[i];       
                results = addRemoveLongs(results, [iResult], toReplace);
                notUsedLongs = addRemoveLongs(notUsedLongs, toReplace, [iResult]);
                remainingMilimeters -= iResult-getRealValuesSum(toReplace);
            }
            else
            {
                i++;
            }
        }

        return results;
    }
 
    function getArrayToReplace(replacement, results, remainingMilimeters){
        var sum=0;   
        var toReplace = [];

        for(var i=0;i<results.length;i++)
        {
            if(results[i].realValue<replacement.realValue && sum+results[i].realValue<replacement.realValue){
                sum += results[i].realValue;

                toReplace.push(results[i]);
            }
        }


        if(replacement.realValue-getRealValuesSum(toReplace)>remainingMilimeters){
            toReplace = [];
        }

        return toReplace;
    }
 
    
    function getReplaceFor(toReplace, notUsedLongs, remainingMilimeters){
        var sum=0;
        var results=[];

        var i=0;
        while(i<notUsedLongs.length && sum+notUsedLongs[i].realValue-toReplace.realValue<=remainingMilimeters ){
            sum += notUsedLongs[i].realValue;

            results.push(notUsedLongs[i]);
            i++;
        }

        if(getRealValuesSum(results) < toReplace.realValue){
            results = [];
        }

        return results;
    }

    
    function addRemoveLongs(arrayToModify, longsToAdd, longsToRemove)
    {
        var results = Array.prototype.slice.call(arrayToModify);

        for(var i=0;i<longsToRemove.length;i++){
            results.splice(results.indexOf(longsToRemove[i]), 1);
        }

        for(var i=0;i<longsToAdd.length;i++){
            results.push(longsToAdd[i]);
        }

        results.sort(function(a, b){return b.realValue-a.realValue;});

        return results;
    }
    
    
    function getRealValuesSum(arrayToSum)
    {
        var result=0;
        for(var i=0;i<arrayToSum.length;i++){
            result+=arrayToSum[i].realValue;
        }

        return result;
    }
        
    
    function recalculateDetails(){
        if(sortedLongs.length==0) 
        {
            $scope.sticksDetails=[];
            return;
        }
        
        $scope.sticksDetails = [];
        var tempSum = 0;
        var numberOfSticks =1;
        
        $scope.sticksDetails.push({
            numberOfStick : 1,
            values : [],
            lostMilimeters: 0
          });
        for(var i=0; i<sortedLongs.length;i++){
            tempSum += sortedLongs[i].realValue;
            if(tempSum>$scope.sticksSize){
                
                tempSum = sortedLongs[i].realValue;
                numberOfSticks++;
                $scope.sticksDetails.push({
                numberOfStick : numberOfSticks,
                values : [],
                lostMilimeters: 0
              });
            }

            $scope.sticksDetails[numberOfSticks-1].values.push(sortedLongs[i]);
            $scope.sticksDetails[numberOfSticks-1].lostMilimeters = $scope.sticksSize - tempSum;
            
        }
    }
    
    function repaintCanvas(){
        var sticksCanvas = document.getElementById('sticksCanvas');
        var context = sticksCanvas.getContext('2d');
        $scope.canvasData.lastXposition = 5;
        $scope.canvasData.accumulatedMilimeters = 0;
        $scope.canvasData.numberOfSticks = 1;
        context.clearRect(0, 0, sticksCanvas.width, sticksCanvas.height);
        
        
        for(var i=0; i<sortedLongs.length;i++){
            addRectangle(sortedLongs[i].realValue, context);
        }
        
    }
    
    function addRectangle(longValue, context){
        context.strokeStyle='black';
        context.strokeRect(5, 25, 600, 10); 
        
        if(shouldCreateStick(longValue)){
            $scope.canvasData.numberOfSticks++;
            context.strokeStyle='black';
            context.strokeRect(5, 25*$scope.canvasData.numberOfSticks, 600, 10); 
            $scope.canvasData.lastXposition = 5;
            $scope.canvasData.accumulatedMilimeters = 0;
        }
        
        context.fillRect($scope.canvasData.lastXposition, 25*$scope.canvasData.numberOfSticks, longValue*600/$scope.sticksSize, 10);
        $scope.canvasData.accumulatedMilimeters += longValue;
        $scope.canvasData.lastXposition += (longValue*600/$scope.sticksSize);
        
        context.beginPath();
        context.moveTo($scope.canvasData.lastXposition,25*$scope.canvasData.numberOfSticks-10);
        context.lineTo($scope.canvasData.lastXposition,25*$scope.canvasData.numberOfSticks+10+10);
        context.strokeStyle='red';
        context.stroke();
    }
    
    function shouldCreateStick(longValue){
        var result;
        if($scope.canvasData.accumulatedMilimeters + longValue > $scope.sticksSize) {
            result = true;
        }         
        else{
            result = false;
        }
        return result;
    }
    
    $scope.refreshCanvas();
  });