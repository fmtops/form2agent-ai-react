import { FormAction } from "../consts/general-fields.consts";

export type MerchantRegistrationBaseFormType = {
  generalInformation: MerchantGeneralInformationFormType;
  businessOverview: BusinessOverviewFormType;
  primaryOwner: PrimaryOwnerFormType;
};

export type MerchantRegistrationFormType = {
  action: FormAction | null;
  pageIndex: number;
} & MerchantRegistrationBaseFormType;

export enum PageIndex {
  GeneralInformation = "GeneralInformation",
  BusinessOverview = "BusinessOverview",
  PrimaryOwner = "PrimaryOwner",
}

export type MerchantGeneralInformationFormType = {
  dba?: string;
  addressLine1?: string;
  addressLine2?: string;
  zipCode?: string;
  city?: string;
  state?: string;
};

export type BusinessOverviewFormType = {
  productDescription?: string;
  businessOpenedDate?: string;
  totalAnnualSales?: string;
  percentCardSales?: string;
  maxAmountPerItem?: string;
  averageAmountPerSale?: string;
  returnPolicyDescription?: string;
  sellingProcessDescription?: string;
};

export type PrimaryOwnerFormType = {
  firstName?: string;
  lastName?: string;
  ownerTitle?: string;
  ownership?: string;
  socialSecurityNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  birthdate?: string;
  email?: string;
};
