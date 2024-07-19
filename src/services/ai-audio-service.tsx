import axios, { AxiosResponse } from "axios";
import { TranscribeResponse } from "../types/api/AiChatServiceTypes";
import { DEFAULT_TTS_VOICE_NAME } from "../consts/audio.consts";
import conf from "../configs/aiconfig.json";
import { getStoredApiKey } from "../utils/api-key.utils";

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

    let response: AxiosResponse;

    try {
      response = await axios.post(
        process.env.REACT_APP_AI_API_URL + "/audio/transcription",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Llm-Api-Key": `${getStoredApiKey()}`
          },
        }
      );
    } catch (e) {
      console.log("error", e);
      throw new NetworkError("Unable to reach the network.");
    }

    return response.data;
  }

  /**
   * @param text - text to convert to speech
   * @returns returns the readable stream of the audio
   * @description Used to convert the text to speech. If fails it throws a `NetworkError`
   *  */
  async textToSpeech(text: string) {
    let response: Response;

    try {
      response = await fetch(
        process.env.REACT_APP_AI_API_URL + "/audio/tts/stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Llm-Api-Key": `${getStoredApiKey()}`
          },
          body: JSON.stringify({
            text,
            voice: DEFAULT_TTS_VOICE_NAME,
          }),
        }
      );
    } catch (e) {
      console.log("error", e);
      throw new NetworkError("Unable to reach the network.");
    }

    if (response === null || response.body === null)
      throw new NetworkError("Response or body is null.");

    return response.body.getReader();
  }
}
