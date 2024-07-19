export type ModelType = {
  appData: string;
  appDescription?: string;
  content: string;
  fileContent?: string;
};

export type ChatMessage = {
  chatId: number;
  model: ModelType;
};

export type CreateNewChatResponse = {
  id: number;
  model: ModelType;
};

export type SendMessageResponse = {
  model: ModelType;
  userMessage: UserMessage;
};

export type UserMessage = {
  chatId: string;
  content: string;
  id: string;
  isUserMessage: true;
  timestamp: string;
  role: "user";
};

export type TranscribeResponse = {
  transcription: string;
};
