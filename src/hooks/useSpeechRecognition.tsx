import { useRef, useEffect, useCallback, useState } from "react";
import {
  setupAudioRecorder,
  setupAudioAnalyser,
} from "../utils/setup-speech-recognition";
import { WAVEFORM_MIDPOINT } from "../consts/audio.consts";
import { aiConfig } from "../configs/configs";
import { AudioState } from "../types/Chat/Audio";
import { ChatMessageType } from "../types/Chat/Chat";
import { AudioRecorder } from "../lib/audio/audio-recorder";

type UseSpeechRecognitionType = {
  startListening: () => void;
  stopListening: () => void;
  audioState: AudioState;
  audioStateProgress: number;
};

/**
 *
 * @param isDisabled - to check if the speech recognition is disabled
 * @param isListening - to check if the speech recognition is listening
 * @param setIsListening - function to set the speech recognition listening state
 * @param message - string to set the message
 * @param setMessage - function to set the message
 * @param chatHistory - array of chat messages
 * @param sendMessage - function to send the message
 * @param handleRecognitionError - function to handle a speech recognition error and update the UI
 * @param tryStopAudioResponse - optional, function to try interrupt the audio response, triggered by speech
 * @returns the speech recognition state and functions to start and stop listening
 * `startListening` - function to start listening
 * `stopListening` - function to stop listening
 * `audioState` - the current audio state
 * `audioStateProgress` - the progress of the current audio state
 * @example
 * ```tsx
 * const { startListening, stopListening, audioState, audioStateProgress } = useSpeechRecognition(
 *  isDisabled,
 * isListening,
 * setIsListening,
 * message,
 * setMessage,
 * chatHistory,
 * sendMessage,
 * handleRecognitionError
 * );
 * ```
 * @description Used to manage the speech recognition
 * */
