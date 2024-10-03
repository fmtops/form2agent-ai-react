import { useEffect, useState } from "react";
import ChatHistory from "./chat-elements/chat-history";
import {
  ChatMessageSender,
  ChatMessageType,
  ChatPropType,
  ResponseState,
} from "../../types/Chat/Chat";
import ChatNavbar from "./chat-elements/chat-top-menu";
import ChatBottomMenu from "./chat-elements/chat-bottom-menu/chat-bottom-menu";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import ChatIcon from "./chat-elements/chat-icon";
import useResolutionCheck from "../../hooks/useResolutionCheck";
import ChatOverlay from "./chat-elements/chat-overlay";
import { CHAT_WIDTH } from "../../consts/chat.consts";
import StyledChatDrawer from "../common/mui-styled/styled-chat-drawer";
import ApiKeyConfirmDialog from "../common/api-key-confirm-dialog";
import { getStoredApiKey } from "../../utils/api-key.utils";
import { SHOULD_SHOW_API_KEY_DIALOG } from "../../consts/api-key.consts";
import { AiChatService } from "../../services/ai-chat-service";
import { StreamingService } from "../../services/streaming-service";
import { useAudio } from "../../contexts/AudioContext";
import { useLayout } from "../../contexts/LayoutContext";

/**
 * ChatWindow component
 * @param formDescription - description of the form in Natural Language
 * @param formValues - values of the form stringified with Stringified value with a delimiter at the end use `stringifyValues` to stringify the values
 * @param formContext - context of the form stringified with Stringified value with a delimiter at the end use `stringifyValues` to stringify the values
 * @param sendMessage - function to send message
 * @returns ChatWindow component
 * @description ChatWindow component to render the chat window
 * @example
 * ```tsx
    <ChatWindow
      createNewChat={aiChatService.createNewChat}
      sendMessage={sendMessage}
      formDescription="Add a new invoice to the system."
      formValues={stringifyValues(form)}
      formContext={stringifyValues(DescriptionContext)}
    />
   ```
 * */
