import { useState, useEffect } from "react";
import { LAPTOP_WIDTH, TABLET_WIDTH } from "../consts/resolutions.consts";

/**
 * @returns returns the resolution check values
 * @description Used to check the resolution of the screen
 */
const useResolutionCheck = () => {
  const [isResHigherThanMobile, setIsResHigherThanMobile] = useState(
    window.innerWidth >= TABLET_WIDTH
  );
  const [isLaptopResolution, setIsLaptopResolution] = useState(
    window.innerWidth >= LAPTOP_WIDTH
  );

  useEffect(() => {
    const handleResize = () => {
      setIsResHigherThanMobile(window.innerWidth >= TABLET_WIDTH);
      setIsLaptopResolution(window.innerWidth >= LAPTOP_WIDTH);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isResHigherThanMobile, isLaptopResolution };
};

export default useResolutionCheck;
