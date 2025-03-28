import {
  ExpenseCategories,
  TravelReimbursementFormType,
} from "../models/travel-reimbursement-model";

export const TRAVEL_REIMBURSEMENT_FORM_VALUES: TravelReimbursementFormType = {
  action: null,
  personalInformation: {
    fullName: "",
    department: "",
    positionTitle: "",
    emailAddress: "",
    contactNumber: "",
    bankAccountNumber: "",
  },
  travelDetails: {
    travelDestination: "",
    purposeOfTravel: "",
    dateOfDeparture: "",
    dateOfReturn: "",
  },
  expenseDetails: [
    {
      id: crypto.randomUUID(),
      dateOfExpense: "",
      vendorServiceProvider: "",
      expenseAmount: "",
      currency: "",
      paymentMethod: "",
      invoiceReceiptNumber: "",
      expenseCategory: "",
      expenseAttachment: {
        receiptUploadAttachment: null,
        invoiceUploadAttachment: null,
      },
    },
  ],
  approvalAndSubmission: {
    approvingManagerName: "",
    approvingManagerEmail: "",
  },
  additionalInformation: {
    notesComments: "",
  },
};
