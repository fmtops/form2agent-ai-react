import { FormAction } from "../consts/general-fields.consts";
import { CheckinFormType } from "./checkin-model";

export const CheckInDescriptionContext = {
  action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  address: "",
};
export const CHECKIN_DESCRIPTION = `
Manage this checkin registartion form for registration of new hotel residents. 
Help the user to fill in the form. 
User can upload a picture of business card, read data from it and input all possible info into the form.
`;

export const CHECKIN_FORM_VALUES: CheckinFormType = {
  action: null,
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  address: "",
};
