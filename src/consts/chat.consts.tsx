import * as chatTypingAnimation from "../assets/animations/chat_typing.json";

export const CHAT_WIDTH = 387;
export const CHAT_CHAR_LIMIT = 3000;
export const CHAT_MAX_ROWS_INPUT = 12;

export const CHAT_TYPING_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: chatTypingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const HOLD_TIME_MS = 1000;
export const FIRST_TOOLTIP_APPEAR_MS = 3000;
export const CHAT_NUMBER_FORMAT = "format(+1-222-222-2222)";

export enum FileFieldStatus {
  Existing = "existing",
  New = "new",
  None = "",
}
