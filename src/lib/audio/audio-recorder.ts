import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";

/**
 * @description An abstraction over a recording library to handle recording and transcribing audio.
 * @class AudioRecorder
 * @exports AudioRecorder
 *  */
export class AudioRecorder {
  private recorder: RecordRTCPromisesHandler;
  private onStopCallback: () => void;

  /**
   *
   * @param mediaStream - a media stream with active audio permissions
   * @param onStop - a callback to process the blob and update state after recording
   */
  constructor(mediaStream: MediaStream, onStop: (blob: Blob) => void) {
    // When making changes to the recorder, always test to confirm compatibility with all major browsers
    // Something might be listed as compatible, and still not work very well, see MediaRecorder API and Safari
    this.recorder = new RecordRTCPromisesHandler(mediaStream, {
      type: "audio",
      recorderType: RecordRTC.StereoAudioRecorder, // StereoAudioRecorder works with Safari
      disableLogs: true,
    });

    // This callback is responsible for processing the blob and making changes to state
    this.onStopCallback = () =>
      this.recorder.getBlob().then((blob) => onStop(blob));
  }

  // Private methods
  /**
   * @description Get the state of the recorder.
   * @returns a promise that resolves to a string with a state specific to the type of recorder instance.
   */
  private async getState(): Promise<string> {
    return await this.recorder.getState();
  }

  /**
   * @description See if no recording is in progress (the last recording stopped or no recording ever started).
   * @returns a promise that resolves to a boolean indicating if there is no active recording session.
   */
  private async isInactive(): Promise<boolean> {
    const state = await this.getState();
    return state === "inactive" || state === "stopped";
  }

  /**
   * @description See if the recorder is actively recording audio (recording started and was not paused or stopped).
   * @returns a promise that resolves to a boolean indicating if the recorder is actively capturing audio.
   */
  private async isRecording(): Promise<boolean> {
    return (await this.getState()) === "recording";
  }

  /**
   * @description See if the recorder is paused (recording started, is in progress, and was paused).
   * @returns a promise that resolves to a boolean indicating if the recorder is paused.
   */
  private async isPaused(): Promise<boolean> {
    return (await this.getState()) === "paused";
  }

  // Public methods
  /**
   * @description Start recording audio if a recording is not already in progress.
   * @returns a promise that resolves to a boolean indicating if a new recording was started.
   */
  public async tryStart(): Promise<boolean> {
    const canStartRecording = await this.isInactive();
    if (canStartRecording) {
      await this.recorder.startRecording();
    }
    return canStartRecording;
  }

  /**
   * @description Stop recording audio if a recording is in progress.
   * @returns a promise that resolves to a boolean indicating if the recording was stopped.
   */
  public async tryStopAndProcess(): Promise<boolean> {
    const canStopRecording = !(await this.isInactive());
    if (canStopRecording) {
      await this.recorder.stopRecording().then(this.onStopCallback);
    }
    return canStopRecording;
  }

  /**
   * @description Resume recording audio if a recording is paused.
   * @returns a promise that resolves to a boolean indicating if the recording was resumed.
   */
  public async tryResume(): Promise<boolean> {
    const canResumeRecording = await this.isPaused();
    if (canResumeRecording) {
      await this.recorder.resumeRecording();
    }
    return canResumeRecording;
  }

  /**
   * @description Pause recording audio if actively recording.
   * @returns a promise that resolves to a boolean indicating if the recording was paused.
   */
  public async tryPause(): Promise<boolean> {
    const canPauseRecording = await this.isRecording();
    if (canPauseRecording) {
      await this.recorder.pauseRecording();
    }
    return canPauseRecording;
  }

  /**
   * @description If no recording is in progress, restart the recorder and pause the new recording.
   * @returns a promise that resolves to a boolean indicating if the recording was restarted.
   */
  public async tryRestartAndPause(): Promise<boolean> {
    const canAndShouldRestart = await this.isInactive();
    if (canAndShouldRestart) {
      await this.recorder.reset();
      await this.recorder.startRecording();
      await this.recorder.pauseRecording();
    }
    return canAndShouldRestart;
  }
}
