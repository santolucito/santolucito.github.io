registerProcessor('gain-processor', class extends AudioWorkletProcessor {
    static get parameterDescriptors() { return [{ name: 'gain', defaultValue: 1 }] }

    // read the spec! https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/process
    process(inputs, outputs, parameters) {
        // inputs[n][m][i] will access n-th input, m-th channel of that input, and i-th sample of that channel.
        // loop through every channel, and every sample for every channel
        let monoInput = inputs[0][0];
        for (let sampleIdx = 0; sampleIdx < monoInput.length; ++sampleIdx) {
            outputs[0][0][sampleIdx] = monoInput[sampleIdx] * parameters.gain
        }

        //Returns "a Boolean value indicating whether or not to force the AudioWorkletNode to remain active even if the user agent's internal logic would otherwise decide that it's safe to shut down the node."
        return true; //this should be false, but isnt working for me at the moment
    }
})