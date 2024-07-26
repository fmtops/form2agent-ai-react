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
  action: `Allowed actions are ${Object.keys(InvoiceAction).join(", ")} or null`,
  invoiceNumber: "",
  invoiceDate: `format(ISO date) confirmOrUpdate()`,
  from: {
    companyName: "",
    address: "",
    city: "",
    state: "abbreviate(2)",
    postalCode: "deduceFrom(city, state)",
    country: "deduceFrom(city, state)",
  },
  to: {
    companyName: "",
    address: "",
    city: "",
    state: "abbreviate(2)",
    postalCode: "deduceFrom(city, state)",
    country: "deduceFrom(city, state)",
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
