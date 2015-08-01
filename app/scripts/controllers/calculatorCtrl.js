'use strict';


angular.module('longCalculatorApp')
  .controller('calculatorCtrl', function ($scope, windowsInfo, LongsSorter) {
    $scope.longValue = '';
    $scope.windowsPartsNames = windowsInfo.getWindowsPartsNames();
    $scope.selectedWindowPart = $scope.windowsPartsNames[0];
    
    $scope.sticksSizes = windowsInfo.getSticksSizes($scope.selectedWindowPart);
    
    $scope.canvasData ={
        numberOfSticks : 1,
        accumulatedMilimeters :0,
        lastXposition: 5
    };
    
    $scope.longObjects = windowsInfo.getLongs($scope.selectedWindowPart);
    $scope.longRows = _.pluck($scope.longObjects,'value');
    $scope.sticksDetails = [];
    var sortedLongs = [];
    
    $scope.windowPartDetails = function(windowPart) {
        $scope.sticksSizes = windowsInfo.getSticksSizes(windowPart);
        $scope.longObjects = windowsInfo.getLongs(windowPart);
        sortLongs();
        recalculateDetails();
        sortedLongs = [];
    }


    $scope.refreshCanvas = function(){
        $scope.sticksSizes = windowsInfo.getSticksSizes($scope.selectedWindowPart);
        $scope.sticksSizes.sort(function(stick1, stick2) {
            return stick1 - stick2;
        });
        $scope.longObjects = windowsInfo.getLongs($scope.selectedWindowPart);
        $scope.longRows = _.pluck($scope.longObjects,'value');
        
        sortedLongs = LongsSorter.sortLongs($scope.longObjects, $scope.sticksSizes);
        
        if(!sortedLongs) sortedLongs = [];
        recalculateDetails();
        repaintCanvas();
        sortedLongs = [];
    }
    
    function recalculateDetails(){
        if(sortedLongs.length==0) 
        {
            $scope.sticksDetails=[];
            return;
        }
        
        $scope.sticksDetails = [];
        var tempSum = 0;
        var numberOfSticks = 1;
        var iSticksSizes = 0;
        var i = 0;
        
        $scope.sticksDetails.push({
            numberOfStick : 1,
            longStick: $scope.sticksSizes[0],
            values : [],
            lostMilimeters: 0
          });
        
        while(i < sortedLongs.length) {
            tempSum += parseFloat(sortedLongs[i].value);
            
            if(tempSum > $scope.sticksSizes[iSticksSizes]){
                tempSum = parseFloat(sortedLongs[i].value);
                numberOfSticks++;
                
                if(iSticksSizes < ($scope.sticksSizes.length-1)) {
                    iSticksSizes++;
                }
                
                $scope.sticksDetails.push({
                    numberOfStick : numberOfSticks,
                    longStick: $scope.sticksSizes[iSticksSizes],
                    values : [],
                    lostMilimeters: 0
                });
            }
            
            if(tempSum < $scope.sticksSizes[iSticksSizes]) {
                $scope.sticksDetails[numberOfSticks - 1].values.push(sortedLongs[i]);
                $scope.sticksDetails[numberOfSticks - 1].lostMilimeters = ($scope.sticksSizes[iSticksSizes] - tempSum).toFixed(1);
                i++;
            }
        }
    }
    
    function repaintCanvas(){
        var sticksCanvas = document.getElementById('sticksCanvas');
        var context = sticksCanvas.getContext('2d');
        var iSticksSizes = 1;
        $scope.canvasData.lastXposition = 5;
        $scope.canvasData.accumulatedMilimeters = 0;
        $scope.canvasData.numberOfSticks = 1;
        context.clearRect(0, 0, sticksCanvas.width, sticksCanvas.height);
 
        paintSticks(context);       
    }
        
        function paintSticks(context) {
            for(var i = 0; i < $scope.sticksDetails.length; i++){
                $scope.canvasData.lastXposition = 5;
                var stickDetails = $scope.sticksDetails[i];
                var numberOfStick = stickDetails.numberOfStick;
                var longStick = stickDetails.longStick;
                var maxLongStick = $scope.sticksSizes[$scope.sticksSizes.length-1];
                
                context.strokeStyle='black';
                context.strokeRect(5, 25 * numberOfStick, (600*longStick) / maxLongStick, 10); 

                if(stickDetails.values.length > 0) {
                    for(var j = 0; j < stickDetails.values.length; j++) {
                        var longValue = stickDetails.values[j].value;
                        context.fillRect($scope.canvasData.lastXposition, 25 * numberOfStick, (longValue*600) / maxLongStick, 10);
                        $scope.canvasData.lastXposition += ((longValue*600) / maxLongStick);
                        
                        context.beginPath();
                        context.moveTo($scope.canvasData.lastXposition,(25 * numberOfStick) - 10);
                        context.lineTo($scope.canvasData.lastXposition,(25 * numberOfStick) + 20);
                        context.strokeStyle='red';
                        context.stroke();
                    }
                }
            }
        }
 
    $scope.refreshCanvas();
  });