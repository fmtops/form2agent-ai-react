import {
  SpecificSoundNasalEmission,
  SpeechAssessmentFormType,
} from "../models/speech-assessment-model";

export const SPEECH_ASSESSMENT_FORM_VALUES: SpeechAssessmentFormType = {
  action: null,
  patientInformation: {
    patientName: "",
    uniquePatientIdentifier: "",
    age: "",
    pronouns: "",
    referringInstitution: "",
  },
  assessmentSessionDetails: {
    dateOfAssessment: "",
    speechPathologist: "",
    assessmentLanguage: "",
    telehealthSession: false,
  },
  treatmentStage: "",
  perceptualSpeechAnalysis: {
    voiceResonance: "",
    nasalEmissionObservations: "",
    specificSoundNasalEmission: [],
    specificSoundNasalEmissionOther: "",
  },
  speechArticulationAssessment: {
    compensatoryArticulationPatterns: [],
    articulationModificationsRequired: [],
    articulationErrors: [],
    otherArticulationIssues: "",
  },
  additionalComments: "",
};