const useSpeechRecognition = (
  isDisabled: boolean,
  isListening: boolean,
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  chatHistory: ChatMessageType[],
  sendMessage: () => void,
  handleRecognitionError: (error: unknown) => void,
  tryStopAudioResponse: (() => void) | undefined = undefined
): UseSpeechRecognitionType => {
  // Compatibility check
  if (window.AudioContext === undefined) {
    throw new Error("Audio Context API is not supported in this browser.");
  }

  // Refs and state
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioRecorderRef = useRef<AudioRecorder | null>(null);
  const noiseDetectionIntervalRef = useRef<NodeJS.Timer | null>(null);
  const isThereAudioToTranscribeRef = useRef(false);
  const transcribingQueuesAmountRef = useRef(0);
  const isDisabledRef = useRef(isDisabled);
  const isListeningRef = useRef(isListening);
  const messageRef = useRef(message);
  const lastMessageRef = useRef("");
  const sendMessageRef = useRef(sendMessage);
  const tryStopAudioResponseRef = useRef(tryStopAudioResponse);
  const [audioState, setAudioState] = useState(AudioState.NoState);
  const [audioStateProgress, setAudioStateProgress] = useState(0);

  // Helper functions
  const progressBarClear = () => {
    setAudioState(AudioState.NoState);
    setAudioStateProgress(0);
  };

  const progressBarUpdate = (
    newAudioState: AudioState,
    totalTimeToReach: number,
    dateNow: number,
    dateStart: number,
    gracePeriodTime: number = 0
  ) => {
    // Don't display progress bar before we reach the grace period
    // This is done to avoid excessive flickering of the progress bar
    if (gracePeriodTime > 0 && dateNow - dateStart < gracePeriodTime) {
      return;
    }

    // Update state name
    if (audioState !== newAudioState) {
      setAudioState(newAudioState);
    }

    // Update state progress
    let progressRemaining =
      (100 * (totalTimeToReach - (dateNow - dateStart))) /
      (totalTimeToReach - gracePeriodTime);
    progressRemaining = progressRemaining < 0 ? 0 : progressRemaining;

    setAudioStateProgress(progressRemaining);
  };

  // Use Effects
  useEffect(() => {
    isDisabledRef.current = isDisabled;
  }, [isDisabled]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  useEffect(() => {
    lastMessageRef.current = chatHistory.at(-1)?.message || "";
  }, [chatHistory]);

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  useEffect(() => {
    tryStopAudioResponseRef.current = tryStopAudioResponse;
  }, [tryStopAudioResponse]);

  // Main listening function
  const startListening = useCallback(async () => {
    setIsListening(true);

    // Get audio
    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (error) {
      return;
    }

    // Setup audio recorder and audio analyser
    audioRecorderRef.current = setupAudioRecorder(
      mediaStreamRef.current,
      transcribingQueuesAmountRef,
      messageRef,
      setMessage,
      lastMessageRef,
      handleRecognitionError
    );

    const { audioAnalyser, analysedAudioDataArray } = setupAudioAnalyser(
      mediaStreamRef.current
    );

    // Calibration loop
    const noiseValues: number[] = [];
    const calibrationTotalTime =
      aiConfig.SPEECH.CALIBRATION_INTERVAL *
      aiConfig.SPEECH.CALIBRATION_SAMPLE_COUNT;
    const calibrationStartTime = Date.now();

    const calibrationIntervalId = setInterval(() => {
      audioAnalyser.getByteTimeDomainData(analysedAudioDataArray);
      const avgNoise =
        analysedAudioDataArray.reduce(
          (sum, value) => sum + Math.abs(value - WAVEFORM_MIDPOINT),
          0
        ) / analysedAudioDataArray.length;
      noiseValues.push(avgNoise);

      progressBarUpdate(
        AudioState.Calibration,
        calibrationTotalTime,
        Date.now(),
        calibrationStartTime
      );
    }, aiConfig.SPEECH.CALIBRATION_INTERVAL);

    // Noise detection loop
    setTimeout(
      () => {
        clearInterval(calibrationIntervalId);

        const noiseSpeechThreshold =
          aiConfig.SPEECH.NOISE_THRESH_BASE +
          Math.max(...noiseValues) * aiConfig.SPEECH.NOISE_THRESH_MOD;

        progressBarClear();

        // We should allow for very brief periods of silence during speech
        // Don't break out of speech until we've had a few samples of silence
        // Start with silence by default, reset when we detect noise
        let samplesOfSilence = aiConfig.SPEECH.SAMPLES_TO_BREAK_INTO_SILENCE;

        let silenceThresholdToTranscribeReached = false;
        let soundThresholdToConfirmIntentReached = false;
        let silenceStartedAt: number | null = null;
        let soundStartedAt: number | null = null;

        noiseDetectionIntervalRef.current = setInterval(async () => {
          // Don't do anything if we're not supposed to listen.
          if (!isListeningRef.current) return;

          // Pause the recording if the chat input is disabled.
          if (isDisabledRef.current) {
            await audioRecorderRef.current?.tryPause();
            return;
          }

          // Start a new recording if the previous one was stopped and processed,
          // pause it so we can resume when the user starts speaking again.
          if (await audioRecorderRef.current?.tryRestartAndPause()) {
            return; // don't analyse b4 next loop, it can break progress bars
          }

          // Analyse the audio data to get the average noise level (volume)
          audioAnalyser.getByteTimeDomainData(analysedAudioDataArray);
          const avgNoise =
            analysedAudioDataArray.reduce(
              (sum, value) => sum + Math.abs(value - WAVEFORM_MIDPOINT),
              0
            ) / analysedAudioDataArray.length;
          const dateNow = Date.now();

          // If the noise level is below the threshold, register another tick/iteration of silence.
          // Otherwise, break the streak of silence by resetting the counter.
          if (avgNoise < noiseSpeechThreshold) {
            samplesOfSilence++;
          } else samplesOfSilence = 0;

          // If enough samples of silence have been collected, switch the "timers" to represent no sound.
          // Otherwise, the timers should count down time since the last sound was detected.
          if (
            samplesOfSilence >= aiConfig.SPEECH.SAMPLES_TO_BREAK_INTO_SILENCE
          ) {
            soundStartedAt = null;
            // if silence timer has not been started, start the timer and the loop
            // by setting silenceThresholdToTranscribeReached to false
            // otherwise if there is an ongoing or pending transcription, keep resetting it
            // we don't want the timer for sending to run while we are waiting for the API
            if (silenceStartedAt === null) {
              silenceStartedAt = dateNow;
              silenceThresholdToTranscribeReached = false;
            } else if (
              transcribingQueuesAmountRef.current > 0 ||
              (silenceThresholdToTranscribeReached &&
                (messageRef.current === "" ||
                  isThereAudioToTranscribeRef.current))
            ) {
              silenceStartedAt = dateNow;
            }
          } else {
            silenceStartedAt = null;
            silenceThresholdToTranscribeReached = false;
            if (soundStartedAt === null) {
              soundStartedAt = dateNow;
            }
          }

          // Pause the recording if there is no speech for a certain amount of time.
          if (
            silenceStartedAt !== null &&
            dateNow - silenceStartedAt > aiConfig.SPEECH.TIME_TO_PAUSE
          ) {
            await audioRecorderRef.current?.tryPause();
          }

          // Check if we've reached the threshold to confirm the user intended to speak.
          // Try to resume the recording if it's paused and speech is detected.
          if (
            silenceStartedAt !== null &&
            soundThresholdToConfirmIntentReached
          ) {
            // If the threshold to transcribe has not been reached yet, update the progress bar with 'ready to transcribe' timer,
            // stop and process the recording once/if the threshold is reached.
            // Otherwise, if there is no audio to transcribe and there is a message in the chat,
            // update the progress bar with 'ready to send' timer, and send it once/if the threshold to send is reached.
            // If we are not counting down towards either of those actions, clear the progress bar.
            if (!silenceThresholdToTranscribeReached) {
              // Count down towards transcribing the recording
              progressBarUpdate(
                AudioState.ReadyToTranscribe,
                aiConfig.SPEECH.TIME_TO_TRANSCRIBE,
                dateNow,
                silenceStartedAt,
                aiConfig.SPEECH.DISPLAY_PROGRESS_GRACE_PERIOD
              );

              // Transcribe the recording and update flags
              if (
                dateNow - silenceStartedAt >
                aiConfig.SPEECH.TIME_TO_TRANSCRIBE
              ) {
                silenceStartedAt = dateNow; // count from 0 for sending interaction
                silenceThresholdToTranscribeReached = true;
                isThereAudioToTranscribeRef.current = false;
                await audioRecorderRef.current?.tryStopAndProcess();
              }
            } else if (
              !isThereAudioToTranscribeRef.current &&
              transcribingQueuesAmountRef.current <= 0 &&
              silenceThresholdToTranscribeReached &&
              messageRef.current?.trim()
            ) {
              // Count down towards sending the message
              progressBarUpdate(
                AudioState.ReadyToSend,
                aiConfig.SPEECH.TIME_TO_SEND,
                dateNow,
                silenceStartedAt,
                aiConfig.SPEECH.DISPLAY_PROGRESS_GRACE_PERIOD
              );

              // Send the message if ready and update flags
              if (dateNow - silenceStartedAt > aiConfig.SPEECH.TIME_TO_SEND) {
                silenceStartedAt = null;
                soundThresholdToConfirmIntentReached = false;
                sendMessageRef.current();
              }
            } else {
              progressBarClear(); // No actions are taking place, clear the progress bar.
            }
          } else if (soundStartedAt !== null) {
            progressBarClear(); // No countdowns when the user is speaking - reset the progress.
            await audioRecorderRef.current?.tryResume(); // Resume the recording immediately to not miss anything.

            // If the noise has been detected for long enough, update flags to confirm the user intended to speak.
            if (
              dateNow - soundStartedAt >
              aiConfig.SPEECH.TIME_TO_CONFIRM_SPEECH
            ) {
              isThereAudioToTranscribeRef.current = true;
              soundThresholdToConfirmIntentReached = true;
            }
          } else {
            // Silent, but didn't reach the intent threshold - no progress should be displayed.
            progressBarClear();
          }

          // Try to interrupt the TTS playback if the user is speaking over it
          if (
            tryStopAudioResponseRef.current &&
            soundStartedAt !== null &&
            dateNow - soundStartedAt > aiConfig.SPEECH.TIME_TO_INTERRUPT_TTS
          ) {
            tryStopAudioResponseRef.current();
          }
        }, aiConfig.SPEECH.DETECTION_INTERVAL);
      },
      // Set the noise detection timeout delay to the calibration time + 5ms
      aiConfig.SPEECH.CALIBRATION_INTERVAL *
        aiConfig.SPEECH.CALIBRATION_SAMPLE_COUNT +
        5
    );

    // Start the first recording
    await audioRecorderRef.current.tryStart();
  }, [setIsListening, setMessage]);

  const stopListening = useCallback(async () => {
    setIsListening(false);
    progressBarClear();

    if (noiseDetectionIntervalRef.current !== null) {
      clearInterval(noiseDetectionIntervalRef.current);
      noiseDetectionIntervalRef.current = null;
    }

    if (audioRecorderRef.current !== null) {
      await audioRecorderRef.current?.tryStopAndProcess();
    }

    if (mediaStreamRef.current !== null) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
  }, [setIsListening]);

  // Cleanup when the parent component is unmounted
  useEffect(() => {
    return () => {
      if (noiseDetectionIntervalRef.current !== null) {
        clearInterval(noiseDetectionIntervalRef.current);
      }

      if (mediaStreamRef.current !== null) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    startListening,
    stopListening,
    audioState: audioState,
    audioStateProgress: audioStateProgress,
  };
};

export default useSpeechRecognition;
