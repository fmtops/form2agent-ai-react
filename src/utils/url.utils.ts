import { UrlParam } from "../consts/url.consts";

/**
 *
 * @param params - Array of URL parameters to remove
 * @description Used to remove URL parameters from the current URL
 */
export const removeUrlSearchParams = (params: UrlParam[]) => {
  const url = new URL(window.location.href);
  params.forEach((param) => url.searchParams.delete(param));
  window.history.replaceState({}, document.title, url.pathname);
};
