import React, { createContext, useRef, useState, ReactNode } from "react";

interface AudioContextType {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  unlockAudio: () => void;
}

// Create the context with a default value
const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

/**
 * @param children - ReactNode to wrap the context over
 * @returns AudioProvider component that provides the audio context to the application
 * @description Provides a new context with a global audio ref and a function to unlock audio play
 * @example
 * ```tsx
    <AudioProvider>
        <BrowserRouter>
          <MainLayout>
            <CoreRouter />
          </MainLayout>
        </BrowserRouter>
      </AudioProvider>
   ```
 * */
export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  let audioRef = useRef(new Audio());
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // We can get permissions for the audioRef from the user by playing any audio on it.
  // When we intend to allow the user to enable autoplay via a checkbox or by holding a button,
  // we can play a brief audio file of silence to make it unnoticable.
  const unlockAudioContext = async () => {
    try {
      if (!isUnlocked) {
        // Only play when the audio ref is not currently playing anything.
        // If the user manually played some audio, we can skip this step.
        if (audioRef.current.paused) {
          audioRef.current.src = `${process.env.PUBLIC_URL}/silence.mp3`;
          await audioRef.current.play(); // start playing
          await audioRef.current.pause(); // pause immediately
        }
        setIsUnlocked(true);
      }
    } catch (e) {
      console.error("Failed to unlock audio:", e);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef: audioRef,
        unlockAudio: unlockAudioContext,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

/**
 * @returns the audio context including the global audio ref and unlock audio function
 * @description Used to get a global audio ref and unlock audio play permissions on it
 */
export const useAudio = (): AudioContextType => {
  const context = React.useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
