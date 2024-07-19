import { InvoiceFormType } from "../models/invoice-model";

export const INVOICE_FORM_VALUES: InvoiceFormType = {
  action: null,
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().substr(0, 10),
  from: {
    companyName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  to: {
    companyName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  items: [
    {
      name: "",
      price: "",
      amount: "",
    },
  ],
};
