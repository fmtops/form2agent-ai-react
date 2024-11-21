export enum AudioState {
  NoState,
  Calibration,
  ReadyToTranscribe,
  ReadyToSend,
}

/** The requested type of Text-to-Speech provider. */
export enum TTSProvider {
  /** Google Cloud TTS (including models such as Journey, Wavenet, and Standard). */
  GoogleCloud,
}
