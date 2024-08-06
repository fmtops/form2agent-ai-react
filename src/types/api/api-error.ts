/**
 * @description An error describing an issue related to an API response.
 * @class APIError
 * @exports APIError
 *  */
export class APIError extends Error {
  statusCode: number | null; // null if no response was received - network error

  constructor(message: string, statusCode: number | null) {
    super(message);
    this.statusCode = statusCode;
  }
}
