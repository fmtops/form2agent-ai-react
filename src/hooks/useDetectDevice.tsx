import { useEffect, useState } from "react";

/**
 * @returns returns the device detection functions
 * @description Used to detect the device of the user
 * @example
 * ```tsx
 * const { isAndroid, isIOS } = useDetectDevice();
 * console.log(isAndroid(), isIOS()); // returns true if the user is on Android or iOS
 * ```
 */
function useDetectDevice() {
  const [userAgent, setUserAgent] = useState(navigator.userAgent);

  useEffect(() => {
    const userAgentListener = () => setUserAgent(navigator.userAgent);
    window.addEventListener("resize", userAgentListener);

    return () => window.removeEventListener("resize", userAgentListener);
  }, []);

  const isAndroid = () => /android/i.test(userAgent);
  const isIOS = () => /ipad|iphone|ipod/i.test(userAgent);
  const isMobile = () =>
    /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent) ||
    ("ontouchstart" in window && navigator.maxTouchPoints > 0);

  return { isAndroid, isIOS, isMobile };
}

export default useDetectDevice;
