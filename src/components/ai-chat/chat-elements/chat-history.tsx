import React, { useEffect } from "react";
import { ChatMessageSender, ChatMessageType } from "../../../types/Chat/Chat";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { StyledToolTip } from "../../common/mui-styled/styled-tooltip";
import { FileSectionComponent } from "../../common/file-section";
import Lottie from "react-lottie";
import { CHAT_TYPING_OPTIONS } from "../../../consts/chat.consts";

/**
 *
 * @param messages - array of messages
 * @param voiceResponse - boolean to check if the voice response is enabled
 * @param onMessageSoundClick - function to handle the message sound click
 * @param isTTSPlaying - boolean to check if the TTS is playing
 * @param currentReadMessage - current message being read
 * @param isWaitingForResponse - boolean to check if the response is being waited
 * @param isLoadingAudio - boolean to check if the audio is loading
 * @description ChatHistory component to render the chat history of the chat window
 * With indication if the message is being read aloud.
 */
export default function ChatHistory({
  messages,
  voiceResponse,
  onMessageSoundClick,
  isTTSPlaying,
  currentReadMessage,
  isWaitingForResponse,
  isLoadingAudio,
}: {
  messages: ChatMessageType[];
  voiceResponse: boolean;
  onMessageSoundClick: (message: string) => void;
  isTTSPlaying: boolean;
  currentReadMessage: string;
  isWaitingForResponse: boolean;
  isLoadingAudio: boolean;
}) {
  const chatEndRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      let lastMessage = messages.at(-1);
      if (lastMessage?.sender === ChatMessageSender.AI && voiceResponse) {
        handleMessageSoundClick(lastMessage.message);
      }
    }
  }, [messages]);

  const handleMessageSoundClick = (message: string) => {
    if ((isTTSPlaying && currentReadMessage !== message) || isLoadingAudio) {
      return;
    }
    onMessageSoundClick(message);
  };

  return (
    <div
      className={`block overflow-y-auto mb-4 justify-end h-full chat-history`}
    >
      <div className="flex flex-col items-center gap-y-4 mb-8 px-8 text-center">
        <img className="w-16 rounded-full" src="./icon_fm.svg" alt="" />
        <span className="font-bold">Form2agent AI</span>
        <p className={`text-sm text-text-secondary-light`}>
          Form2agent AI is your smart assistant that makes form completion fast
          and easy by enabling text, voice, and file input
        </p>
      </div>
      {messages.map((chat, index) => (
        <div
          key={index}
          className={`flex items-end mb-4 ${
            chat.sender === ChatMessageSender.You ? "flex-col" : ""
          }`}
        >
          {chat.message !== "" && (
            <div
              className={`
           px-4 py-2 rounded-lg max-w-[90%] items-end  ${
             chat.sender === ChatMessageSender.AI
               ? "bg-gray text-black ml-2 mr-1"
               : "bg-lightBlue text-white mr-2 ml-auto"
           }
        `}
            >
              <div className="flex gap-2 whitespace-pre-wrap">
                <p className="word-break">{chat.message}</p>
              </div>
            </div>
          )}
          {chat.fileName !== "" && chat.sender === ChatMessageSender.You && (
            <FileSectionComponent fileName={chat.fileName} />
          )}

          {chat.sender === ChatMessageSender.AI && (
            <div
              onClick={() => handleMessageSoundClick(chat.message)}
              className=" cursor-pointer "
            >
              {currentReadMessage === chat.message ? (
                <StyledToolTip title="Stop">
                  <StopCircleOutlinedIcon
                    htmlColor="#9CA3AF"
                    color={isLoadingAudio ? "disabled" : "inherit"}
                  />
                </StyledToolTip>
              ) : (
                <StyledToolTip title="Read aloud">
                  <VolumeUpOutlinedIcon
                    color={isTTSPlaying ? "disabled" : "inherit"}
                    htmlColor="#6B7280"
                  />
                </StyledToolTip>
              )}
            </div>
          )}
        </div>
      ))}
      {isWaitingForResponse && (
        <div
          className={`px-4 py-2 rounded-lg flex items-center max-w-[90%] h-2 bg-gray text-black ml-2`}
        >
          <div>
            <Lottie options={CHAT_TYPING_OPTIONS} height={8} width={28} />
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
