import { FormAction } from "../consts/general-fields.consts";
import {
  PageIndex,
  BusinessOverviewFormType,
  MerchantGeneralInformationFormType,
  PrimaryOwnerFormType,
} from "./merchant-registration-model";

export type MerchantRegistrationContextFormType = {
  generalInformation: MerchantGeneralInformationFormType;
  businessOverview: BusinessOverviewFormType;
  primaryOwner: PrimaryOwnerFormType;
  action: string;
  pageIndex: string;
};

export const MerchantRegistrationContext: MerchantRegistrationContextFormType =
  {
    action: `Invisible field. Fill only when user says one of the following: ${Object.keys(FormAction).join(", ")} or null.`,
    pageIndex: `Page number. Set according to currently reached section: 
    ${Object.keys(PageIndex)
      .map((key, index) => `${index + 1} = ${key}`)
      .join(", ")}.`,
    generalInformation: {
      dba: "",
      addressLine1: "",
      addressLine2: "optional()",
      zipCode: "deduceFrom(city, state)",
      city: "",
      state: "abbreviate(2)",
    },
    businessOverview: {
      productDescription: "",
      businessOpenedDate: "format(ISO date) confirmOrUpdate()",
      totalAnnualSales: "format($)",
      percentCardSales: "format(%)",
      maxAmountPerItem: "format($)",
      averageAmountPerSale: "format($)",
      returnPolicyDescription: "optional()",
      sellingProcessDescription: "optional()",
    },
    primaryOwner: {
      firstName: "",
      lastName: "",
      ownerTitle: "optional()",
      ownership: "format(%)",
      socialSecurityNumber: "format(###-##-####)",
      birthdate: "format(ISO date) confirmOrUpdate()",
      addressLine1: "",
      addressLine2: "optional()",
      city: "",
      state: "abbreviate(2)",
      zipCode: "deduceFrom(city, state)",
      email: "format(email)",
    },
  };
