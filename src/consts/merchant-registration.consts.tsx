import { MerchantRegistrationFormType } from "../models/merchant-registration-model";

export const MerchantRegistrationSteps: string[] = [
  "Merchant",
  "Product & Sales",
  "Owner",
];

export const MERCHANT_FORM_VALUES: MerchantRegistrationFormType = {
  action: null,
  pageIndex: 1,
  generalInformation: {
    dba: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    city: "",
    state: "",
  },
  businessOverview: {
    productDescription: "",
    businessOpenedDate: "",
    totalAnnualSales: "",
    percentCardSales: "",
    maxAmountPerItem: "",
    averageAmountPerSale: "",
    returnPolicyDescription: "",
    sellingProcessDescription: "",
  },
  primaryOwner: {
    firstName: "",
    lastName: "",
    ownerTitle: "",
    ownership: "",
    socialSecurityNumber: "",
    birthdate: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
  },
};
