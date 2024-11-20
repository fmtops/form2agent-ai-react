import {
  FormAction,
  GenderOptionsExtended,
  YesNoNotApplicableOptions,
} from "../consts/general-fields.consts";
import { TreatmentCenters } from "../consts/patient-registration.consts";
import {
  NoSurgeryClaimBaseFormType,
  NoSurgeryPageIndex,
} from "./no-surgery-claim-model";

export type NoSurgeryClaimContextFormType = NoSurgeryClaimBaseFormType & {
  action: string | null;
  pageIndex: number;
};

export const GoalsForTreatments: string[] = [
  // Physical Therapy Goals
  "Improve Mobility and Range of Motion",
  "Strengthening and Conditioning",
  "Pain Reduction and Management",
  "Posture Correction and Balance Improvement",
  "Injury Prevention and Education",

  // Occupational Therapy Goals
  "Improve Daily Living Skills (e.g., dressing, grooming, bathing)",
  "Enhance Fine Motor Skills and Coordination",
  "Cognitive Skills Improvement (e.g., memory, attention, problem-solving)",
  "Adaptation to Assistive Devices",
  "Social Skills Development",

  // Mental Health Counseling/Therapy Goals
  "Manage Anxiety and Stress Levels",
  "Improve Mood and Emotional Stability",
  "Increase Coping Skills and Resilience",
  "Improve Social Interaction and Relationships",
  "Increase Insight and Self-Awareness",

  // General Non-Surgical Goals
  "Pain Management",
  "Enhance Physical Endurance",
  "Increase Functional Independence",
  "Enhance Quality of Life",
  "Prevent Condition Deterioration",

  "Other",
];

export const TherapyFrequency: string[] = [
  "Daily",
  "Weekly",
  "Bi-weekly",
  "Monthly",
];

export const Treatments: string[] = [
  "Individual Sessions",
  "Group Sessions",
  "Intensive Program",
];

export const Languages: string[] = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Turkish",
  "Hindi",
  "Bengali",
  "Urdu",
  "Punjabi",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Kannada",
];

export const Countries: string[] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "USA",
  "Canada",
  "Germany",
  "France",
  "United Kingdom",
  "Italy",
  "Spain",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Switzerland",
];

export const NoSurgeryClaimContext = {
  action: `Invisible field. Fill only when user says one of the following: ${Object.keys(FormAction).join(", ")} or null.`,
  pageIndex: `Page number. Set according to currently reached section: 
    ${Object.keys(NoSurgeryPageIndex)
      .map((key, index) => `${index + 1} = ${key}`)
      .join(", ")}.`,
  patientInfo: {
    fullName: "",
    indentifier: "",
    dateOfBirth: "",
    gender: `radio(${GenderOptionsExtended.join(", ")})`,
    country: `dropdown(${Countries.join(", ")})`,
  },
  treatmentOverview: {
    treatmentCenter: `dropdown(${TreatmentCenters.join(", ")})`,
    practicionerName: "",
    language: `dropdown(${Languages.join(", ")})`,
    startTreatmentDate: "",
    endTreatmentDate: "",
    totalNumberOfSessions: "",
    telesessionsNumber: "",
  },
  goals: {
    treatmentModel: `dropdown(${Treatments.join(", ")})`,
    frequency: `dropdown(${TherapyFrequency.join(", ")})`,
    goalsForTreatment: `dropdown(${GoalsForTreatments.join(", ")})`,
  },
  outcomes: {
    patientProgress: `radio(${YesNoNotApplicableOptions.join(", ")})`,
    notes: "",
  },
};

export const NoSurgeryClaimSteps: string[] = [
  "Patient Data",
  "Treatment Overview",
  "Goals",
  "Outcomes",
];
