import * as chatTypingAnimation from "../assets/animations/chat_typing.json";
import * as redDotAnimation from "../assets/animations/red_dot.json";
import * as voiceWavesAnimation from "../assets/animations/voice_waves.json";

const CHAT_TYPING_ANIMATION_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: chatTypingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const RED_DOT_ANIMATION_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: redDotAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const VOICE_WAVES_ANIMATION_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: voiceWavesAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export {
  CHAT_TYPING_ANIMATION_OPTIONS,
  RED_DOT_ANIMATION_OPTIONS,
  VOICE_WAVES_ANIMATION_OPTIONS,
};
