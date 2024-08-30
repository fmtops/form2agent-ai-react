import { ChatMessage } from "../types/api/AiChatServiceTypes";
import { getStoredLanguage } from "../utils/language.utils";
import { throwIfAPIResponseNotOk } from "../helpers/api-exception-handler";
import f2aFetch from "../utils/fetch.utils";

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
    let response = await f2aFetch("/chats/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

    return response.body!.getReader();
  }
  /**
   *
   * @param chatMessage - chat message object
   * @returns the promise response from the API
   * @description Used to send a message to generated chat. If fails Throws an error if fails.
   */
  async sendMessage(chatMessage: ChatMessage) {
    let response = await f2aFetch("/ai/form/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...chatMessage,
      }),
    });

    return response.body!.getReader();
  }
}
