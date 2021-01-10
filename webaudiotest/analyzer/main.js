
document.addEventListener("DOMContentLoaded", function(event) {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    analyser.connect(audioCtx.destination);



})


function visualize() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
  
  
    var visualSetting = visualSelect.value;
    console.log(visualSetting);

      analyser.fftSize = 256;
      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
      var dataArray = new Float32Array(bufferLength);
  
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  
      function draw() {
        drawVisual = requestAnimationFrame(draw);
  
        analyser.getFloatFrequencyData(dataArray);
  
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;
  
        for(var i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] + 140)*2;
          
          canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight+100) + ',50,50)';
          canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
  
          x += barWidth + 1;
        }
      };
  
      draw();

  
  }