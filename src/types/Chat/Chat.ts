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

/**
 * @description The requested user-facing AI assistant (and their sub-agents) by task.
 *
 * Can be used to determine various details about the request, such as the TTS voice, etc.
 */
export enum AssistantType {
  /** The default Form2Agent assistant used for form filling, Evie. */
  FormFilling,
}

export type ChatPropType = {
  formDescription: string;
  formValues: string;
  formContext?: string;
  executeFormLogic: (appData: string) => void;
  onFileUpload?: (file: string | null) => void;
};

export type ChatBottomMenuPropType = {
  disabled: boolean;
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
  onFileUpload?: (file: string | null) => void;
};
