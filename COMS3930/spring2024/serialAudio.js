
//when the user clicks anywhere on the page
document.addEventListener('click', async () => {
  
  // Prompt user to select any serial port.
  var port = await navigator.serial.requestPort();
  // be sure to set the baudRate to match the ESP32 code
  await port.open({ baudRate: 115200 });

  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;

  reader = inputStream.getReader();
  readLoop();

});


async function readLoop() {
  counterVal = 0;
  const synth = new Tone.Synth().toDestination();

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      // Allow the serial port to be closed later.
      console.log("closing connection")
      reader.releaseLock();
      break;
    }
    if (value) {
      parsedVal = parseInt(value);
      if (!isNaN(parsedVal)) {
        counterVal += parseInt(value);
        //add a tiny bit extra to the time to make Tone.js happy
        synth.triggerAttackRelease((counterVal % 800) + 200, "8n", Tone.now()+counterVal/8000);
      }

    }
  }
};

