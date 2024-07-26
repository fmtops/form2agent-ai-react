import { useEffect, useState } from "react";
import ChatHistory from "./chat-elements/chat-history";
import {
  ChatMessageSender,
  ChatMessageType,
  ChatPropType,
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
import { handleAPIError } from "../../helpers/api-exception-handler";

/**
 * ChatWindow component
 * @param formDescription - description of the form in Natural Language
 * @param formValues - values of the form stringified with Stringified value with a delimiter at the end use `stringifyValues` to stringify the values
 * @param formContext - context of the form stringified with Stringified value with a delimiter at the end use `stringifyValues` to stringify the values
 * @param sendMessage - function to send message
 * @param createNewChat - function to create a new chat from `AiChatService`
 * @param setIsChatOpen - function to set the chat open state
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
      setIsChatOpen={setIsChatOpen}
    />
   ```
 * */
const ChatWindow: React.FC<ChatPropType> = ({
  formDescription,
  formValues,
  formContext,
  sendMessage,
  createNewChat,
  setIsChatOpen,
}) => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [chatId, setChatId] = useState<number | null>(null);
  const [disableChat, setDisableChat] = useState<boolean>(false);
  const [voiceResponse, setVoiceResponse] = useState(false);
  const [currentReadMessage, setCurrentReadMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [fileContent, setFileContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [isChatBeingCreated, setIsChatBeingCreated] = useState(false);
  const [message, setMessage] = useState("");
  const [isApiKeyDialogVisible, setIsApiKeyDialogVisible] = useState(false);

  useEffect(() => {
    if (setIsChatOpen) {
      setIsChatOpen(isExpanded);
    }
  }, [isExpanded]);

  const sendPrompt = async (message: string) => {
    if (!chatId) return;
    setIsWaitingForResponse(true);

    setChatHistory((prevChat) => [
      ...prevChat,
      { sender: ChatMessageSender.You, message, fileName },
    ]);

    setDisableChat(true);

    let aiMessage: string | undefined;
    try {
      const response = await sendMessage({
        chatId,
        model: {
          content: message,
          appData: formValues,
          appDescription: formContext,
          fileContent: fileContent,
        },
      });
      aiMessage = response?.model.content;
    } catch (e) {
      aiMessage = handleAPIError(e);
    }

    setFileContent("");
    setFileName("");
    setIsWaitingForResponse(false);

    setChatHistory((chat) => [
      ...chat,
      {
        sender: ChatMessageSender.AI,
        message:
          aiMessage !== undefined
            ? aiMessage
            : "An unknown error has occured. Please try again later.",
      },
    ]);

    setDisableChat(false);
  };

  const handleOpenChat = async () => {
    if (!getStoredApiKey()) {
      setIsApiKeyDialogVisible(true);
      return;
    }
    setIsExpanded(true);

    if (chatId || isChatBeingCreated) return;
    setIsChatBeingCreated(true);

    setIsWaitingForResponse(true);
    setDisableChat(true);

    let aiMessage: string;
    try {
      const response = await createNewChat(
        formDescription,
        formValues,
        formContext || ""
      );
      setChatId(response.id);
      aiMessage = response.model.content;
    } catch (e) {
      aiMessage = handleAPIError(e);
    } finally {
      setIsWaitingForResponse(false);
      setChatHistory((chat) => [
        ...chat,
        { sender: ChatMessageSender.AI, message: aiMessage },
      ]);
      setDisableChat(false);
      setIsChatBeingCreated(false);
    }
  };

  const handleHoldInteraction = async (withVoice: boolean) => {
    if (withVoice) setVoiceResponse(true);
    if (chatId) {
      isListening ? stopListening() : startListening();
      return;
    }

    setIsChatBeingCreated(true);
    setIsWaitingForResponse(true);
    setDisableChat(true);
    const response = await createNewChat(
      formDescription,
      formValues,
      formContext || ""
    );

    setChatId(response.id);
    setIsWaitingForResponse(false);
    setChatHistory((chat) => [
      ...chat,
      { sender: ChatMessageSender.AI, message: response.model.content },
    ]);
    setDisableChat(false);
    setIsChatBeingCreated(false);
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

  const { isResHigherThanMobile } = useResolutionCheck();
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
        isExpanded={isExpanded}
      />
      <ChatOverlay isExpanded={isExpanded} />
      <StyledChatDrawer
        variant={isResHigherThanMobile ? "persistent" : "temporary"}
        hideBackdrop
        anchor={isResHigherThanMobile ? "right" : "bottom"}
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
        onOpen={() => setIsExpanded(true)}
        swipeAreaWidth={CHAT_WIDTH / 2}
        disableSwipeToOpen
      >
        <ChatNavbar onClose={() => setIsExpanded(false)} />
        <ChatHistory
          messages={chatHistory}
          voiceResponse={voiceResponse}
          onMessageSoundClick={handleMessageRead}
          isTTSPlaying={isTTSPlaying}
          currentReadMessage={currentReadMessage}
          isWaitingForResponse={isWaitingForResponse}
          isLoadingAudio={isLoadingAudio}
        />
        <ChatBottomMenu
          disabled={disableChat || !chatId}
          disabledVoice={isTTSPlaying}
          setVoiceResponse={setVoiceResponse}
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
