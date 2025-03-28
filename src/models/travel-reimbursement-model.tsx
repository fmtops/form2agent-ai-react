import { FormAction } from "../consts/general-fields.consts";

export type PersonalInformation = {
  fullName: string;
  department: string;
  positionTitle: string;
  emailAddress: string;
  contactNumber: string;
  bankAccountNumber: string;
};

export type TravelDetails = {
  travelDestination: string;
  purposeOfTravel: string;
  dateOfDeparture: string;
  dateOfReturn: string;
};

export enum ExpenseCategories {
  Airfare = "Airfare",
  Accommodation = "Accommodation",
  Meals = "Meals",
  Transportation = "Transportation",
  Miscellaneous = "Miscellaneous",
}

export type ExpenseDetails = {
  id?: string;
  dateOfExpense: string;
  vendorServiceProvider: string;
  expenseAmount: string;
  currency: string;
  paymentMethod: string;
  invoiceReceiptNumber?: string;
  expenseCategory?: string;
  expenseAttachment?: AutomationFields;
}[];

export type AutomationFields = {
  receiptUploadAttachment: string | null;
  invoiceUploadAttachment: string | null;
};

export type ApprovalAndSubmission = {
  approvingManagerName: string;
  approvingManagerEmail: string;
};

export type AdditionalInformation = {
  notesComments?: string;
};

export type TravelReimbursementBaseFormType = {
  personalInformation: PersonalInformation;
  travelDetails: TravelDetails;
  expenseDetails: ExpenseDetails;
  approvalAndSubmission: ApprovalAndSubmission;
  additionalInformation?: AdditionalInformation;
};

export type TravelReimbursementFormType = {
  action: null | FormAction;
} & TravelReimbursementBaseFormType;
