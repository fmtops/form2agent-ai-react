import { FormikProps } from "formik";
import { RefObject } from "react";
import {
  PatientRegistrationFormType,
  PatientPersonalDataFormType,
  ParentGuardianInformationFormType,
  FamilyHistoryFormType,
  DiagnosisFormType,
} from "../models/patient-registration-model";

export function createNewFormObject(
  prevForm: PatientRegistrationFormType,
  formikPatientDataRef: RefObject<FormikProps<PatientPersonalDataFormType>>,
  formikParentGuardianInformationRef: RefObject<
    FormikProps<ParentGuardianInformationFormType>
  >,
  formikFamilyHistoryRef: RefObject<FormikProps<FamilyHistoryFormType>>,
  formikDiagnosisRef: RefObject<FormikProps<DiagnosisFormType>>
): PatientRegistrationFormType {
  return {
    ...prevForm,
    personalData:
      formikPatientDataRef.current?.values ?? { ...prevForm.personalData },
    parentGuardianInformation:
      formikParentGuardianInformationRef.current?.values ?? { ...prevForm.parentGuardianInformation },
    familyHistory:
      formikFamilyHistoryRef.current?.values ?? { ...prevForm.familyHistory },
    diagnosis:
      formikDiagnosisRef.current?.values !?? { ...prevForm.diagnosis },
  };
}

export const mergeFormData = (
  prevForm: PatientRegistrationFormType,
  responseData: Partial<PatientRegistrationFormType>
): PatientRegistrationFormType => {
  return {
    ...prevForm,
    ...responseData,
    personalData: {
      ...prevForm.personalData,
      ...responseData.personalData,
    },
    parentGuardianInformation: {
      ...prevForm.parentGuardianInformation,
      ...responseData.parentGuardianInformation,
    },
    familyHistory: {
      ...prevForm.familyHistory,
      ...responseData.familyHistory,
    },
    diagnosis: {
      ...prevForm.diagnosis,
      ...responseData.diagnosis,
    },
  };
};
