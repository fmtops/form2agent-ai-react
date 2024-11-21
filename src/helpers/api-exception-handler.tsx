import { StatusCodes } from "http-status-codes";
import { APIError } from "../lib/errors/api-error";
import { emailConfig } from "../configs/configs";
import {
  TrialExpiredBackendMessage,
  TrialExpiredError,
} from "../lib/errors/trial-expired-error";

/**
 *
 * @param statusCode - the status code from the API response or null/undefined if N/A
 * @returns the error message to be displayed in the chat window or null if the case is not covered
 * @description Based on the status code, return a message to be displayed for the user.
 */
const getErrorMessage = (statusCode: number | undefined | null) => {
  if (statusCode === undefined || statusCode === null) {
    return "I'm unable to reach the network. Please check your connection or try again later.";
  } else {
    switch (statusCode) {
      case StatusCodes.UNAUTHORIZED:
        return "I'm sorry, you're unauthorized. Please update your OpenAI API Key.";
      default:
        return null;
    }
  }
};

/**
 *
 * @param error - the error that was caught after an API call
 * @returns the error message to be displayed as a message in the chat window
 * @description Based on the error type and status code, return a message to be displayed for the user.
 */
export const handleAPIError = (error: unknown) => {
  console.log(error);
  let message = "An unknown error has occured. Please try again later.";

  if (error instanceof TrialExpiredError) {
    message = `I'm sorry, your trial has expired. You can reach out to us at ${emailConfig.SUPPORT_EMAIL} to schedule a meeting or to receive a new key.`;
  }
  if (error instanceof APIError) {
    message = getErrorMessage(error.statusCode) ?? message;
  } else if (error instanceof TypeError) {
    message = getErrorMessage(null) ?? message;
  }

  return message;
};

/**
 *
 * @param response - the response from the API
 * @description Throw an error if the response is null, has no body or is not ok.
 */
export const throwIfAPIResponseNotOk = async (response: Response | null) => {
  if (response === null || response.body === null)
    throw new APIError("Response or body is null.", null);

  if (!response.ok) {
    const responseText = await response.text();
    if (responseText.toLowerCase() === TrialExpiredBackendMessage)
      throw new TrialExpiredError();
    else throw new APIError(responseText, response.status);
  }
};
