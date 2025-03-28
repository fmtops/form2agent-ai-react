import { FormAction } from "../consts/general-fields.consts";

export enum Pronouns {
  HeHimHis = "He/Him/His",
  SheHerHers = "She/Her/Hers",
  TheyThemTheirs = "They/Them/Theirs",
  Other = "Other",
}
export enum Language {
  English = "English",
  Spanish = "Spanish",
  French = "French",
  German = "German",
  Italian = "Italian",
  Dutch = "Dutch",
  Portuguese = "Portuguese",
  Chinese = "Chinese",
  Japanese = "Japanese",
}

export interface PatientInformation {
  patientName?: string;
  pronouns?: string;
  uniquePatientIdentifier?: string;
  age?: string;
  referringInstitution?: string;
}

export interface AssessmentSessionDetails {
  dateOfAssessment?: string;
  speechPathologist?: string;
  assessmentLanguage?: string;
  telehealthSession?: boolean;
}

export enum TreatmentStage {
  InitialEvaluation = "Initial Evaluation",
  PreSurgical = "Pre-Surgical Assessment for Speech Issues",
  PostSurgical = "Post-Surgical Speech Assessment",
  RoutineMonitoring = "Routine Monitoring",
}

export enum VoiceResonance {
  Normal = "Normal",
  Hypernasal = "Hypernasal",
  Hyponasal = "Hyponasal",
  CulDeSacResonance = "Cul-de-sac Resonance",
}

export enum NasalEmissionObservations {
  None = "None",
  AudibleNasalEmission = "Audible Nasal Emission",
  SpecificSoundNasalEmission = "Specific Sound Nasal Emission",
}

export enum SpecificSoundNasalEmission {
  S = "S",
  Z = "Z",
  SH = "SH",
  CH = "CH",
  J = "J",
}

export type PerceptualSpeechAnalysis = {
  voiceResonance?: VoiceResonance | string;
  nasalEmissionObservations?: NasalEmissionObservations | string;
  specificSoundNasalEmission?: (SpecificSoundNasalEmission | string)[];
  specificSoundNasalEmissionOther?: string;
};

export enum CompensatoryArticulationPatterns {
  GlottalStop = "Glottal Stop",
  PharyngealStop = "Pharyngeal Stop",
  PharyngealFricative = "Pharyngeal Fricative",
  NasalFricative = "Nasal Fricative",
  MidPalatalStop = "Mid-palatal Stop",
  GlottalFricative = "Glottal Fricative",
}

export enum ArticulationModificationsRequired {
  DentalAlignmentAdjustments = "Dental Alignment Adjustments",
  VelopharyngealDysfunctionAdjustments = "Velopharyngeal Dysfunction Adjustments",
}

export enum ArticulationErrors {
  P_B = "P/B",
  T_D = "T/D",
  K_G = "K/G",
  F_V = "F/V",
  S_Z = "S/Z",
  SH = "SH",
  CH = "CH",
}

export type SpeechArticulationAssessment = {
  compensatoryArticulationPatterns?: CompensatoryArticulationPatterns[];
  articulationModificationsRequired?: ArticulationModificationsRequired[];
  articulationErrors?: ArticulationErrors[];
  otherArticulationIssues?: string;
};

export type SpeechAssessmentBaseFormType = {
  patientInformation?: PatientInformation;
  assessmentSessionDetails?: AssessmentSessionDetails;
  treatmentStage?: TreatmentStage | "";
  perceptualSpeechAnalysis?: PerceptualSpeechAnalysis;
  speechArticulationAssessment?: SpeechArticulationAssessment;
  additionalComments?: string;
};

export type SpeechAssessmentFormType = {
  action?: null | FormAction;
} & SpeechAssessmentBaseFormType;
