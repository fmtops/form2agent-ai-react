import { PatientRegistrationFormType } from "../models/patient-registration-model";

export const PatientRegistrationSteps: string[] = [
  "Personal Data",
  "Parent/Guardian Information",
  "Family History",
  "Diagnosis",
];

export const GenderOptions: string[] = ["Female", "Male"];

export const Race: string[] = [
  "Asian",
  "Caucasian (White)",
  "African (Black)",
  "Asian (Indian)",
  "Other",
  "Mixed",
  "Hispanic (Latino)",
  "Pacific Islander",
];

export const TreatmentCenters: string[] = [
  "Neurological Institute",
  "Cardiovascular Excellence Center",
  "Quantum Orthopedic Clinic",
  "Genesis Treatment Facility",
  "Pediatric Health Center",
  "Lumina Endocrine Clinic",
  "Spectrum Dermatology",
  "Vertex Pulmonary Clinic",
];
export const Partners: string[] = [
  "Neuro Research Global",
  "Cardiac Innovators Alliance",
  "Advanced Gastro Society",
  "Continental Oncology Group",
  "Virtual Medicine Institute",
  "Regenerative Medicine League",
  "Pediatric Holistic Council",
  "Rare Genetics Forum",
];

export const RelationshipOptions: string[] = [
  "Mother",
  "Father",
  "Grandparent",
  "Brother",
  "Sister",
  "Aunt",
  "Uncle",
  "Cousin",
  "Self",
  "Friend",
  "Other",
];

export const HearAboutTCOptions: string[] = [
  "Charity Organization",
  "Hospital/Physicians",
  "Newspaper and TV",
  "Internet",
  "Friends and Relatives",
  "Other",
];

export const HearAboutTCSourceValues: Record<string, string> = {
  "": "",
  "Charity Organization": "Name of the Charity Organization (Optional)",
  "Hospital/Physicians": "Name of the Hospital Physician (Optional)",
  "Newspaper and TV": "Specific Source Name (Optional)",
  Internet: "Website or Online Service (Optional)",
  "Friends and Relatives": "Name of Friend or Relative (Optional)",
  Other: "Please Specify the Source (Optional)",
};

export const YesNoIDKOptions: string[] = ["Yes", "No", "Don't know"];

export const YesNoOptions: string[] = ["Yes", "No"];

export const surgeryOptions: string[] = [
  "Cleft Lip Surgery",
  "Cleft Palate Surgery",
  "Cleft Lip and Palate Surgery",
];

export const cleftLipTypeOptions: string[] = [
  "Not cleft",
  "Complete",
  "Incomplete",
];

export const cleftPalateTypeOptions: string[] = [
  "Not cleft",
  "Complete",
  "Incomplete",
  "Submucous",
];

export const abnormalitiesAreas: string[] = [
  "Heart",
  "Ears",
  "Tongue",
  "Retarded Growth",
  "Urinary System",
  "Limbs",
  "Skull",
  "Mental Retardation",
  "Eyes",
  "Fingers and Toes",
  "Mandible",
  "Nose",
  "Skin",
  "Speech",
];

export const IPAD_LABEL_SHOW = 780;
export const IPAD_LABEL_HIDE = 1380;

export const PATIENT_FORM_VALUES: PatientRegistrationFormType = {
  action: null,
  pageIndex: 1,
  personalData: {
    evaluationDate: "",
    partner: "",
    treatmentCenter: "",
    patientRecordNumber: "",
    patientRecordNumberLocal: "",
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    dateOfBirth: "",
    dobUnknown: false,
    race: "",
    address: "",
    postalCode: "",
    city: "",
    state: "",
    phone: "",
    phoneSecondary: "",
  },
  parentGuardianInformation: {
    parentGuardianFirstName: "",
    parentGuardianLastName: "",
    relationship: "",
    otherRelationship: "",
    hearAboutTC: "",
    hearAboutTCSource: "",
  },
  familyHistory: {
    lengthOfPregnancy: "",
    lengthOfPregnancyUnknown: false,
    complicationsDuringPregnancy: "",
    complicationsDuringBirth: "",
    smokingDuringPregnancy: "",
    alcoholDuringPregnancy: "",
    cleftInCloseFamily: "",
    cleftInFurtherFamily: "",
  },
  diagnosis: {
    weight: "",
    height: "",
    surgeryBefore: "No",
    surgeryType: "",
    lipTypeOfCleftLeft: "",
    lipTypeOfCleftRight: "",
    alveolusTypeOfCleftLeft: "",
    alveolusTypeOfCleftRight: "",
    palateHardTypeOfCleftLeft: "",
    palateHardTypeOfCleftRight: "",
    palateSoftTypeOfCleft: "",
    additionalCommentsOnDiagnosis: "",
    additionalCraniofacialDeformities: "",
    abnormalities: [],
    anyAllergies: "",
    otherAllergies: "",
    medicationAllergies: "",
    otherHealthProblems: "",
  },
};
