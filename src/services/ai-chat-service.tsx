import axios from "axios";
import {
  ChatMessage,
  CreateNewChatResponse,
  SendMessageResponse,
} from "../types/api/AiChatServiceTypes";
import { getStoredLanguage } from "../utils/language.utils";
import { getStoredApiKey } from "../utils/api-key.utils";

class NetworkError extends Error {}

/**
 * @description Service class to interact
 * with the AI Chat API
 * @class AiChatService
 * @exports AiChatService
 *  */
export class AiChatService {
  /**
   * @param formDescription - short description of the form in Natural Language
   * @param formValues - stringified form fields with it's values in JSON ended with "#####jsonEnd" use `stringifyValues` to stringify the values
   * @param formContext - stringified form fields with additional context as JSON ended with "#####jsonEnd" use `stringifyValues` to stringify the values
   * @returns returns the promise response from the API
   * @description Used to create a new chat with the AI. You will need to replace adjust the structure of
   * the "appData" object to match the structure expected by your API. If fails it throws a `NetworkError`
   * */
  async createNewChat(
    formDescription: string,
    formValues: string,
    formContext: string
  ): Promise<CreateNewChatResponse> {
    const language = getStoredLanguage();
    let response;
    try {
      response = await axios.post(
        process.env.REACT_APP_AI_API_URL + "/chats",
        {
          name: "sample",
          type: "formFill",
          model: {
            content: formDescription,
            appData: formValues,
            appDescription: formContext,
          },
        },
        {
          headers: {
            "Accept-Language": language || "en-US",
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
   *
   * @param chatMessage - chat message object
   * @returns the promise response from the API
   * @description Used to send a message to generated chat. If fails it throws a `NetworkError`
   */
  async sendMessage(chatMessage: ChatMessage): Promise<SendMessageResponse> {
    let response;
    try {
      response = await axios.post(
        process.env.REACT_APP_AI_API_URL + "/ai/form",
        {
          ...chatMessage,
        },
        {
          headers: {
            "Llm-Api-Key": `${getStoredApiKey()}`
          }
        }
      );
    } catch (error) {
      console.log("error", error);
      throw new NetworkError("Unable to reach the network.");
    }

    return response.data;
  }
}
