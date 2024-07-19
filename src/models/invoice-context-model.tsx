import { InvoiceAction } from "./invoice-model";

export type DescriptionContextType = {
  action: string;
  invoiceNumber: string;
  invoiceDate: string;
  from: {
    companyName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  to: {
    companyName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    name: string;
    price: string;
    amount: string;
  }[];
};

export const DescriptionContext: DescriptionContextType = {
  action: `Invisible field to perform some action/click/asks to do smth set this field to the action name - allowed actions are ${Object.keys(InvoiceAction).join(", ")} or null`,
  invoiceNumber: "",
  invoiceDate: `Date field with a default value ${new Date()
    .toISOString()
    .substr(
      0,
      10
    )}. Ask user to confirm the date, unless it is provided via file upload.`,
  from: {
    companyName: "",
    address: "",
    city: "",
    state: "if it is US state, use only two letters that represent that state",
    postalCode:
      "if possible define the postal code based on the provided values for cite and state",
    country:
      "provide full name of country, e.g. United States of America based on the provided values for cite and state if possible",
  },
  to: {
    companyName: "",
    address: "",
    city: "",
    state: "if it is US state, use only two letters that represent that state",
    postalCode:
      "if possible define the postal code based on the provided values for cite and state",
    country:
      "provide full name of country, e.g. United States of America based on the provided values for cite and state if possible",
  },
  items: [
    {
      name: "each time items are used, return all previous items too. if prompted with adding new item and have incomplete information, mark remaining fields with empty values and prompt user to fill them.",
      price:
        "each time items are used, return all previous items too, provide only numeric value, cut any currency symbols or other characters.",
      amount: "each time items are used, return all previous items too",
    },
  ],
};
