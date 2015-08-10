'use strict';


angular.module('longCalculatorApp')
  .controller('calculatorCtrl', ['$scope', 'windowsInfo', 'LongsSorter', function ($scope, windowsInfo, LongsSorter) {
    
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
                    if($scope.sticksDetails[numberOfSticks-2].values.length == 0) {
                        $scope.sticksDetails[numberOfSticks-2].values.push({
                                name: "-----",
                                value: "-----"
                        });
                    }
                    
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
    
    function repaintCanvas() {
        var stage = new Kinetic.Stage({
        container: 'sticksCanvas',
        width: 800,
        height: 700
      });
        
        var shapesLayer = new Kinetic.Layer();
        var tooltipLayer = new Kinetic.Layer();
        
        var indexTextLabel = new Kinetic.Text({
                text: 'Numero',
                x:5,
                y:5,
                fontFamily: 'Calibri',
                fontSize: 18,
                padding: 5,
                fill: 'white'
            });
        var longTextLabel = new Kinetic.Text({
                text: "Longitud",
                x:70,
                y:5,
                fontFamily: "Calibri",
                fontSize: 18,
                padding: 5,
                fill: 'white'
            });
        var cutsTextLabel = new Kinetic.Text({
                text: "Cortes",
                x:300,
                y:5,
                fontFamily: "Calibri",
                fontSize: 18,
                padding: 5,
                fill: 'white'
            });
 
            shapesLayer.add(indexTextLabel);
            shapesLayer.add(longTextLabel);
            shapesLayer.add(cutsTextLabel);
            
            
            paintSticks(stage, shapesLayer, tooltipLayer);
            stage.add(shapesLayer);
            stage.add(tooltipLayer);
    }
    
    function paintSticks(stage, shapesLayer, tooltipLayer) {
        for(var i = 0; i < $scope.sticksDetails.length; i++){               
            var stickDetails = $scope.sticksDetails[i];
            var numberOfStick = stickDetails.numberOfStick;
            var stickLong = stickDetails.stickLong;
            var maxLongStick = _.max($scope.sticksSizes, function(sticksSizes) { return sticksSizes });
        
            var indexLabel = new Kinetic.Text({
                text: stickDetails.numberOfStick,
                x:5,
                y:30 * numberOfStick,
                fontFamily: "Calibri",
                fontSize: 15,
                padding: 5,
                fill: 'white'
            });
            shapesLayer.add(indexLabel);
            
            var longLabel = new Kinetic.Text({
                text: stickDetails.stickLong,
                x:70,
                y:30 * numberOfStick,
                fontFamily: "Calibri",
                fontSize: 15,
                padding: 5,
                fill: 'white'
            });
            shapesLayer.add(longLabel);
            
            var stickShape = new Kinetic.Rect({
                x: 135,
                y: 30 * numberOfStick + 8,
                stroke: '#ffffff',
                strokeWidth: 1,
                //fill: '#ddd',
                width: (500*stickLong) / maxLongStick,
                height: 10,
                shadowColor: 'black',
                shadowBlur: 1,
                shadowOffset: {x:1,y:1},
                shadowOpacity: 0.2,
                cornerRadius: 1
              });
              stickShape.lostMilimeters = stickDetails.lostMilimeters;
              stickShape.numberOfStick = stickDetails.numberOfStick;
              shapesLayer.add(stickShape);
                                    
              stickShape.on("mousemove", function(evt){
                  var mousePos = stage.getPointerPosition ();
                  stickTooltip.position({x:mousePos.x -170, y:mousePos.y +5});
                  stickTooltip.getText().text("Barra: " + this.numberOfStick + 
                                              "\nPerdida:" + this.lostMilimeters + " [mm]");

                  stickTooltip.show();
                  shapesLayer.draw();               
              });

              stickShape.on("mouseout", function(){
                  stickTooltip.hide();
                  shapesLayer.batchDraw();
              });
              
              if(stickDetails.values.length > 0 && stickDetails.values[0].name != "-----") {
                                    
                  //Paint cuts
                  $scope.canvasData.lastXposition = 135;
                  for(var j = 0; j < stickDetails.values.length; j++) {
                     var longValue = stickDetails.values[j].value;
                     
                     var longShape = new Kinetic.Rect({
                         x: $scope.canvasData.lastXposition,
                         y: 30 * numberOfStick + 8,
                         stroke: '#ffffff',
                         strokeWidth: 0,
                         fill: '#ddd',
                         width: (longValue*500)/maxLongStick,
                         height: 10
                     });
                     longShape.name = stickDetails.values[j].name;
                     longShape.value = stickDetails.values[j].value;  
                     longShape.numberOfStick = stickDetails.numberOfStick;   
                     $scope.canvasData.lastXposition += ((longValue*500) / maxLongStick);
                     shapesLayer.add(longShape);

                      longShape.on("mousemove", function(){
                          var mousePos = stage.getPointerPosition ();
                          //stickTooltip.setPosition(mousePos.x + 10, mousePos.y + 5);
                          stickTooltip.position({x:mousePos.x + 10, y:mousePos.y +5});
                          stickTooltip.getText().text("Barra: " + this.numberOfStick +
                                                      "\nVentana: " + this.name + 
                                                      "\nLongitud: " + this.value+" [mm]");
                          stickTooltip.show();
                          shapesLayer.draw();
                      });

                      longShape.on("mouseout", function(){
                          stickTooltip.hide();
                          shapesLayer.draw();  
                      });
                  }
                  
                  //Paint separators
                  $scope.canvasData.lastXposition = 135;
                  for(var j = 0; j < stickDetails.values.length; j++) {  
                      var longValue = stickDetails.values[j].value;
                      $scope.canvasData.lastXposition += ((longValue*500) / maxLongStick);
                      var separatorShape =  new Kinetic.Rect({
                          x: $scope.canvasData.lastXposition,
                          y: (30 * numberOfStick + 8)- 5,
                          stroke: '#FF0000',
                          strokeWidth: 1,
                          width: 1,
                          height: 20,
                          cornerRadius: 1
                        });                    
                      shapesLayer.add(separatorShape);
                  }
                  
                  var stickTooltip = new Kinetic.Label({
                    opacity: 0.75,
                    visible: false
                  });

                  stickTooltip.add(new Kinetic.Tag({
                    fill: 'black',
                    shadowOpacity: 0.5
                  }));

                  stickTooltip.add(new Kinetic.Text({
                    //text: 'Tooltip pointing \ndown',
                    text: '',
                    fontFamily: 'Calibri',
                    fontSize: 18,
                    padding: 5,
                    fill: 'white'
                  }));
                  shapesLayer.add(stickTooltip);
                  
              }   
        }
    }
 
    $scope.refreshCanvas();
  }]);