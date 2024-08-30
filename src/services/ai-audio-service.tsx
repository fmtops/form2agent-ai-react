import axios, { AxiosResponse } from "axios";
import { TranscribeResponse } from "../types/api/AiChatServiceTypes";
import { DEFAULT_TTS_VOICE_NAME } from "../consts/audio.consts";
import conf from "../configs/aiconfig.json";
import { getStoredApiKey } from "../utils/api-key.utils";
import f2aFetch from "../utils/fetch.utils";

class NetworkError extends Error {}

export class AiAudioService {
  /**
   * @param fileName - name of the file
   * @param file - audio file to transcribe
   * @param currInput - current input
   * @param prevMessage - previous message
   * @returns returns the promise response from the API with the transcription
   * @description Used to transcribe the audio file. If fails it throws a `NetworkError`
   *  */
  async transcribe(
    fileName: string,
    file: Blob,
    currInput: string = "",
    prevMessage: string = ""
  ): Promise<TranscribeResponse> {
    const prompt = prevMessage
      ? `Message: ${prevMessage}\nResponse: ${currInput}`
      : "";

    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("file", file);
    if (conf.SPEECH.USE_TRANSCRIPTION_PROMPT) formData.append("prompt", prompt);

    let response;

    try {
      response = await f2aFetch("/audio/transcription", {
        method: "POST",
        body: formData,
      });
    } catch (e) {
      console.log("error", e);
      throw new NetworkError("Unable to reach the network.");
    }

    const value = (await response.body!.getReader().read()).value;
    const transcriptionText = new TextDecoder().decode(value);

    return JSON.parse(transcriptionText) as TranscribeResponse;
  }

  /**
   * @param text - text to convert to speech
   * @returns returns the readable stream of the audio
   * @description Used to convert the text to speech. If fails it throws a `NetworkError`
   *  */
  async textToSpeech(text: string) {
    let response: Response;

    try {
      response = await f2aFetch("/audio/tts/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice: DEFAULT_TTS_VOICE_NAME,
        }),
      });
    } catch (e) {
      console.log("error", e);
      throw new NetworkError("Unable to reach the network.");
    }

    return response.body!.getReader();
  }
}
