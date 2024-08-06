import axios from "axios";
import {
  ChatMessage,
  CreateNewChatResponse,
} from "../types/api/AiChatServiceTypes";
import { getStoredLanguage } from "../utils/language.utils";
import { getStoredApiKey } from "../utils/api-key.utils";
import { throwIfAPIResponseNotOk } from "../helpers/api-exception-handler";

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
   * the "appData" object to match the structure expected by your API. Throws an error if fails.
   * */
  async createNewChat(
    formDescription: string,
    formValues: string,
    formContext: string
  ) {
    const language = getStoredLanguage();
    let response = await fetch(process.env.REACT_APP_AI_API_URL + "/chats/v2", {
      method: "POST",
      headers: {
        "Accept-Language": language || "en-US",
        "Content-Type": "application/json",
        "Llm-Api-Key": `${getStoredApiKey()}`,
      },
      body: JSON.stringify({
        name: "sample",
        type: "formFill",
        model: {
          content: formDescription,
          appData: formValues,
          appDescription: formContext,
        },
      }),
    });

    await throwIfAPIResponseNotOk(response);
    return response.body!.getReader();
  }
  /**
   *
   * @param chatMessage - chat message object
   * @returns the promise response from the API
   * @description Used to send a message to generated chat. If fails Throws an error if fails.
   */
  async sendMessage(chatMessage: ChatMessage) {
    let response = await fetch(
      process.env.REACT_APP_AI_API_URL + "/ai/form/v2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Llm-Api-Key": `${getStoredApiKey()}`,
        },
        body: JSON.stringify({
          ...chatMessage,
        }),
      }
    );

    await throwIfAPIResponseNotOk(response);
    return response.body!.getReader();
  }
}
