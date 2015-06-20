'use strict';


angular.module('longCalculatorApp')
  .controller('calculatorCtrl', function ($scope, windowsInfo) {
    $scope.longValue = '';
    $scope.sticksSize = 20000;
    
    $scope.windowsPartsNames = windowsInfo.getWindowsPartsNames();
    $scope.selectedWindowPart = $scope.windowsPartsNames[0];

    
    $scope.canvasData ={
        numberOfSticks : 1,
        accumulatedMilimeters :0,
        lastXposition: 5
    };
    
    $scope.longObjects = windowsInfo.getLongs($scope.selectedWindowPart);
    $scope.longRows = _.pluck($scope.longObjects,'value');
   

    var sortedLongs = [];
    sortLongs();
    recalculateDetails();
    repaintCanvas();
    sortedLongs = [];

    $scope.refreshCanvas = function(){
        $scope.longObjects = windowsInfo.getLongs($scope.selectedWindowPart);
        $scope.longRows = _.pluck($scope.longObjects,'value');
        sortLongs();
        recalculateDetails();
        repaintCanvas();
        sortedLongs = [];
    }
    $scope.sticksDetails = [];


    
    
    function sortLongs(){
        if($scope.longRows.length==0) return;
        sortedLongs.push($scope.longRows[0]);         
        
        var leftoverMilimeters =$scope.sticksSize-sortedLongs[0];
        var remainingLongs = Array.prototype.slice.call($scope.longRows).slice(1, $scope.longRows.length);

        while(sortedLongs.length!==$scope.longRows.length){            

            var longsToAdd = getLongsToAdd(leftoverMilimeters, remainingLongs);
            if(longsToAdd.length!==0){
                Array.prototype.push.apply(sortedLongs, longsToAdd);
                
                for(var i=0; i< longsToAdd.length; i++){
                    remainingLongs.splice(remainingLongs.indexOf(longsToAdd[i]),1);
                }
            }
            if(remainingLongs.length!==0){
                
                leftoverMilimeters =$scope.sticksSize-remainingLongs[0];
                sortedLongs.push(remainingLongs[0]);
                remainingLongs.splice(0,1);
            }
        }
    }
    
    function getLongsToAdd(leftoverMilimeters, remainingLongs){
        var arraySmallestDifference={
            difference:$scope.sticksSize+1,
            array:[]    
        };
        
        if(remainingLongs.length===1){
            return [remainingLongs[0]];
        }
        
        for(var i=0;i<remainingLongs.length;i++){
            if(remainingLongs[i]>leftoverMilimeters){
                continue;
            }
            var arrayDifference = getBestArrayDifferenceFor(remainingLongs[i], leftoverMilimeters, remainingLongs.slice(i+1, remainingLongs.length));

            if(arrayDifference.difference < arraySmallestDifference.difference){
                arraySmallestDifference = arrayDifference;
            }
        }
        
        return arraySmallestDifference.array;
    }
    
    function getBestArrayDifferenceFor(baseNumber, maxSum, leftoverArray){
        var bestArrayDifference={
            difference:$scope.sticksSize+1,
            array:[]    
        };
        bestArrayDifference.array = [baseNumber];
        bestArrayDifference.difference = maxSum - baseNumber;
        var bestDifference = maxSum;
        while(leftoverArray.length>0){
            if(baseNumber+ leftoverArray[0]> maxSum){
                leftoverArray.splice(0,1);
            }
            else{
                var tempArray=[baseNumber];
                var temDifference = maxSum - baseNumber;
                var reversedLeftoverArray = Array.prototype.slice.call(leftoverArray).reverse();
                var j = 0;
                while(temDifference-reversedLeftoverArray[j]>=0){
                    var longToAdd = reversedLeftoverArray[j];
                        tempArray.push(longToAdd);
                        temDifference -= longToAdd;
                        leftoverArray.splice(leftoverArray.indexOf(longToAdd),1);
                        j++;
                }

                if(temDifference < bestDifference){
                    bestDifference = temDifference;
                    bestArrayDifference.array = tempArray;
                    bestArrayDifference.difference = temDifference;
                }
            }
        }
        
        return bestArrayDifference;
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
            tempSum += sortedLongs[i];
            if(tempSum>$scope.sticksSize){
                
                tempSum = sortedLongs[i];
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
            addRectangle(sortedLongs[i], context);
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
  });