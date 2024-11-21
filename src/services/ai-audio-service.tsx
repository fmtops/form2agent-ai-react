import { TranscribeResponse } from "../types/api/AiChatServiceTypes";
import { aiConfig } from "../configs/configs";
import f2aFetch from "../utils/fetch.utils";
import { TTSProvider } from "../types/Chat/Audio";
import { AssistantType } from "../types/Chat/Chat";

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
    if (aiConfig.SPEECH.USE_TRANSCRIPTION_PROMPT)
      formData.append("prompt", prompt);

    let response;

    response = await f2aFetch("/audio/transcription", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data as TranscribeResponse;
  }

  /**
   * @param text - text to convert to speech
   * @returns returns the readable stream of the audio
   * @description Used to convert the text to speech.
   *  */
  async textToSpeech(text: string) {
    let response: Response;

    response = await f2aFetch("/audio/tts/stream/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Text: text,
        Provider: TTSProvider.GoogleCloud,
        Assistant: AssistantType.FormFilling,
      }),
    });

    return response.body!.getReader();
  }
}
