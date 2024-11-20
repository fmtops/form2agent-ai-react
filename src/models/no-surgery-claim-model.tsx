import { FormAction } from "../consts/general-fields.consts";

export type NoSurgeryClaimBaseFormType = {
  patientInfo: NoSurgeryPatientPersonalDataFormType;
  treatmentOverview: NoSurgeryTreatmentOverviewFormType;
  goals: NoSurgeryGoalsFormType;
  outcomes: NoSurgeryOutcomesFormType;
};

export type NoSurgeryClaimFormType = {
  action: FormAction | null;
  pageIndex: number;
} & NoSurgeryClaimBaseFormType;

export enum NoSurgeryPageIndex {
  PatientInfo = "PatientInfo",
  TreatmentOverview = "TreatmentOverview",
  Goals = "Goals",
  Outcomes = "Outcomes",
}

export type NoSurgeryPatientPersonalDataFormType = {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  country?: string;
};

export type NoSurgeryTreatmentOverviewFormType = {
  treatmentCenter?: string;
  practicionerName?: string;
  language?: string;
  startTreatmentDate?: string;
  endTreatmentDate?: string;
  totalNumberOfSessions?: string;
  telesessionsNumber?: string;
};

export type NoSurgeryGoalsFormType = {
  treatmentModel?: string;
  frequency?: string;
  goalsForTreatment?: string;
};

export type NoSurgeryOutcomesFormType = {
  patientProgress?: string;
  notes?: string;
};
