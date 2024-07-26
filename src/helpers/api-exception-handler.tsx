import { AxiosError } from "axios";

const handleAxiosError = (error: AxiosError) => {
  console.log(error.response);
  if (error.response) {
    switch (error.response.status) {
      case 401: // Unauthorized
        return "I'm sorry, you're unauthorized. Please update your OpenAI API Key.";
      default:
        return null;
    }
  } else {
    return "I'm unable to reach the network. Please check your connection or try again later.";
  }
};

export const handleAPIError = (error: unknown) => {
  console.log(error);
  let message = "An unknown error has occured. Please try again later.";

  if (error instanceof AxiosError) {
    message = handleAxiosError(error) ?? message;
  }

  return message;
};
