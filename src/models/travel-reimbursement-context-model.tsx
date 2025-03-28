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
      receiptUploadAttachment: string | null;
      invoiceUploadAttachment: string | null;
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
    contactNumber: "if its not filled in, ask about this field",
    bankAccountNumber: "if its not filled in, ask about this field",
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
        "if its not filled in, ask about this field, each time expense details are used, return all previous expense details too.",
      vendorServiceProvider:
        "if its not filled in, ask about this field, each time expense details are used, return all previous expense details too.",
      expenseAmount:
        "if its not filled in, ask about this field, each time expense details are used, return all previous expense details too.",
      currency:
        "if its not filled in, ask about this field, each time expense details are used, return all previous expense details too.",
      paymentMethod:
        "if its not filled in, ask about this field, each time expense details are used, return all previous expense details too.",
      invoiceReceiptNumber:
        "if its not filled in, ask about this field, each time expense details are used, return all previous expense details too.",
      expenseCategory: `if its not filled in, ask about this field, each time expense details are used, return all previous expense details too. dropdown(${Object.values(ExpenseCategories).join()})`,
      expenseAttachment: {
        receiptUploadAttachment:
          "file(), each time expense details are used, return all previous expense details too.",
        invoiceUploadAttachment:
          "file(), each time expense details are used, return all previous expense details too.",
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
