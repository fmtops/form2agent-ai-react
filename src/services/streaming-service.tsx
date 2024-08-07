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
    let responseBuffer = ""; // buffer for the JSON responses to avoid splitting issues

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const fullJsonResponse = this._decoder.decode(value);
      responseBuffer += fullJsonResponse;

      // Multiple responses might have been queued up if the frontend cannot keep up with the stream
      // We are dealing with a formatted stream (the actual streams of data are within a consistent JSON structure)
      // Because of this, we need to handle all of the objects containing streamed data correctly

      // Split the responses (find the intersections between all of the JSON objects)
      // Use positive lookbehind and lookahead to keep the opening & closing curly braces in their respective JSON results
      const jsonResponses = responseBuffer.split(/(?<=\})(?=\{)/);

      // For each response, parse the JSON and execute related logic
      try {
        jsonResponses.forEach((json) => {
          // Parse the correct JSON string into a model
          const responseModel = JSON.parse(json);

          // Execute each of the response handlers
          responseHandlers.forEach((handler) => handler(responseModel));

          // Execute logic for Content (display the message in the UI)
          content = this.handleAndReturnNewContent(
            responseModel,
            content,
            currChatHistory
          );

          // Update the buffer to exclude the handled response
          responseBuffer = responseBuffer.substring(json.length);
        });
      } catch {} // resolve in the next iteration, true error handling after the while loop
    }

    // As long as the API always returns valid JSON, the responseBuffer will be clear here,
    // If the buffer is not empty, this means not all of the response was able to be handled, throw an error
    if (responseBuffer.trim() !== "") {
      throw new Error("Failed to fully process the response");
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
