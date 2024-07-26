import {
  GenderOptions,
  HearAboutTCOptions,
  Partners,
  Race,
  RelationshipOptions,
  TreatmentCenters,
  YesNoIDKOptions,
  YesNoOptions,
  abnormalitiesAreas,
  cleftLipTypeOptions,
  cleftPalateTypeOptions,
  surgeryOptions,
} from "../consts/patient-registration.consts";
import {
  PrAction,
  DiagnosisFormType,
  FamilyHistoryFormType,
  PageIndex,
  ParentGuardianInformationFormType,
  PatientPersonalDataFormType,
} from "./patient-registration-model";

export type PatientRegistrationContextFormType = {
  patientData: PatientPersonalDataFormType;
  parentGuardinaInformation: ParentGuardianInformationFormType;
  familyHistory: FamilyHistoryFormType;
  diagnosis: DiagnosisFormType;
  action: string;
  pageIndex: string;
};

export const PatientRegistrationContext: PatientRegistrationContextFormType = {
  action: `Invisible field. Fill only when user says one of the following: ${Object.keys(PrAction).join(", ")} or null.`,
  pageIndex: `Page number. Set according to currently reached section: 
    ${Object.keys(PageIndex)
      .map((key, index) => `${index + 1} = ${key}`)
      .join(", ")}.`,
  patientData: {
    evaluationDate: "",
    partner: `dropdown(${Partners.join(", ")})`,
    treatmentCenter: `dropdown(${TreatmentCenters.join(", ")})`,
    patientRecordNumber: "",
    patientRecordNumberLocal:
      "local record number, different from patientRecordNumber",
    firstName: "",
    lastName: "",
    middleName: "optional()",
    gender: `radio(${GenderOptions.join(", ")})`,
    dateOfBirth: "",
    dobUnknown: false,
    race: `radio(${Race.join(", ")})`,
    address: "",
    postalCode: "deduceFrom(city, state)",
    city: "",
    state: "abbreviate(2)",
    phone: "format(+1-222-222-2222)",
    phoneSecondary: "format(+1-222-222-2222), optional()",
  },
  parentGuardinaInformation: {
    parentGuardianFirstName: "",
    parentGuardianLastName: "",
    relationship: `radio(${RelationshipOptions.join(", ")})`,
    otherRelationship: `optional(relationship is "Other"), specify the relationship`,
    hearAboutTC: `radio(${HearAboutTCOptions.join(", ")})`,
    hearAboutTCSource: "optional()",
  },
  familyHistory: {
    lengthOfPregnancy: "format(months)",
    lengthOfPregnancyUnknown: false,
    complicationsDuringPregnancy: `radio(${YesNoIDKOptions.join(", ")})`,
    complicationsDuringBirth: `radio(${YesNoIDKOptions.join(", ")})`,
    smokingDuringPregnancy: `radio(${YesNoIDKOptions.join(", ")})`,
    alcoholDuringPregnancy: `radio(${YesNoIDKOptions.join(", ")})`,
    cleftInCloseFamily: `radio(${YesNoIDKOptions.join(", ")})`,
    cleftInFurtherFamily: `radio(${YesNoIDKOptions.join(", ")})`,
  },
  diagnosis: {
    weight: "format(lb)",
    height: "format(ft)",
    surgeryBefore: `radio(${YesNoOptions.join(", ")})`,
    surgeryType: `optional(surgeryBefore is "Yes"), radio(${surgeryOptions.join(", ")})`,
    lipTypeOfCleftLeft: `radio(${cleftLipTypeOptions.join(", ")})`,
    lipTypeOfCleftRight: `radio(${cleftLipTypeOptions.join(", ")})`,
    alveolusTypeOfCleftLeft: `radio(${cleftLipTypeOptions.join(", ")})`,
    alveolusTypeOfCleftRight: `radio(${cleftLipTypeOptions.join(", ")})`,
    palateHardTypeOfCleftLeft: `radio(${cleftPalateTypeOptions.join(", ")})`,
    palateHardTypeOfCleftRight: `radio(${cleftPalateTypeOptions.join(", ")})`,
    palateSoftTypeOfCleft: `radio(${cleftPalateTypeOptions.join(", ")})`,
    additionalCommentsOnDiagnosis: "optional()",
    additionalCraniofacialDeformities: `radio(${YesNoIDKOptions.join(", ")})`,
    abnormalities: [`checkboxes(${abnormalitiesAreas.join(", ")})`],
    anyAllergies: `radio(${YesNoIDKOptions.join(", ")})`,
    otherAllergies: "optional()",
    medicationAllergies: "optional()",
    otherHealthProblems: "optional()",
  },
};
