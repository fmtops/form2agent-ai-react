import React, { createContext, useState, ReactNode, useEffect } from "react";

interface LayoutContextType {
  isNavbarExpanded: boolean;
  setIsNavbarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isChatExpanded: boolean;
  setIsChatExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
}

/**
 * @param children - ReactNode to wrap the context over
 * @returns LayoutProvider component that provides the layout context to the application
 * @description Provides a new context with the navbar state and a function to open or close the navbar, 
 * @example
 * ```tsx
    <LayoutProvider>
        <BrowserRouter>
          <MainLayout>
            <CoreRouter />
          </MainLayout>
        </BrowserRouter>
      </LayoutProvider>
   ```
 * */
export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState<boolean>(false);
  const [isChatExpanded, setIsChatExpanded] = useState<boolean>(false);

  return (
    <LayoutContext.Provider
      value={{
        isNavbarExpanded,
        setIsNavbarExpanded,
        isChatExpanded,
        setIsChatExpanded,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

/**
 * @returns the audio context including the global audio ref and unlock audio function
 * @description Used to get a global audio ref and unlock audio play permissions on it
 */
export const useLayout = (): LayoutContextType => {
  const context = React.useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
