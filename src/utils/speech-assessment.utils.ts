import { SpeechAssessmentFormType } from "../models/speech-assessment-model";

/**
 * @param prevForm - previous form data
 * @param responseData - response data to merge with the previous form data
 * @returns returns the merged form data
 * @description Used to merge the response data with the previous form data
 */
export function mergeFormData(
  prevForm: SpeechAssessmentFormType,
  responseData: Partial<SpeechAssessmentFormType>
): SpeechAssessmentFormType {
  return {
    ...prevForm,
    ...responseData,
    patientInformation: {
      ...prevForm.patientInformation,
      ...responseData.patientInformation,
    },
    assessmentSessionDetails: {
      ...prevForm.assessmentSessionDetails,
      ...responseData.assessmentSessionDetails,
    },
    perceptualSpeechAnalysis: {
      ...prevForm.perceptualSpeechAnalysis,
      ...responseData.perceptualSpeechAnalysis,
      specificSoundNasalEmission: [
        ...(responseData.perceptualSpeechAnalysis?.specificSoundNasalEmission ||
          prevForm.perceptualSpeechAnalysis?.specificSoundNasalEmission ||
          []),
      ],
      specificSoundNasalEmissionOther:
        responseData.perceptualSpeechAnalysis
          ?.specificSoundNasalEmissionOther || "",
    },
    speechArticulationAssessment: {
      ...prevForm.speechArticulationAssessment,
      ...responseData.speechArticulationAssessment,
      compensatoryArticulationPatterns: [
        ...(responseData.speechArticulationAssessment
          ?.compensatoryArticulationPatterns ||
          prevForm.speechArticulationAssessment
            ?.compensatoryArticulationPatterns ||
          []),
      ],
      articulationModificationsRequired: [
        ...(responseData.speechArticulationAssessment
          ?.articulationModificationsRequired ||
          prevForm.speechArticulationAssessment
            ?.articulationModificationsRequired ||
          []),
      ],
      articulationErrors: [
        ...(responseData.speechArticulationAssessment?.articulationErrors ||
          prevForm.speechArticulationAssessment?.articulationErrors ||
          []),
      ],
    },
  };
}
