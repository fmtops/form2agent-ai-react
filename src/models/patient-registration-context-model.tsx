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
  pageIndex: `Number. Do not set above ${Object.keys(PageIndex).length} and under 1. Invisible field used to set the current page. Use only those indexes: ${Object.keys(
    PageIndex
  )
    .map((key, index) => `${index + 1} = ${key}`)
    .join(", ")}.`,
  patientData: {
    evaluationDate: "",
    partner: `Dropdown select. Prompt the user. Values are ordered, allow user to select n-th value. The possible values are ${Partners.join(
      ", "
    )}`,
    treatmentCenter: `Dropdown select. Prompt the user. Values are ordered, allow user to select n-th value. The possible values are ${TreatmentCenters.join(
      ", "
    )}`,
    patientRecordNumber: "",
    patientRecordNumberLocal: "",
    firstName: "",
    lastName: "",
    middleName: "this field is optional",
    gender: `Radio group. Valid values are ${GenderOptions.join(", ")}`,
    dateOfBirth: "",
    dobUnknown: false,
    race: `Radio group. Valid values are ${Race.join(", ")}`,
    address: "",
    postalCode:
      "if possible define the postal code based on the provided values for cite and state",
    city: "",
    state: "if it is US state, use only two letters that represent that state",
    phone: "convert according to provided sample (+1-222-222-2222)",
    phoneSecondary:
      "convert according to provided sample (+1-222-222-2222) - this field is optional",
  },
  parentGuardinaInformation: {
    parentGuardianFirstName: "",
    parentGuardianLastName: "",
    relationship: `Radio group Valid values are ${RelationshipOptions.join(
      ", "
    )}`,
    otherRelationship: "Is optional, ask ONLY if relationship is Other",
    hearAboutTC: `Radio group. Valid values are ${HearAboutTCOptions.join(
      ", "
    )}`,
    hearAboutTCSource: "is optional value driven by the hearAboutTC field",
  },
  familyHistory: {
    lengthOfPregnancy: "the length of the pregnancy in months",
    lengthOfPregnancyUnknown: false,
    complicationsDuringPregnancy: `Radio group. Valid values are ${YesNoIDKOptions.join(
      ", "
    )}`,
    complicationsDuringBirth: `Radio group. Valid values are ${YesNoIDKOptions.join(
      ", "
    )}`,
    smokingDuringPregnancy: `Radio group. Valid values are ${YesNoIDKOptions.join(
      ", "
    )}`,
    alcoholDuringPregnancy: `Radio group. Valid values are ${YesNoIDKOptions.join(
      ", "
    )}`,
    cleftInCloseFamily: `Radio group. Valid values are ${YesNoIDKOptions.join(
      ", "
    )}`,
    cleftInFurtherFamily: `Radio group. Valid values are ${YesNoIDKOptions.join(
      ", "
    )}`,
  },
  diagnosis: {
    weight: "Unit should be in lb. Convert to lbs if necessary.",
    height: "Unit should be in ft. Convert to ft if necessary",
    surgeryBefore: `Radio group. Valid values are ${YesNoOptions.join(", ")}`,
    surgeryType: `Optional Radio group without a default value. Prompt the user if surgeryBefore is "Yes". Valid values are ${surgeryOptions.join(
      ", "
    )}`,
    lipTypeOfCleftLeft: `Radio group. Valid values are ${cleftLipTypeOptions.join(
      ", "
    )}`,
    lipTypeOfCleftRight: `Radio group. Valid values are ${cleftLipTypeOptions.join(
      ", "
    )}`,
    alveolusTypeOfCleftLeft: `Radio group. Valid values are ${cleftLipTypeOptions.join(
      ", "
    )}`,
    alveolusTypeOfCleftRight: `Radio group. Valid values are ${cleftLipTypeOptions.join(
      ", "
    )}`,
    palateHardTypeOfCleftLeft: `Radio group. Valid values are ${cleftPalateTypeOptions.join(
      ", "
    )}`,
    palateHardTypeOfCleftRight: `Radio group. Valid values are ${cleftPalateTypeOptions.join(
      ", "
    )}`,
    palateSoftTypeOfCleft: `Radio group. Valid values are ${cleftPalateTypeOptions.join(
      ", "
    )}`,
    additionalCommentsOnDiagnosis: "Is optional field for additional comments",
    additionalCraniofacialDeformities: `Radio group. Valid values are ${YesNoIDKOptions.join(
      ", "
    )}`,
    abnormalities: [
      `Is an array of checkboxes, always return full array of these options. Prompt the user. Valid values are: ${abnormalitiesAreas.join(
        ", "
      )}`,
    ],
    anyAllergies: `Radio group. Valid values are ${YesNoIDKOptions.join(", ")}`,
    otherAllergies: "Is optional text field for additional allergies",
    medicationAllergies: "Is optional text field for medication allergies",
    otherHealthProblems: "Is optional text field for additional health issues",
  },
};
