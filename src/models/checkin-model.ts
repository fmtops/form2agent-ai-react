import { FormAction } from "../consts/general-fields.consts";

export type CheckinBaseFormType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
};

export type CheckinFormType = {
  action?: null | FormAction;
} & CheckinBaseFormType;
