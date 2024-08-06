import React from "react";
import { handleAPIError } from "../helpers/api-exception-handler";
import {
  ChatMessageSender,
  ChatMessageType,
  ResponseState,
} from "../types/Chat/Chat";

/**
 * @description Service to read values from streamed models and execute actions on the increments.
 * @class StreamingService
 * @exports StreamingService
 *  */
export class StreamingService {
  private readonly _decoder = new TextDecoder("utf-8");
  private readonly _setChatHistory: React.Dispatch<
    React.SetStateAction<ChatMessageType[]>
  >;
  private readonly _setResponseState: React.Dispatch<
    React.SetStateAction<ResponseState>
  >;

  constructor(
    setChatHistory: React.Dispatch<React.SetStateAction<ChatMessageType[]>>,
    setResponseState: React.Dispatch<React.SetStateAction<ResponseState>>
  ) {
    this._setChatHistory = setChatHistory;
    this._setResponseState = setResponseState;
  }

  /**
   *
   * @param jsonResponses - responses read from the stream in the latest iteration, split into an array
   * @param json - the JSON response that is currently being processed and needs to be parsed
   * @returns an object of type "any" based on the JSON structure
   * @description Parse a json string into an object of type "any".
   */
  parseResponseModel(jsonResponses: string[], json: string): any {
    // Since split won't generate a correct JSON string, fix them manually
    if (jsonResponses.length > 1) {
      if (!json.startsWith("{")) {
        json = "{" + json;
      }
      if (!json.endsWith("}")) {
        json = json + "}";
      }
    }

    // Parse the correct JSON string into a model
    return JSON.parse(json);
  }

  /**
   *
   * @param responseModel - the response parsed into a model of any type
   * @param content - full content of the assistant response message received so far
   * @param currChatHistory - chat history excluding the latest assistant response message
   * @returns the incremented content of the assistant response message
   * @description Execute logic for content (display the message in the UI).
   */
  handleAndReturnNewContent(
    responseModel: any,
    content: string,
    currChatHistory: ChatMessageType[]
  ) {
    var contentIncr = responseModel.C;

    // Update to Generating after a first valid increment
    if (!content && contentIncr) {
      this._setResponseState(ResponseState.Generating);
    }

    if (contentIncr) content += contentIncr;
    if (content) {
      this._setChatHistory([
        ...currChatHistory, // this needs to exclude the current response
        {
          sender: ChatMessageSender.AI,
          message: content.trimStart(), // the full content of the response
        },
      ]);
    }
    return content;
  }

  /**
   *
   * @param reader - the reader from the fetch response
   * @param chatHistory - the current chat history
   * @param responseHandlers - functions to execute for each of the response increments
   * @description Read the streamed responses, decode and parse them into a model,
   *  execute logic from handlers (e.g. update chat id or execute form logic)
   *  and update the chat window history with the new content.
   */
  async handleReadAndExecute(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    chatHistory: ChatMessageType[],
    responseHandlers: ((responseModel: any) => void)[]
  ) {
    let content = ""; // total content for the message received so far
    let currChatHistory = [...chatHistory]; // history without the latest response

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      var fullJsonResponse = this._decoder.decode(value);

      // Multiple responses might have been queued up if the frontend cannot keep up with the stream
      // We are dealing with a formatted stream (the actual streams of data are within a consistent JSON structure)
      // Because of this, we need to handle all of the objects containing streamed data correctly

      // Split the responses (find the intersections between all of the JSON objects)
      var jsonResponses = fullJsonResponse.split("}{");

      // For each response, parse the JSON and execute related logic
      jsonResponses.forEach((json) => {
        // Parse the correct JSON string into a model
        var responseModel = this.parseResponseModel(jsonResponses, json);

        // Execute each of the response handlers
        responseHandlers.forEach((handler) => handler(responseModel));

        // Execute logic for Content (display the message in the UI)
        content = this.handleAndReturnNewContent(
          responseModel,
          content,
          currChatHistory
        );
      });
    }
  }

  /**
   *
   * @param e - the error/exception
   * @description Used to add a tailored error message to the chat history window
   */
  handleReadAndExecuteException(e: unknown) {
    // Append a new message based on the error
    // Do not remove the latest message if parts of it were successfully generated
    this._setChatHistory((chat) => [
      ...chat,
      {
        sender: ChatMessageSender.AI,
        message: handleAPIError(e),
      },
    ]);
  }
}
