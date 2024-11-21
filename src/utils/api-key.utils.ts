import {
  OPENAI_APIKEY_KEY,
  PROXY_APIKEY_EXPIRATION,
  PROXY_APIKEY_KEY,
} from "../consts/api-key.consts";

/**
 * @param key - Key to get from local storage
 * @returns Item stored in local storage under the key or null if whitespace or not found
 * @description Used to get an item from local storage by key
 *  */
const getLocalItem = (key: string) => {
  const value = localStorage.getItem(key);

  // if the saved value is all whitespace, return null, else return value (string | null)
  return value?.trim() === "" ? null : value;
};

/**
 * @returns Stored OpenAI API Key from local storage or null if not found
 * @description Used to get the stored OpenAI API Key from local storage
 * The `OPENAI_APIKEY_KEY` is a key under which we store the api key in local storage
 */
const getStoredApiKey = () => {
  return getLocalItem(OPENAI_APIKEY_KEY) as string | null;
};

/**
 * @param value - OpenAI API Key to store in local storage
 * @description Used to set the OpenAI API Key in local storage under the `OPENAI_API_KEY` key
 *  */
const setStoredApiKey = (value: string) => {
  localStorage.setItem(OPENAI_APIKEY_KEY, value);
};

/**
 * @returns Stored FM Proxy API Key from local storage or null if not found
 * @description Used to get the stored FM Proxy API Key from local storage
 * The `PROXY_APIKEY_KEY` is a key under which we store the proxy api key in local storage
 */
const getStoredProxyKey = () => {
  return getLocalItem(PROXY_APIKEY_KEY) as string | null;
};

/**
 * @returns Stored FM Proxy API Key expiration date from local storage or null if not found
 * @description Used to get the stored FM Proxy API Key expiration date from local storage
 * The `PROXY_APIKEY_EXPIRATION` is a key under which we store the proxy api key expiration in local storage
 */
const getStoredProxyKeyExpiration = () => {
  return getLocalItem(PROXY_APIKEY_EXPIRATION) as string | null;
};

/**
 * @param value - FM Proxy API Key to store in local storage
 * @param expirationDate - Expiration date of the FM Proxy API Key
 * @description Used to set the FM Proxy API Key in local storage under the `PROXY_APIKEY_KEY` key
 *  */
const setStoredProxyKeyDetails = (value: string, expirationDate: string) => {
  localStorage.setItem(PROXY_APIKEY_KEY, value);
  localStorage.setItem(PROXY_APIKEY_EXPIRATION, expirationDate);
};

export {
  getStoredApiKey,
  setStoredApiKey,
  getStoredProxyKey,
  getStoredProxyKeyExpiration,
  setStoredProxyKeyDetails,
};
