'use strict'

function drawSpiral(context, canvas) {
  var radius = 0;
  var angle = 0;
  var resolution = 50;
  var rotations = 5;
  context.lineWidth = 1;
  context.strokeStyle = "#0096FF"; // blue-ish color
  context.beginPath();
  context.moveTo(canvas.width / 2, canvas.height / 2);
  for (var n = 0; n < rotations * resolution; n++) {
    radius += 2;
    // make a complete circle every 'resolution' iterations
    angle += (Math.PI * 2) / resolution;
    var x = canvas.width / 2 + radius * Math.cos(angle);
    var y = canvas.height / 2 + radius * Math.sin(angle);
    context.lineTo(x, y);
  }
  context.stroke(); 
};

function download(json) {
  var filename = "spiralData.csv";
  var element = document.createElement('a');
  var fields = Object.keys(json[0])
  var formatNums = function(key, value) { return typeof value == "number" ? parseFloat(parseFloat(value).toFixed(4)) : value } 
  var csv = json.map(function(row){
    return fields.map(function(fieldName){
      return JSON.stringify(row[fieldName], formatNums)
    }).join(',')
  })
  csv.unshift(fields.join(',')) // add header column
  csv = csv.join('\r\n');
  let csvContent = "data:text/csv;charset=utf-8," + csv;
  element.setAttribute('href', encodeURI(csvContent));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var Board = (function() {
   var boardObject = {
     resolution: 2,
     dom: null,
     ctx: null,
     domMem: null,
     ctxMem: null,
     bgColor: '#ffffff',
     pos: {
       x: 0,
       y: 0
     },
     dataArray: null,
     loadToMemory: function loadToMemory(event) {
       var imageObj = event.target;
       this.domMem.width = imageObj.width;
       this.domMem.height = imageObj.height;
       this.ctxMem.drawImage(imageObj, 0, 0);
       this.ctx.drawImage(imageObj, 0, 0);
     },
     init: function init(canvasId) {
       this.dom = document.getElementById(canvasId);
       this.ctx = this.dom.getContext('2d', {desynchronized: true});

       // Additional Configuration
       this.ctx.imageSmoothingEnabled = true;

       // Create buffer
       this.domMem = document.createElement('canvas');
       this.ctxMem = this.domMem.getContext('2d');
       this.ctxMem.fillStyle = this.bgColor;
       this.ctxMem.fillRect(0,0, this.domMem.width, this.domMem.height);

       // Set up sizing
       fitToWindow.bind(this)();
       window.addEventListener('resize', fitToWindow.bind(this));

       // Load canvas from local storage
       if (localStorage.dataURL) {
         var img = new window.Image();
         img.addEventListener('load', this.loadToMemory.bind(this));
         img.setAttribute('src', localStorage.dataURL);
       }
       
       // Draw spiral template
      drawSpiral(this.ctx, this.dom);

     },
     getPointerPos: function getPointerPos(event) {
       return {
         x: (event.pageX - this.pos.x) * this.resolution,
         y: (event.pageY - this.pos.y) * this.resolution
       }
     },
     storeMemory: function storeMemory() {
       this.ctxMem.drawImage(this.dom, 0, 0);
       localStorage.setItem('dataURL', this.domMem.toDataURL());
     },
     clearMemory: function clearMemory() {
       localStorage.clear();
       this.ctx.fillStyle = this.bgColor;
       this.ctx.fillRect(0,0, this.dom.width, this.dom.height);
       this.domMem.width = this.dom.width;
       this.domMem.height = this.dom.height;
       this.ctxMem.fillStyle = this.bgColor;
       this.ctxMem.fillRect(0,0, this.dom.width, this.dom.height);
       if (dataArray.length > 0) {
        download(dataArray);
        dataArray = [];
       }
       drawSpiral(this.ctx, this.dom);

     }
   };

    var fitToWindow = function fitToWindow() {
      var marginX = 10;
      var marginY = 10;

      var heightCss = window.innerHeight - marginY;
      var heightCanvas = heightCss * this.resolution;
      var widthCss = window.innerWidth - marginX;
      var widthCanvas = widthCss * this.resolution;

      // If new size is larger than memory
      if (widthCanvas > this.domMem.width || heightCanvas > this.domMem.height) {
        // Create buffer
        var bufferCanvas = document.createElement('canvas');
        var bufferCtx = bufferCanvas.getContext('2d');

        bufferCanvas.width = this.domMem.width;
        bufferCanvas.height = this.domMem.height;

        // Clear buffer
        bufferCtx.fillStyle = this.bgColor;
        bufferCtx.fillRect(0, 0, widthCanvas, heightCanvas);

        // Save canvas to buffer
        bufferCtx.drawImage(this.dom, 0, 0);

        // Resize memory
        if (this.domMem.width < widthCanvas) this.domMem.width = widthCanvas;
        if (this.domMem.height < heightCanvas) this.domMem.height = heightCanvas;
        this.ctxMem.drawImage(bufferCanvas, 0, 0);
      } else {
        this.ctxMem.drawImage(this.dom, 0 ,0);
      }

      // resize current canvas
      this.dom.style.height = heightCss + 'px';
      this.dom.style.width = widthCss + 'px';
      this.dom.width = widthCanvas;
      this.dom.height = heightCanvas;
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0,0, this.dom.width, this.dom.height);
      this.ctx.drawImage(this.domMem, 0, 0);

      this.pos.x = this.dom.offsetLeft;
      this.pos.y = this.dom.offsetTop;
    }

   return boardObject;
})();
