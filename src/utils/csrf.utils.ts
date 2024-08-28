import { throwIfAPIResponseNotOk } from "../helpers/api-exception-handler";
import { APIError } from "../types/api/api-error";

// Global in-memory CSRF token variable
let csrfToken: string | null = null;

/**
 * @returns a string value for the X-CSRF-Token
 * @description fetch a token from the F2A API
 * @throws {APIError} if the request fails or the response indicates failure
 *  */
async function fetchCsrfToken(): Promise<string> {
  const response = await fetch(
    process.env.REACT_APP_AI_API_URL + "/security/csrf-token",
    {
      method: "GET",
      credentials: "include", // get and set the antiforgery cookie
    }
  );
  await throwIfAPIResponseNotOk(response);
  return await response.json(); // the csrf token
}

/**
 * @returns a request header with the X-CSRF-TOKEN or an empty object if no token was returned
 * @description fetch an X-CSRF-Token from the memory or the API to create a header
 * @throws {APIError} if the request fails or the response indicates failure
 *  */
export default async function getCsrfTokenHeader() {
  csrfToken = csrfToken ? csrfToken : await fetchCsrfToken();
  const csrfTokenHeader:
    | {}
    | {
        "X-CSRF-TOKEN": string;
      } = csrfToken ? { "X-CSRF-TOKEN": csrfToken } : {};
  return csrfTokenHeader;
}
