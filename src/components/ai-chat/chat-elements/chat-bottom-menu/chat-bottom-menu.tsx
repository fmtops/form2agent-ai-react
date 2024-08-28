import { ChangeEvent, useState, KeyboardEvent, useRef, useEffect } from "react";
import { FormControlLabel, FormGroup, TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import { fetchFileContent } from "../../../../helpers/fetch-file-content";
import {
  CHAT_CHAR_LIMIT,
  CHAT_MAX_ROWS_INPUT,
} from "../../../../consts/chat.consts";
import { AudioState } from "../../../../types/Chat/Audio";
import { FileSectionComponent } from "../../../common/file-section";
import { SupportedFileExtensions } from "../../../../consts/files";
import ChatMicrophoneIcon from "./chat-microphone-icon";
import ChatSendIcon from "./chat-send-icon";
import ChatUploadIcon from "./chat-upload-icon";
import ChatStatusInfo from "./chat-status-info";
import { ChatBottomMenuPropType } from "../../../../types/Chat/Chat";

export default function ChatBottomMenu({
  disabled,
  disabledVoice,
  setVoiceResponse,
  voiceResponse,
  isListening,
  message,
  setMessage,
  handleSubmit,
  startListening,
  stopListening,
  audioState,
  setFileContent,
  fileName,
  setFileName,
  audioStateProgress,
}: ChatBottomMenuPropType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [wasMicrophoneClicked, setWasMicrophoneClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileReadProgress, setFileReadProgress] = useState<number>(0);
  const [disableMicrophone, setDisableMicrophone] = useState(false);

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.shiftKey && e.key === "Enter") {
      setFileName("");
      handleSubmit();
    }
  };

  const handleFileUpload = () => {
    setErrorMessage("");
    fileInputRef?.current?.click();
  };

  useEffect(() => {
    if (disabled === false) {
      inputRef?.current?.focus();
    }
  }, [disabled]);

  const toggleListening = async () => {
    setErrorMessage("");
    if (
      disabled ||
      (disableMicrophone && audioState === AudioState.Calibration)
    )
      return;
    if (!isListening) setDisableMicrophone(() => true);

    if (!wasMicrophoneClicked) {
      setVoiceResponse(true);
      setWasMicrophoneClicked(true);
    }

    isListening || disabledVoice
      ? await stopListening()
      : await startListening();
  };

  useEffect(() => {
    if (audioState === AudioState.NoState) setDisableMicrophone(() => false);
  }, [audioState]);

  const onFileChange = (
    event: ChangeEvent<HTMLInputElement> & { target: { files: FileList } }
  ) => {
    if (event?.target?.files?.length === 0) return;
    const file: File = event.target.files[0];
    if (
      !Object.values(SupportedFileExtensions).some((extension) =>
        file.name.toLowerCase().endsWith(extension)
      )
    ) {
      setErrorMessage("Unsupported File Format");
      return;
    }
    setFileName(file.name);
    fetchFileContent(file, (progress) => setFileReadProgress(progress)).then(
      (result) => {
        setFileContent(result.content.toString());
      }
    );
    event.target.value = "";
  };

  const isSpeechStatusVisible =
    isListening || audioState !== AudioState.NoState;

  const handleClearFile = () => {
    setFileName("");
    setFileContent("");
  };

  const showProgressBar =
    audioState === AudioState.ReadyToSend ||
    audioState === AudioState.Calibration;

  const disableSend = disabled || (!message.trim() && !fileName);

  const handleSend = () => {
    if (disableSend) return;
    handleSubmit();
    handleClearFile();
  };

  return (
    <div
      className={`flex flex-col mt-auto mb-4 lg:mb-0 p-4 border-t-2 border-t-border-primary-light`}
    >
      {fileName !== "" && (
        <FileSectionComponent
          fileName={fileName}
          onClearFile={handleClearFile}
          progress={fileReadProgress}
        />
      )}
      <TextField
        id="chat-text-field"
        inputRef={inputRef}
        value={message}
        disabled={disabled}
        onChange={handleMessageChange}
        onKeyPress={handleKeyPress}
        className={`borderless-input py-2 px-3 rounded-lg border-0 flex-grow flex gap-4 bg-white text-black border-black`}
        placeholder="Type your message"
        variant="standard"
        multiline
        maxRows={CHAT_MAX_ROWS_INPUT}
        inputProps={{ maxLength: CHAT_CHAR_LIMIT }}
      />
      <ChatStatusInfo
        isSpeechStatusVisible={isSpeechStatusVisible}
        errorMessage={errorMessage}
        isListening={isListening}
        audioState={audioState}
        message={message}
        showProgressBar={showProgressBar}
        audioStateProgress={audioStateProgress}
      />
      <div className={`flex items-center justify-between pt-2`}>
        <FormGroup>
          <FormControlLabel
            id="chat-voice-response-label"
            className="checkbox-label"
            control={
              <Checkbox
                id="chat-voice-response-checkbox"
                checked={voiceResponse}
                onChange={() => setVoiceResponse(!voiceResponse)}
              />
            }
            label="Voice Response"
          />
        </FormGroup>
        <div className="flex gap-2">
          <ChatUploadIcon
            handleFileUpload={handleFileUpload}
            fileInputRef={fileInputRef}
            onFileChange={onFileChange}
          />
          <ChatMicrophoneIcon
            isListening={isListening}
            toggleListening={toggleListening}
            disabledVoice={disabledVoice || disableMicrophone}
          />
          <ChatSendIcon handleSend={handleSend} disableSend={disableSend} />
        </div>
      </div>
    </div>
  );
}
