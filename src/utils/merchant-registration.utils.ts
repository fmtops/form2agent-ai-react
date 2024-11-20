import { FormikProps } from "formik";
import { RefObject } from "react";
import {
  MerchantRegistrationFormType,
  MerchantGeneralInformationFormType,
  BusinessOverviewFormType,
  PrimaryOwnerFormType,
} from "../models/merchant-registration-model";

export function createNewFormObject(
  prevForm: MerchantRegistrationFormType,
  formikMerchantDataRef: RefObject<FormikProps<MerchantGeneralInformationFormType>>,
  formikParentGuardianInformationRef: RefObject<
    FormikProps<BusinessOverviewFormType>
  >,
  formikPrimaryOwnerRef: RefObject<FormikProps<PrimaryOwnerFormType>>
): MerchantRegistrationFormType {
  return {
    ...prevForm,
    generalInformation:
      formikMerchantDataRef.current?.values ?? { ...prevForm.generalInformation },
    businessOverview:
      formikParentGuardianInformationRef.current?.values ?? { ...prevForm.businessOverview },
    primaryOwner:
    formikPrimaryOwnerRef.current?.values ?? { ...prevForm.primaryOwner },
  };
}

export const mergeFormData = (
  prevForm: MerchantRegistrationFormType,
  responseData: Partial<MerchantRegistrationFormType>
): MerchantRegistrationFormType => {
  return {
    ...prevForm,
    ...responseData,
    generalInformation: {
      ...prevForm.generalInformation,
      ...responseData.generalInformation,
    },
    businessOverview: {
      ...prevForm.businessOverview,
      ...responseData.businessOverview,
    },
    primaryOwner: {
      ...prevForm.primaryOwner,
      ...responseData.primaryOwner,
    },
  };
};
