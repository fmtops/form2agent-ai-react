export type PatientRegistrationBaseFormType = {
  personalData: PatientPersonalDataFormType;
  parentGuardianInformation: ParentGuardianInformationFormType;
  familyHistory: FamilyHistoryFormType;
  diagnosis: DiagnosisFormType;
};

export type PatientRegistrationFormType = {
  action: PrAction | null;
  pageIndex: number;
} & PatientRegistrationBaseFormType;

export enum PrAction {
  Submit = "Submit",
}

export enum PageIndex {
  PersonalData = "PersonalData",
  ParentGuardianInformation = "ParentGuardianInformation",
  FamilyHistory = "FamilyHistory",
  Diagnosis = "Diagnosis",
}

export type PatientPersonalDataFormType = {
  evaluationDate?: string;
  partner?: string;
  treatmentCenter?: string;
  patientRecordNumber?: string;
  patientRecordNumberLocal?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  dateOfBirth?: string;
  dobUnknown?: boolean;
  race?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  phone?: string;
  phoneSecondary?: string;
};

export type ParentGuardianInformationFormType = {
  parentGuardianFirstName?: string;
  parentGuardianLastName?: string;
  relationship?: string;
  otherRelationship?: string;
  hearAboutTC?: string;
  hearAboutTCSource?: string;
};

export type FamilyHistoryFormType = {
  lengthOfPregnancy?: string;
  lengthOfPregnancyUnknown?: boolean;
  complicationsDuringPregnancy?: string;
  complicationsDuringBirth?: string;
  smokingDuringPregnancy?: string;
  alcoholDuringPregnancy?: string;
  cleftInCloseFamily?: string;
  cleftInFurtherFamily?: string;
};

export type DiagnosisFormType = {
  weight?: string;
  height?: string;
  surgeryBefore?: string;
  surgeryType?: string;
  lipTypeOfCleftLeft?: string;
  lipTypeOfCleftRight?: string;
  alveolusTypeOfCleftLeft?: string;
  alveolusTypeOfCleftRight?: string;
  palateHardTypeOfCleftLeft?: string;
  palateHardTypeOfCleftRight?: string;
  palateSoftTypeOfCleft?: string;
  additionalCommentsOnDiagnosis?: string;
  additionalCraniofacialDeformities?: string;
  abnormalities?: string[];
  anyAllergies?: string;
  otherAllergies?: string;
  medicationAllergies?: string;
  otherHealthProblems?: string;
};
