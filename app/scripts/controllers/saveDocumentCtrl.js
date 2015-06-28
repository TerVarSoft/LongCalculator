'use strict';

angular.module('longCalculatorApp')
  .controller('saveDocumentCtrl', function ($scope) {
    $scope.saveDocument = function(type){
        saveDocumentPDF(type);
    }
    
    function saveDocumentPDF(type) {
        var document = new jsPDF('p', 'pt', 'letter');
        var y = 80;
        
        document.setFont("courier");
        document.setFontType("bold");
        document.setFontSize(20);
        document.text(200, y, 'Ferreteria Cesar');
        
        document.setFontSize(16);
        document.text(40, y+40, 'Tabla de Cortes para: ' + type);
        
        var source = $('#dataTable')[0];
        var specialElementHandlers = {
	       '#bypassme': function(element, renderer) {
		      return true
	       }
        }
        
        var margins = {
            top: y+50,
            left: 60,
            width: 545
        };
        
        document.fromHTML(
            source // HTML string or DOM elem ref.
            , margins.left // x coord
            , margins.top // y coord
            , {
                'width': margins.width // max width of content on PDF
                , 'elementHandlers': specialElementHandlers
            },
            function (dispose) {
              // dispose: object with X, Y of the last line add to the PDF
              //          this allow the insertion of new lines after html
                document.save('Reporte ' + type + '.pdf');
              }
          )	
    }
  });


