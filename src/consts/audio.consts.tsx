/**  Use with {@link Math.abs} to get an accurate representation of noise level,
 * regardless of whether the sound falls at, below or above the midpoint. */
export const WAVEFORM_MIDPOINT = 128;

export const DEFAULT_SAMPLE_RATE = 24000;

/**
 * A delay [ms] before beginning to process and play the first chunks of audio.
 * This is an arbitrary value to avoid lag caused by network latency.
 */
export const AUDIO_PROCESSING_DELAY_MS = 50;
