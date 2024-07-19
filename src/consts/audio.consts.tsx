/**  Use with {@link Math.abs} to get an accurate representation of noise level,
 * regardless of whether the sound falls at, below or above the midpoint. */
export const WAVEFORM_MIDPOINT = 128;

/** Default Open-AI text-to-speech voice to use with FM-AI Gateway for TTS. */
export const DEFAULT_TTS_VOICE_NAME = "nova";

/** Default file extension / file format to use with FM-AI Gateway for TTS. */
export const DEFAULT_TTS_FILE_FORMAT = "mpeg"; // note: not all formats supported by Open-AI will work
