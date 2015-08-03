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
        updateSticksDetails(windowPart);
        sortedLongs = [];
    }


    $scope.refreshCanvas = function(){
        updateSticksDetails($scope.selectedWindowPart);
        repaintCanvas();
        sortedLongs = [];
    }
    
    function updateSticksDetails(windowPart) {
        $scope.sticksSizes = windowsInfo.getSticksSizes(windowPart);
        var defaultStickSize = $scope.sticksSizes[0];
        $scope.sticksSizes.splice(0, 1);
        $scope.sticksSizes = _.filter($scope.sticksSizes, function (stickSize) { return stickSize != 0});
        $scope.sticksSizes.sort(function(stick1, stick2) {
            return stick1 - stick2;
        });
        $scope.sticksSizes.push(defaultStickSize);
        $scope.longObjects = windowsInfo.getLongs(windowPart);
        $scope.longRows = _.pluck($scope.longObjects,'value');
        
        sortedLongs = LongsSorter.sortLongs($scope.longObjects, $scope.sticksSizes);
        
        if(!sortedLongs) sortedLongs = [];
        recalculateDetails();
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
            stickLong: $scope.sticksSizes[0],
            values : [],
            lostMilimeters: $scope.sticksSizes[0] 
          });

        if(sortedLongs[0].value > $scope.sticksSizes[0]) {
            $scope.sticksDetails[0].values.push({
                    name: "-----",
                    value: "-----"
            });
        }
        
        while(i < sortedLongs.length) {
            tempSum += parseFloat(sortedLongs[i].value);
            
            if(tempSum <= $scope.sticksSizes[iSticksSizes]) {
                $scope.sticksDetails[numberOfSticks-1].values.push(sortedLongs[i]);
                $scope.sticksDetails[numberOfSticks-1].lostMilimeters = ($scope.sticksSizes[iSticksSizes] - tempSum).toFixed(1);
                i++;
            }
            
            else{
                tempSum = 0;
                numberOfSticks++;
                
                if(iSticksSizes < ($scope.sticksSizes.length-1)) {
                    iSticksSizes++;
                }
                
                $scope.sticksDetails.push({
                    numberOfStick : numberOfSticks,
                    stickLong: $scope.sticksSizes[iSticksSizes],
                    values : [],
                    lostMilimeters: $scope.sticksSizes[iSticksSizes]
                });
            }            
            
        }
    }
    
    function repaintCanvas(){
        var sticksCanvas = document.getElementById('sticksCanvas');
        var stage = new createjs.Stage("sticksCanvas");
        var iSticksSizes = 1;
        $scope.canvasData.lastXposition = 5;
        $scope.canvasData.accumulatedMilimeters = 0;
        $scope.canvasData.numberOfSticks = 1;
        //context.clearRect(0, 0, sticksCanvas.width, sticksCanvas.height);
        
        var longTextLabel = new createjs.Text("Longitud", '12px Arial', '#821B2C');
        longTextLabel.x = 5;
        longTextLabel.y = 5;
        var cutsTextLabel = new createjs.Text("Cortes de barras", '12px Arial', '#821B2C');
        cutsTextLabel.x = 300;
        cutsTextLabel.y = 5;
        
        //new Opentip("#sticksCanvas", "Shown after 2 seconds", { delay: 0 });
        //this.longTextLabel.opentip("Shown after 2 seconds", { delay: 2 });
        
        stage.addChild(longTextLabel);
        stage.addChild(cutsTextLabel);
        paintSticks(stage);       
    }
    
    function paintSticks(stage) {
        for(var i = 0; i < $scope.sticksDetails.length; i++){
            $scope.canvasData.lastXposition = 70;
            var stickDetails = $scope.sticksDetails[i];
            var numberOfStick = stickDetails.numberOfStick;
            var stickLong = stickDetails.stickLong;
            var maxLongStick = _.max($scope.sticksSizes, function(sticksSizes) { return sticksSizes });
            
            var longLabel = new createjs.Text(stickDetails.stickLong, '12px Arial', '#241C69');
            longLabel.x = 5;
            longLabel.y = 25 * numberOfStick;
            stage.addChild(longLabel);
            
            var stickShape = new createjs.Shape();
            stickShape.graphics.beginStroke("#000000").drawRect(70, 25 * numberOfStick, (600*stickLong) / maxLongStick, 10);
            stickShape.graphics.endStroke();
            stage.addChild(stickShape);


            if(stickDetails.values.length > 0) {
                for(var j = 0; j < stickDetails.values.length; j++) {
                    var longValue = stickDetails.values[j].value;
                    var longShape = new createjs.Shape();
                    longShape.graphics.beginFill("#C4BEBF")
                             .drawRect($scope.canvasData.lastXposition, 25 * numberOfStick, (longValue*600)/maxLongStick, 10);
                    $scope.canvasData.lastXposition += ((longValue*600) / maxLongStick);
                    
                    stage.enableMouseOver();

                    longShape.onMouseOver = function(e) {
                        stage.canvas.title = 'put your tooltip text here';
                        console.log('put your tooltip text here');
                    }

                    longShape.onMouseOut = function(e) {
                        stage.canvas.title = '';
                        console.log('p');
                    }
                    stage.addChild(longShape);

                    var separatorShape = new createjs.Shape();
                    separatorShape.graphics.setStrokeStyle(1,"round");
                    separatorShape.graphics.beginStroke("#FF0000").moveTo($scope.canvasData.lastXposition,(25 * numberOfStick) - 5);
                    separatorShape.graphics.lineTo($scope.canvasData.lastXposition,(25 * numberOfStick) + 15);
                    separatorShape.graphics.endStroke();
                    stage.addChild(separatorShape);
                }
            }
        }
        
        stage.update();
    }
    
    /*function repaintCanvas(){
        var sticksCanvas = document.getElementById('sticksCanvas');
        var stage = new createjs.Stage("sticksCanvas");
        
        var text = new createjs.Text('Hello, World!', '32px Arial', '#53f');
        text.textAlign = 'center';
        text.x = sticksCanvas.width/2;
        text.y = sticksCanvas.height/2;

        stage.addChild(text);

        stage.update();
    }*/
    
 
    $scope.refreshCanvas();
  });