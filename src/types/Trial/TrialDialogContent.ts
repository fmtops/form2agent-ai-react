export enum TrialDialogContent {
  OptionsMenu = "options", // "choose how you'd like to experience Form2Agent" screen
  TrialKeyForm = "trial-key", // "start a free trial" screen
  OpenAIKeyForm = "api-key", // "OpenAI API key" screen
  TrialThankYou = "thank-you", // "thank you" screen after successful trial request
  TrialKeyAlreadyExists = "key-exists", // "let's talk" screen if the user already requested a trial previously
}
