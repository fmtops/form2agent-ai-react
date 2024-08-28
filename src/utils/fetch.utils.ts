import { throwIfAPIResponseNotOk } from "../helpers/api-exception-handler";
import { getStoredLanguage } from "../utils/language.utils";
import { getStoredApiKey } from "./api-key.utils";
import getCsrfTokenHeader from "./csrf.utils";

/**
 * @param path - the path to the endpoint excluding the base url, starting with a slash (/)
 * @param additionalOptions - more options for the request
 * @returns the request response
 * @description make a request to the F2A API (including credentials, language, LLM API key, and X-CSRF-Token)
 * @throws {APIError} if the request fails or the response indicates failure
 *  */
export default async function f2aFetch(
  path: string,
  additionalOptions: RequestInit = {}
) {
  const csrfTokenHeader = await getCsrfTokenHeader();
  const language = getStoredLanguage();

  const options: RequestInit = {
    credentials: "include", // include the antiforgery cookie
    ...additionalOptions,
    headers: {
      ...csrfTokenHeader, // the f2a csrf header
      "Llm-Api-Key": `${getStoredApiKey()}`,
      "Accept-Language": language || "en-US",
      ...additionalOptions.headers,
    },
  };

  const url = `${process.env.REACT_APP_AI_API_URL}${path}`;
  let fetchResponse = await fetch(url, options);
  await throwIfAPIResponseNotOk(fetchResponse);

  return fetchResponse;
}
