import { FormikProps } from "formik";
import { RefObject } from "react";
import { SurgeryClaimContextFormType } from "../models/surgery-claim-context-model";
import {
  SurgeryPatientPersonalDataFormType,
  SurgeryMedicalAdmissionFormType,
  SurgeryAnesthesiaFormType,
  SurgeryDetailsFormType,
  SubmissionDetailsFormType,
} from "../models/surgery-claim-model";

export function createNewFormObject(
  prevForm: SurgeryClaimContextFormType,
  formikPersonalDataRef: RefObject<
    FormikProps<SurgeryPatientPersonalDataFormType>
  >,
  formikMedicalAdmissionRef: RefObject<
    FormikProps<SurgeryMedicalAdmissionFormType>
  >,
  formikAnesthesiaRef: RefObject<FormikProps<SurgeryAnesthesiaFormType>>,
  formikSurgeryDetailsRef: RefObject<FormikProps<SurgeryDetailsFormType>>,
  formikSubmissionDetailRef: RefObject<FormikProps<SubmissionDetailsFormType>>
): SurgeryClaimContextFormType {
  return {
    ...prevForm,
    patientInfo: formikPersonalDataRef.current?.values ?? {
      ...prevForm.patientInfo,
    },
    medicalAdmission: formikMedicalAdmissionRef.current?.values ?? {
      ...prevForm.medicalAdmission,
    },
    anesthesia: formikAnesthesiaRef.current?.values ?? {
      ...prevForm.anesthesia,
    },
    surgeryDetails: formikSurgeryDetailsRef.current?.values! ?? {
      ...prevForm.surgeryDetails,
    },
    claimSubmissionDetails: formikSubmissionDetailRef.current?.values! ?? {
      ...prevForm.claimSubmissionDetails,
    },
  };
}

export const mergeFormData = (
  prevForm: SurgeryClaimContextFormType,
  responseData: Partial<SurgeryClaimContextFormType>
): SurgeryClaimContextFormType => {
  return {
    ...prevForm,
    ...responseData,
    patientInfo: {
      ...prevForm.patientInfo,
      ...responseData.patientInfo,
    },
    medicalAdmission: {
      ...prevForm.medicalAdmission,
      ...responseData.medicalAdmission,
    },
    anesthesia: {
      ...prevForm.anesthesia,
      ...responseData.anesthesia,
    },
    surgeryDetails: {
      ...prevForm.surgeryDetails,
      ...responseData.surgeryDetails,
    },
    claimSubmissionDetails: {
      ...prevForm.claimSubmissionDetails,
      ...responseData.claimSubmissionDetails,
    },
  };
};
