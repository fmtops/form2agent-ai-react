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
  action: null | InvoiceAction;
} & InvoiceBaseFormType;

export enum InvoiceAction {
  Submit = "Submit",
}
