import { FormAction } from "../consts/general-fields.consts";
import { Pronouns, Language, TreatmentStage, VoiceResonance, NasalEmissionObservations, SpecificSoundNasalEmission, CompensatoryArticulationPatterns, ArticulationModificationsRequired, ArticulationErrors } from "./speech-assessment-model";

export type DescriptionContextType = {
    action: string;
    patientInformation: {
        patientName: string;
        uniquePatientIdentifier: string;
        age: string;
        pronouns: string;
        referringInstitution: string;
    }
    assessmentSessionDetails: {
        dateOfAssessment: string;
        speechPathologist: string;
        assessmentLanguage: string;
        telehealthSession: string;
  }
    treatmentStage: string;
    perceptualSpeechAnalysis: {
        voiceResonance: string;
        nasalEmissionObservations: string;
        specificSoundNasalEmission?: string[];
        specificSoundNasalEmissionOther: string;
    }
    speechArticulationAssessment: {
        compensatoryArticulationPatterns: string[];
        articulationErrors: string[];
        articulationModificationsRequired: string[];
        otherArticulationIssues?: string;
    }
    additionalComments?: string;
}

export const DescriptionContext: DescriptionContextType = {
    action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
    patientInformation: {
        patientName: "",
        uniquePatientIdentifier: "",
        age: "",
        pronouns: `radio(${Object.values(Pronouns).join(", ")})`,
        referringInstitution: ""
    },
    assessmentSessionDetails: {
        dateOfAssessment: "format(ISO date) confirmOrUpdate()",
        speechPathologist: "",
        assessmentLanguage: `radio(${Object.values(Language).join(", ")})`,
        telehealthSession: ""
    },
    treatmentStage: `radio(${Object.values(TreatmentStage).join(", ")})`,
    perceptualSpeechAnalysis: {
        voiceResonance: `radio(${Object.values(VoiceResonance).join(", ")})`,
        nasalEmissionObservations: `radio(${Object.values(NasalEmissionObservations).join(", ")})`,
        specificSoundNasalEmission: [`checkboxes(${Object.values(SpecificSoundNasalEmission).join(", ")}) each time those items are used, return all previous items too, if not applicable for the specificSoundNasalEmission options, fill in with values that are not applicable for the specificSoundNasalEmissionOthe`],
        specificSoundNasalEmissionOther: "optional() fill in with values that are not applicable for the specificSoundNasalEmission options"
    },
    speechArticulationAssessment: {
        compensatoryArticulationPatterns: [`checkboxes(${Object.values(CompensatoryArticulationPatterns).join(", ")}) each time those items are used, return all previous items too`],
        articulationErrors: [`checkboxes(${Object.values(ArticulationErrors).join(", ")}) each time those items are used, return all previous items too`],
        articulationModificationsRequired: [`checkboxes(${Object.values(ArticulationModificationsRequired).join(", ")}) each time those items are used, return all previous items too`],
        otherArticulationIssues: "optional() ask about it",
    },
    additionalComments: "optional()"
}