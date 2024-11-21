import { FormAction } from "../consts/general-fields.consts";
import { ExpenseCategories } from "./travel-reimbursement-model";

export type DescriptionContextType = {
  action: string;
  personalInformation: {
    fullName: string;
    department: string;
    positionTitle: string;
    emailAddress: string;
    contactNumber: string;
    bankAccountNumber: string;
  };
  travelDetails: {
    purposeOfTravel: string;
    travelDestination: string;
    dateOfDeparture: string;
    dateOfReturn: string;
  };
  expenseDetails: {
    dateOfExpense: string;
    vendorServiceProvider: string;
    expenseAmount: string;
    currency: string;
    paymentMethod: string;
    invoiceReceiptNumber?: string;
    expenseCategory?: string;
    expenseAttachment: {
      receiptUploadAttachment: string;
      invoiceUploadAttachment: string;
    };
  }[];
  approvalAndSubmission: {
    approvingManagerName: string;
    approvingManagerEmail: string;
  };
  additionalInformation?: {
    notesComments?: string;
  };
};

export const DescriptionContext: DescriptionContextType = {
  action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
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
      dateOfExpense:
        "each time expense details are used, return all previous expense details too.",
      vendorServiceProvider:
        "each time expense details are used, return all previous expense details too.",
      expenseAmount:
        "each time expense details are used, return all previous expense details too.",
      currency:
        "each time expense details are used, return all previous expense details too.",
      paymentMethod:
        "each time expense details are used, return all previous expense details too.",
      invoiceReceiptNumber:
        "each time expense details are used, return all previous expense details too.",
      expenseCategory: `each time expense details are used, return all previous expense details too. dropdown(${Object.values(ExpenseCategories).join()})`,
      expenseAttachment: {
        receiptUploadAttachment:
          "each time expense details are used, return all previous expense details too.",
        invoiceUploadAttachment:
          "each time expense details are used, return all previous expense details too.",
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
