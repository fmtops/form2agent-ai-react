import {
  MAX_INPUT_LENGTH_MEDIUM,
  MAX_INPUT_LENGTH_SHORT,
} from "../consts/input.consts";

export const validateFirstName = (name: string) => {
  if (name.length <= 0) {
    return "Name is required";
  } else if (name.length >= MAX_INPUT_LENGTH_SHORT) {
    return "Name is too long";
  } else {
    return "";
  }
};

export const validateEmail = (email: string) => {
  if (email.length <= 0) {
    return "Email is required";
  } else if (email.length >= MAX_INPUT_LENGTH_MEDIUM) {
    return "Email is too long";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Invalid Email format";
  } else {
    return "";
  }
};

export const validateIsMessagingCheckbox = (isMessagingChecked: boolean) => {
  if (!isMessagingChecked) {
    return "You must agree to receive emails.";
  } else {
    return "";
  }
};
