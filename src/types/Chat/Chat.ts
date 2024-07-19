import {
  CreateNewChatResponse,
  ChatMessage,
  SendMessageResponse,
} from "../api/AiChatServiceTypes";
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

export type ChatPropType = {
  createNewChat: (
    formDescription: string,
    formValues: string,
    formContext: string
  ) => Promise<CreateNewChatResponse>;
  sendMessage: (
    chatMessage: ChatMessage
  ) => Promise<SendMessageResponse | undefined>;
  formDescription: string;
  formValues: string;
  formContext?: string;
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
