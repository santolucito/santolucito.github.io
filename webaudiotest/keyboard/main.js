document.addEventListener("DOMContentLoaded", function(event) {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const globalGain = audioCtx.createGain();
    globalGain.gain.setValueAtTime(0.8, audioCtx.currentTime)

    globalGain.connect(audioCtx.destination);

    let waveform = 'sine'

    const activeOscillators = {};
    const activeGains = {};

    const keyboardFrequencyMap = {
        '90': 261.625565300598634,  //Z - C
        '83': 277.182630976872096, //S - C#
        '88': 293.664767917407560,  //X - D
        '68': 311.126983722080910, //D - D#
        '67': 329.627556912869929,  //C - E
        '86': 349.228231433003884,  //V - F
        '71': 369.994422711634398, //G - F#
        '66': 391.995435981749294,  //B - G
        '72': 415.304697579945138, //H - G#
        '78': 440.000000000000000,  //N - A
        '74': 466.163761518089916, //J - A#
        '77': 493.883301256124111,  //M - B
        '81': 523.251130601197269,  //Q - C
        '50': 554.365261953744192, //2 - C#
        '87': 587.329535834815120,  //W - D
        '51': 622.253967444161821, //3 - D#
        '69': 659.255113825739859,  //E - E
        '82': 698.456462866007768,  //R - F
        '53': 739.988845423268797, //5 - F#
        '84': 783.990871963498588,  //T - G
        '54': 830.609395159890277, //6 - G#
        '89': 880.000000000000000,  //Y - A
        '55': 932.327523036179832, //7 - A#
        '85': 987.766602512248223,  //U - B
    }


    const waveformControl = document.getElementById('waveform')
    waveformControl.addEventListener('change', function(event) {
      waveform = event.target.value
    });

    const gainControl = document.getElementById('gain')
    gainControl.addEventListener('change', function(event) {
    //   globalGain.gain.setValueAtTime(event.target.value, audioCtx.currentTime)
    });

    window.addEventListener('keydown', keyDown, false);
    window.addEventListener('keyup', keyUp, false);

    function keyDown(event) {
        const key = (event.detail || event.which).toString();
        if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
          playNote(key);
        }
      }
    
      //STOPS & DELETES OSCILLATOR ON KEY RELEASE IF KEY RELEASED IS ON MUSICAL
      //KEYBOARD && THAT KEY IS CURRENTLY ACTIVE
    function keyUp(event) {
        const key = (event.detail || event.which).toString();
        if (keyboardFrequencyMap[key] && activeOscillators[key]) {
            

            //for ...RampToValueAtTime(), "The change starts at the time specified for the previous event", 
            // so we need to trigger an "event" using setValue to set a start time for the ramp
            activeGains[key].gain.setValueAtTime(activeGains[key].gain.value, audioCtx.currentTime)
            activeGains[key].gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime+0.16)
            activeOscillators[key].stop(audioCtx.currentTime+0.16);
            delete activeOscillators[key];
            delete activeGains[key];
        }
      }
    
      //HANDLES CREATION & STORING OF OSCILLATORS
      function playNote(key) {
        const osc = audioCtx.createOscillator();
        osc.frequency.setValueAtTime(keyboardFrequencyMap[key], audioCtx.currentTime)
        osc.type = waveform
        const keyGain = audioCtx.createGain();
        keyGain.gain.setValueAtTime(0, audioCtx.currentTime)
        osc.connect(keyGain).connect(audioCtx.destination)
        osc.start();
        keyGain.gain.setValueAtTime(0.01, audioCtx.currentTime)
        const numOscs = Object.keys(activeOscillators).length+1;
        console.log(numOscs)
        keyGain.gain.exponentialRampToValueAtTime(1/numOscs, audioCtx.currentTime+0.04)
        keyGain.gain.exponentialRampToValueAtTime(1/(numOscs+4), audioCtx.currentTime+0.08)

        Object.keys(activeGains).forEach(o => {
            // "The change starts at the time specified for the previous event"
            // is on a per-node basis
            activeGains[o].gain.setValueAtTime(activeGains[o].gain.value, audioCtx.currentTime)
            activeGains[o].gain.exponentialRampToValueAtTime(1/numOscs, audioCtx.currentTime+0.04)    
        });
        activeGains[key] = keyGain
        activeOscillators[key] = osc
      }
});