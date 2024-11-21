/**
 * @description A message that is returned by the backend when trial credentials are invalid or expired, in lowercase format.
 */
export const TrialExpiredBackendMessage = "invalid or expired proxy key";

/**
 * @description An error thrown when a request could not be finished due to trial credentials being expired.
 * @class TrialExpiredError
 * @exports TrialExpiredError
 *  */
export class TrialExpiredError extends Error {
  constructor() {
    super(TrialExpiredBackendMessage);
  }
}
