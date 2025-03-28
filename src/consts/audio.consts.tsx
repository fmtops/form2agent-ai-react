/**  Use with {@link Math.abs} to get an accurate representation of noise level,
 * regardless of whether the sound falls at, below or above the midpoint. */
export const WAVEFORM_MIDPOINT = 128;

export const DEFAULT_SAMPLE_RATE = 24000;

/**
 * A delay [ms] before beginning to process and play the first chunks of audio.
 * This is an arbitrary value to avoid lag caused by network latency.
 */
export const AUDIO_PROCESSING_DELAY_MS = 50;

/**
 * The minimum cumulative length of audio (from reader.read()) required to start processing.
 * This is an arbitrary value to prevent random/corrupted values from
 * being used as padding during PCM conversion and processing. Should be even.
 */
export const AUDIO_CHUNK_BUFFER_LENGTH = 512;

/**
 * The delay that should be applied when scheduling the first buffer of audio, in seconds.
 *
 * This value is based on testing, and is used to prevent a situation where some time passes between taking a snapshot
 * of {@link BaseAudioContext.currentTime} and the actual time it takes to schedule and start playing the first buffer of audio.
 *
 * For context, scenarios that caused problems had a time difference that was less than 0.0000001 ms.
 */
export const AUDIO_SCHEDULING_INITIAL_DELAY_S = 0.001;
