import { useState, useEffect, useRef } from "react";
import { INT_16_MAX } from "../consts/type.consts";
import { AUDIO_PROCESSING_DELAY_MS } from "../consts/audio.consts";

const useAudioStreamPlayer = (sampleRate: number) => {
  // Used to store the state of the audio playback and share it outside of the hook.
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  /** @description Used to store the up to date state of the playback in function calls in this hook. */
  const isAudioPlayingRef = useRef(isAudioPlaying);

  /** @description Describes whether buffer scheduling is in-progress or can be started. */
  const areBuffersBeingScheduledRef = useRef(false);

  /**
   * @description Used to describe whether or not the audio should continue to play.
   * Used to avoid recursive buffer processing calls to play audio after the user has paused it.
   */
  const audioShouldPlayRef = useRef(false);

  /** @description Used to store the audio context to be able to play audio. */
  const audioContextRef = useRef<AudioContext | null>(null);

  /**
   * @description Used to specify the (audio context) time to play the next buffer.
   * Initialize with AudioContext.currentTime when 0 and ready to schedule the first buffer.
   */
  const nextBufferContextTime = useRef(0);

  /** @description Used to store the audio buffers to be played in the correct order. */
  const bufferQueueRef = useRef<Float32Array[]>([]);

  /** @description Used to store the references to the audio sources to be able to stop them when needed. */
  const sourceArrayRef = useRef<AudioBufferSourceNode[]>([]);

  // Init the audio context and clean it up when the component unmounts
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)({
      sampleRate: sampleRate,
    });

    // On iOS, to use the media volume instead of the ringer volume with the Web Audio API,
    // starting with iOS 16.4, we can use the audioSession property of the navigator object.
    // https://w3c.github.io/audio-session https://developer.mozilla.org/en-US/docs/Web/API/Navigator#browser_compatibility
    // It should also allow correct (non-muffled) audio playback while recording if we set the value to "play-and-record".
    // More about those issues: https://bugs.webkit.org/show_bug.cgi?id=237322 and https://stackoverflow.com/questions/76083738/ios-safari-lowers-audio-playback-volume-when-mic-is-in-use
    if ((navigator as any).audioSession) {
      (navigator as any).audioSession.type = "play-and-record";
    }

    return () => {
      closeAudioPlayer();
    };
  }, [sampleRate]);

  // Keep the isAudioPlayingRef up to date with the state for in-hook function calls
  useEffect(() => {
    isAudioPlayingRef.current = isAudioPlaying;
  }, [isAudioPlaying]);

  /**
   *
   * @param value raw 8-bit unsigned integer audio data to convert
   * @returns value converted to 32-bit floating point PCM format
   */
  const convertToPCM = (value: Uint8Array): Float32Array => {
    // each PCM sample is derived from two bytes of the input data, so half the size
    const pcmData = new Float32Array(value.length / 2);

    // get the byte at the current position, combine it with the next byte, shifted by 8 bits
    // then sign-extend the 16-bit value and normalize to [-1, 1] by dividing by max int16 value
    for (let i = 0; i < pcmData.length; i++) {
      const sample = ((value[i * 2] | (value[i * 2 + 1] << 8)) << 16) >> 16;
      pcmData[i] = sample / INT_16_MAX;
    }
    return pcmData;
  };

  /**
   * @description Used to try to mark the audio as not playing.
   * If the audio context time is greater than the next buffer time, the audio is not playing.
   * When called in the onended event of the audio source, the next buffer time will always specify the end time of the latest buffer.
   */
  const tryMarkAudioAsNotPlaying = () => {
    if (
      !audioContextRef.current ||
      audioContextRef.current!.currentTime > nextBufferContextTime.current
    ) {
      setIsAudioPlaying(false);
    }
  };

  /**
   * @description Used to schedule and play the audio buffers in the queue in correct order.
   */
  const scheduleQueuedBuffers = () => {
    areBuffersBeingScheduledRef.current = true;

    const scheduleNextBuffer = () => {
      // If there are no buffers in the queue or if the user has paused the audio, return
      // Otherwise, make sure to mark the audio as playing to avoid any UI interaction edge cases
      if (bufferQueueRef.current.length === 0 || !audioShouldPlayRef.current) {
        return;
      } else setIsAudioPlaying(true);

      // Continue to join data from the buffer queue as long as buffer is available
      // This way, less audio buffers and source objects will need to be created and scheduled
      let pcmData = bufferQueueRef.current.shift();
      while (bufferQueueRef.current.length > 0) {
        const nextBuffer = bufferQueueRef.current.shift();
        if (nextBuffer) {
          const joinedBuffer = new Float32Array(
            pcmData!.length + nextBuffer.length
          );
          joinedBuffer.set(pcmData!);
          joinedBuffer.set(nextBuffer, pcmData!.length);
          pcmData = joinedBuffer;
        }
      }
      if (!pcmData) return;

      // Create an audio buffer from the PCM data
      const audioBuffer = audioContextRef.current!.createBuffer(
        1,
        pcmData.length,
        audioContextRef.current!.sampleRate
      );
      audioBuffer.copyToChannel(pcmData, 0);

      // Connect the audio buffer to an audio source and an onended event
      const source = audioContextRef.current!.createBufferSource();
      source.buffer = audioBuffer;
      source.onended = tryMarkAudioAsNotPlaying;
      source.connect(audioContextRef.current!.destination);

      // Init the buffer time if needed, then schedule the audio to play
      // This buffer time snapshot should be taken only immediately before scheduling
      if (nextBufferContextTime.current === 0)
        nextBufferContextTime.current = audioContextRef.current!.currentTime;

      source.start(nextBufferContextTime.current);

      // Store the reference to the source in an array to be able to stop it
      sourceArrayRef.current?.push(source);

      // Update the buffer time and schedule the next buffer if able and if not,
      // mark the buffers as not being scheduled, so it can be retriggered
      // from within chunk processing when new chunks are finally ready to be processed
      nextBufferContextTime.current += audioBuffer.duration;

      if (bufferQueueRef.current.length > 0) scheduleNextBuffer();
      else areBuffersBeingScheduledRef.current = false;
    };

    // Init the recursive calls
    scheduleNextBuffer();
  };

  /**
   * @param reader - ReadableStreamDefaultReader to read the audio data from
   * @description Used to play the audio stream from the reader
   */
  const playAudioStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ) => {
    // Stop and clean up audio first to avoid having multiple tracks playing if used incorrectly
    stopAudioStream();

    setIsAudioPlaying(true); // lock the UI into playing state

    // The audio is expected to play, set the flag to true to be able to process the buffers
    audioShouldPlayRef.current = true;

    // Process the audio stream chunk
    const processChunk = async () => {
      // If the user has paused the audio, stop processing the buffers
      if (!audioShouldPlayRef.current) {
        await reader.cancel();
        return;
      }

      const { done, value } = await reader.read();
      if (done) return;

      try {
        // Once converted to expected format, push the data to the buffer queue
        const pcmData = convertToPCM(value);
        bufferQueueRef.current.push(pcmData);

        // If the audio is not being scheduled and the buffer queue is large enough, start scheduling
        // If scheduling is in-progress, continue adding onto the buffer queue, no need to retrigger here at this point
        if (
          !areBuffersBeingScheduledRef.current &&
          bufferQueueRef.current.length > 0
        ) {
          scheduleQueuedBuffers();
        }
      } catch (error) {
        console.error("Error processing audio chunk", error);
      }

      // Recursively call the function to process the next chunk
      processChunk();
    };

    // Init the recursive calls after a delay
    setTimeout(processChunk, AUDIO_PROCESSING_DELAY_MS);
  };

  /** @description Used to stop the audio playback and clean up / reset all of the state and refs. */
  const stopAudioStream = () => {
    audioShouldPlayRef.current = false;

    // Make sure to stop all the audio sources and get rid of the references
    if (sourceArrayRef.current) {
      sourceArrayRef.current.forEach((source) => {
        source.stop();
        source.disconnect();
      });
      sourceArrayRef.current = [];
    }

    // Reset the AudioContext time to 0 to be able to schedule the next buffer correctly
    nextBufferContextTime.current = 0;

    // Clear the buffers and mark the audio as not playing, ready to be played again
    bufferQueueRef.current = [];
    areBuffersBeingScheduledRef.current = false;
    setIsAudioPlaying(false);
  };

  /**
   * @description Used to clean up the audio context.
   */
  const closeAudioPlayer = () => {
    stopAudioStream();
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return {
    isAudioPlaying,
    playAudioStream,
    stopAudioStream,
  };
};

export default useAudioStreamPlayer;
