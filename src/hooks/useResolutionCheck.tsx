import { useState, useEffect } from "react";
import {
  LAPTOP_WIDTH,
  TABLET_WIDTH,
  HIDE_CONTENT_BP,
} from "../consts/resolutions.consts";

/**
 * @returns returns the resolution check values
 * @description Used to check the resolution of the screen
 */
const useResolutionCheck = () => {
  const [shouldShowContent, setShouldShowContent] = useState(
    window.innerWidth >= HIDE_CONTENT_BP
  );
  const [isResHigherThanTablet, setIsResHigherThanTablet] = useState(
    window.innerWidth >= TABLET_WIDTH
  );
  const [isLaptopResolution, setIsLaptopResolution] = useState(
    window.innerWidth >= LAPTOP_WIDTH
  );

  useEffect(() => {
    const handleResize = () => {
      setShouldShowContent(window.innerWidth >= HIDE_CONTENT_BP);
      setIsResHigherThanTablet(window.innerWidth >= TABLET_WIDTH);
      setIsLaptopResolution(window.innerWidth >= LAPTOP_WIDTH);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    shouldShowContent,
    isResHigherThanTablet,
    isLaptopResolution,
  };
};

export default useResolutionCheck;
