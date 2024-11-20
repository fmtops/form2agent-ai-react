import { FormAction } from "../consts/general-fields.consts";

export type InvoiceBaseFormType = {
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

export type InvoiceFormType = {
  action: null | FormAction;
} & InvoiceBaseFormType;
