import { OPENAI_APIKEY_KEY } from "../consts/api-key.consts";

/**
 * @returns Stored OpenAI API Key from local storage or null if not found
 * @description Used to get the stored OpenAI API Key from local storage
 * The `OPENAI_APIKEY_KEY` is a key under which we store the api key in local storage
 */
const getStoredApiKey = () => {
  const apiKey = localStorage.getItem(OPENAI_APIKEY_KEY);
  return apiKey || "mock-api-key";
};

/**
 * @param value - OpenAI API Key to store in local storage
 * @description Used to set the OpenAI API Key in local storage under the `OPENAI_API_KEY` key
 *  */
const setStoredApiKey = (value: string) => {
  localStorage.setItem(OPENAI_APIKEY_KEY, value);
};

export { getStoredApiKey, setStoredApiKey };
