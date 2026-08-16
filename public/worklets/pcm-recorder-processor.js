class PCMRecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 1600; // 100ms at 16kHz (16000 samples/sec * 0.1s)
    this.targetSampleRate = 16000;
    this.accumulatedSamples = [];
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length === 0) return true;

    const inputChannel = input[0];
    if (inputChannel.length === 0) return true;

    // Get the actual sample rate from the audio context
    const sourceSampleRate = sampleRate; // AudioWorkletGlobalScope.sampleRate

    // Convert Float32 samples to 16-bit PCM with downsampling to 16kHz
    const pcmData = this.downsampleAndConvertToPCM(inputChannel, sourceSampleRate, this.targetSampleRate);
    
    // Accumulate samples
    this.accumulatedSamples.push(...pcmData);

    // Send in ~100ms chunks
    while (this.accumulatedSamples.length >= this.bufferSize) {
      const chunk = this.accumulatedSamples.splice(0, this.bufferSize);
      this.port.postMessage({ pcm: chunk });
    }

    return true;
  }

  downsampleAndConvertToPCM(float32Array, sourceRate, targetRate) {
    if (sourceRate === targetRate) {
      return this.floatTo16BitPCM(float32Array);
    }

    // Simple linear interpolation downsampling
    const ratio = sourceRate / targetRate;
    const outputLength = Math.floor(float32Array.length / ratio);
    const result = new Int16Array(outputLength);

    for (let i = 0; i < outputLength; i++) {
      const srcIndex = i * ratio;
      const srcIndexFloor = Math.floor(srcIndex);
      const srcIndexCeil = Math.min(srcIndexFloor + 1, float32Array.length - 1);
      const weight = srcIndex - srcIndexFloor;

      const sample = float32Array[srcIndexFloor] * (1 - weight) + float32Array[srcIndexCeil] * weight;
      result[i] = this.floatTo16Bit(sample);
    }

    return result;
  }

  floatTo16BitPCM(float32Array) {
    const result = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      result[i] = this.floatTo16Bit(float32Array[i]);
    }
    return result;
  }

  floatTo16Bit(floatValue) {
    // Clamp to [-1, 1] range
    const clamped = Math.max(-1, Math.min(1, floatValue));
    // Convert to 16-bit signed integer
    return clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF;
  }
}

registerProcessor('pcm-recorder-processor', PCMRecorderProcessor);