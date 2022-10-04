//the built-in delayNode operates on blocks (128 samples), so we can only get a minimum of 128 sample delay
//thus, we need to implement our own custom delayNode
registerProcessor('feedbackDelay-processor', class extends AudioWorkletProcessor {
    static get parameterDescriptors() {
        return [
            { name: 'gain', defaultValue: 0.9, minValue: -1, maxValue: 1 },
            { name: 'delayTime', defaultValue: 10, minValue: 0, maxValue: 1000 }]
    }
    constructor() {
        super()
        this.delayBuffer = new Array(48000).fill(0)
        this.readPtr = 0, this.writePtr = 0
    }
    process(inputs, outputs, parameters) {
        let delaySamples = Math.round(sampleRate * parameters.delayTime[0] / 1000),
            bufferSize = this.delayBuffer.length
        for (let i = 0; i < outputs[0][0].length; ++i) {
            outputs[0][0][i] = parameters.gain[0] * this.delayBuffer[this.readPtr] + inputs[0][0][i]
            this.delayBuffer[this.writePtr] = outputs[0][0][i]

            //this implements a circular buffer
            this.writePtr = (this.writePtr + 1) % bufferSize
            this.readPtr = this.writePtr - delaySamples
            if (this.readPtr < 0) {
                this.readPtr = this.readPtr + bufferSize  
            }
        }
        return true
    }
})