const ChatWindow: React.FC<ChatPropType> = ({
  formDescription,
  formValues,
  formContext,
  executeFormLogic,
}) => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const { isNavbarExpanded, isChatExpanded, setIsChatExpanded } = useLayout();
  const [chatId, setChatId] = useState<number | null>(null);
  const [disableChat, setDisableChat] = useState<boolean>(false);
  const [voiceResponse, setVoiceResponse] = useState(false);
  const [currentReadMessage, setCurrentReadMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [fileContent, setFileContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [responseState, setResponseState] = useState(ResponseState.Completed);
  const [isChatBeingCreated, setIsChatBeingCreated] = useState(false);
  const [message, setMessage] = useState("");
  const [isApiKeyDialogVisible, setIsApiKeyDialogVisible] = useState(false);

  const aiChatService = new AiChatService();
  const streamingService = new StreamingService(
    setChatHistory,
    setResponseState
  );

  // Execute logic on ChatId (store the chat id)
  const handleNewChatId = (responseModel: any) => {
    var newChatId = responseModel.ID;
    if (newChatId) {
      setChatId(newChatId);
    }
  };

  // Execute logic on AppData (e.g. the form and actions)
  const handleNewAppData = (responseModel: any) => {
    var appData = responseModel.AD;
    if (appData) {
      executeFormLogic(appData);
    }
  };

  const sendPrompt = async (message: string) => {
    if (!chatId) return;
    setResponseState(ResponseState.Waiting);

    // Include the latest message and update the state, then use it with StreamingService
    let newChatHistory = [
      ...chatHistory,
      { sender: ChatMessageSender.You, message, fileName },
    ];

    setChatHistory(newChatHistory);
    setDisableChat(true);

    try {
      let reader = await aiChatService.sendMessage({
        chatId,
        model: {
          content: message,
          appData: formValues,
          appDescription: formContext,
          fileContent: fileContent,
        },
      });

      setFileContent("");
      setFileName("");

      await streamingService.handleReadAndExecute(reader, newChatHistory, [
        handleNewAppData,
      ]);
    } catch (e) {
      streamingService.handleReadAndExecuteException(e);
    }

    // Unlock the UI
    setResponseState(ResponseState.Completed);
    setDisableChat(false);
  };

  const handleNewChat = async () => {
    if (chatId || isChatBeingCreated) return;
    setIsChatBeingCreated(true);

    setResponseState(ResponseState.Waiting);
    setDisableChat(true);

    try {
      const reader = await aiChatService.createNewChat(
        formDescription,
        formValues,
        formContext || ""
      );
      await streamingService.handleReadAndExecute(reader, chatHistory, [
        handleNewChatId,
      ]);
    } catch (e) {
      streamingService.handleReadAndExecuteException(e);
    }

    // Unlock the UI
    setResponseState(ResponseState.Completed);
    setDisableChat(false);
    setIsChatBeingCreated(false);
  };

  const handleOpenChat = async () => {
    if (!getStoredApiKey()) {
      setIsApiKeyDialogVisible(true);
      return;
    }
    setIsChatExpanded(true);
    handleNewChat();
  };

  const { unlockAudio } = useAudio();

  const setVoiceAndGetPermissions = async (voiceResponse: boolean) => {
    if (voiceResponse) await unlockAudio();
    setVoiceResponse(voiceResponse);
  };

  const handleHoldInteraction = async () => {
    if (!getStoredApiKey()) {
      setIsApiKeyDialogVisible(true);
      return;
    }

    setVoiceAndGetPermissions(true);
    if (chatId) {
      isListening ? stopListening() : startListening();
      return;
    }

    handleNewChat();
    startListening();
  };

  const handleReadFinish = () => {
    setCurrentReadMessage("");
  };

  const { isTTSPlaying, getAndPlayTTS, stopTTS, isLoadingAudio } =
    useSpeechSynthesis(handleReadFinish);

  const handleMessageRead = (message: string) => {
    if (isTTSPlaying) {
      setCurrentReadMessage("");
      stopTTS();
    } else {
      setCurrentReadMessage(message);
      getAndPlayTTS(message);
    }
  };

  const handleSubmit = () => {
    if (!message.trim() && !fileName) return;

    let messageToSend = message;
    setMessage("");
    sendPrompt(messageToSend);
  };

  const { startListening, stopListening, audioState, audioStateProgress } =
    useSpeechRecognition(
      disableChat || !chatId,
      isListening,
      setIsListening,
      message,
      setMessage,
      chatHistory,
      handleSubmit
    );

  const handleConfirmApiKey = () => {
    if (getStoredApiKey()) {
      setIsApiKeyDialogVisible(false);
      handleOpenChat();
    }
  };

  const { isResHigherThanTablet } = useResolutionCheck();
  const renderApiKeyModal = SHOULD_SHOW_API_KEY_DIALOG && isApiKeyDialogVisible;

  return (
    <>
      <ChatIcon
        onClick={handleOpenChat}
        isListening={isListening}
        audioState={audioState}
        audioStateProgress={audioStateProgress}
        handleHoldInteraction={handleHoldInteraction}
        isChatBeingCreated={isChatBeingCreated}
      />
      <ChatOverlay />
      <StyledChatDrawer
        isNavbarExpanded={isNavbarExpanded}
        variant={isResHigherThanTablet ? "persistent" : "temporary"}
        hideBackdrop
        anchor={isResHigherThanTablet ? "right" : "bottom"}
        open={isChatExpanded}
        onClose={() => setIsChatExpanded(false)}
        onOpen={() => setIsChatExpanded(true)}
        swipeAreaWidth={CHAT_WIDTH / 2}
        disableSwipeToOpen
      >
        <ChatNavbar onClose={() => setIsChatExpanded(false)} />
        <ChatHistory
          messages={chatHistory}
          voiceResponse={voiceResponse}
          onMessageSoundClick={handleMessageRead}
          isTTSPlaying={isTTSPlaying}
          currentReadMessage={currentReadMessage}
          responseState={responseState}
          isLoadingAudio={isLoadingAudio}
        />
        <ChatBottomMenu
          disabled={disableChat || !chatId}
          disabledVoice={isTTSPlaying}
          setVoiceResponse={setVoiceAndGetPermissions}
          voiceResponse={voiceResponse}
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
          startListening={startListening}
          stopListening={stopListening}
          isListening={isListening}
          audioState={audioState}
          setFileContent={setFileContent}
          fileName={fileName}
          setFileName={setFileName}
          audioStateProgress={audioStateProgress}
        />
      </StyledChatDrawer>
      {renderApiKeyModal && (
        <ApiKeyConfirmDialog
          open={isApiKeyDialogVisible}
          onClose={() => setIsApiKeyDialogVisible(false)}
          id="api-key-dialog"
          onConfirm={handleConfirmApiKey}
        />
      )}
    </>
  );
};

export default ChatWindow;
