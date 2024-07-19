import { LANGUAGES_VALUES, LANGUAGE_KEY } from "../consts/language.consts";

/**
 * @returns returns the stored language value from local storage
 * @description Used to get the stored language value from local storage
 * The `LANGUAGE_KEY` is a key under we store the language value in local storage
 */
const getStoredLanguage = () => {
  return localStorage.getItem(LANGUAGE_KEY) as LANGUAGES_VALUES | null;
};

/**
 * @param value - language value to store in local storage
 * @description Used to set the language value in local storage under the `LANGUAGE_KEY` key
 */
const setStoredLanguage = (value: string) => {
  localStorage.setItem(LANGUAGE_KEY, value);
};

/**
 * @param langRegion - language region value in format `Language-Region`
 * @returns returns the language value without region
 * @description Used to remove the region from the language value
 */
function removeRegion(langRegion: string) {
  const indexOfDash = langRegion.indexOf("-");

  if (indexOfDash === -1) {
    return langRegion;
  }

  return langRegion.substring(0, indexOfDash);
}

export { getStoredLanguage, setStoredLanguage, removeRegion };
