import React, { createContext, ReactNode } from "react";
import { DEFAULT_SAMPLE_RATE } from "../consts/audio.consts";
import useAudioStreamPlayer from "../utils/audio-stream-player";

interface AudioContextType {
  isAudioPlaying: boolean;
  playAudioStream: (reader: ReadableStreamDefaultReader<Uint8Array>) => void;
  stopAudioStream: () => void;
}

// Create the context with a default value
const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

/**
 * @param children - ReactNode to wrap the context over
 * @returns AudioProvider component that provides audio player functionality to the application
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
  const { isAudioPlaying, playAudioStream, stopAudioStream } =
    useAudioStreamPlayer(DEFAULT_SAMPLE_RATE);

  return (
    <AudioContext.Provider
      value={{
        isAudioPlaying,
        playAudioStream,
        stopAudioStream,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

/**
 * @returns the audio context including audio player functions and audio state
 */
export const useAudio = (): AudioContextType => {
  const context = React.useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
