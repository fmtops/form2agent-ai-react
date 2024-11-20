import { NoSurgeryClaimContextFormType } from "../models/no-surgery-claim-context-model";

export const NO_SURGERY_CLAIM_FORM_VALUES: NoSurgeryClaimContextFormType = {
  action: null,
  pageIndex: 1,
  patientInfo: {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
  },
  treatmentOverview: {
    treatmentCenter: "",
    practicionerName: "",
    language: "",
    startTreatmentDate: "",
    endTreatmentDate: "",
    totalNumberOfSessions: "",
    telesessionsNumber: "",
  },
  goals: {
    treatmentModel: "",
    frequency: "",
    goalsForTreatment: "",
  },
  outcomes: {
    patientProgress: "",
    notes: "",
  },
};
