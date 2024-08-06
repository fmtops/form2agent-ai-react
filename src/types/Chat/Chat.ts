import { AudioState } from "./Audio";

export type ChatMessageType = {
  sender: ChatMessageSender;
  message: string;
  fileName?: string;
};

export enum ChatMessageSender {
  You = "You",
  AI = "AI",
}

export enum ResponseState {
  Waiting, // no characters have been generated yet
  Generating, // the response is currently being parsed to the chat
  Completed, // not awaiting any responses
}

export type ChatPropType = {
  formDescription: string;
  formValues: string;
  formContext?: string;
  executeFormLogic: (appData: string) => void;
  setIsChatOpen?: (isChatOpen: boolean) => void;
};

export type ChatBottomMenuPropType = {
  disabled: boolean;
  disabledVoice: boolean;
  setVoiceResponse: (value: boolean) => void;
  voiceResponse: boolean;
  isListening: boolean;
  message: string;
  setMessage: (value: string) => void;
  handleSubmit: () => void;
  startListening: () => void;
  stopListening: () => void;
  audioState: AudioState;
  setFileContent: (value: string) => void;
  fileName: string;
  setFileName: (value: string) => void;
  audioStateProgress: number;
};
