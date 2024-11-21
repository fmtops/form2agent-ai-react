import { FormikProps } from "formik";
import { RefObject } from "react";
import { SurgeryClaimContextFormType } from "../models/surgery-claim-context-model";
import { NoSurgeryClaimContextFormType } from "../models/no-surgery-claim-context-model";
import {
  NoSurgeryPatientPersonalDataFormType,
  NoSurgeryTreatmentOverviewFormType,
  NoSurgeryGoalsFormType,
  NoSurgeryOutcomesFormType,
} from "../models/no-surgery-claim-model";

export function createNewFormObject(
  prevForm: NoSurgeryClaimContextFormType,
  formikPersonalDataRef: RefObject<
    FormikProps<NoSurgeryPatientPersonalDataFormType>
  >,
  formikTratmentOverviewRef: RefObject<
    FormikProps<NoSurgeryTreatmentOverviewFormType>
  >,
  formikGoalsRef: RefObject<FormikProps<NoSurgeryGoalsFormType>>,
  formikOutcomessRef: RefObject<FormikProps<NoSurgeryOutcomesFormType>>
): NoSurgeryClaimContextFormType {
  return {
    ...prevForm,
    patientInfo: formikPersonalDataRef.current?.values ?? {
      ...prevForm.patientInfo,
    },
    treatmentOverview: formikTratmentOverviewRef.current?.values ?? {
      ...prevForm.treatmentOverview,
    },
    goals: formikGoalsRef.current?.values ?? {
      ...prevForm.goals,
    },
    outcomes: formikOutcomessRef.current?.values! ?? {
      ...prevForm.outcomes,
    },
  };
}

export const mergeFormData = (
  prevForm: NoSurgeryClaimContextFormType,
  responseData: Partial<NoSurgeryClaimContextFormType>
): NoSurgeryClaimContextFormType => {
  return {
    ...prevForm,
    ...responseData,
    patientInfo: {
      ...prevForm.patientInfo,
      ...responseData.patientInfo,
    },
    treatmentOverview: {
      ...prevForm.treatmentOverview,
      ...responseData.treatmentOverview,
    },
    goals: {
      ...prevForm.goals,
      ...responseData.goals,
    },
    outcomes: {
      ...prevForm.outcomes,
      ...responseData.outcomes,
    },
  };
};
