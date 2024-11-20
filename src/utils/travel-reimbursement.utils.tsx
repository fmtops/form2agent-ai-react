import { TravelReimbursementFormType } from "../models/travel-reimbursement-model";

/**
 * @param prevForm - previous form data
 * @param responseData - response data to merge with the previous form data
 * @returns returns the merged form data
 * @description Used to merge the response data with the previous form data
 */
export function mergeFormData(
  prevForm: TravelReimbursementFormType,
  responseData: Partial<TravelReimbursementFormType>
): TravelReimbursementFormType {
  return {
    ...prevForm,
    ...responseData,
    personalInformation: {
      ...prevForm.personalInformation,
      ...responseData.personalInformation,
    },
    travelDetails: {
      ...prevForm.travelDetails,
      ...responseData.travelDetails,
    },
    expenseDetails: Array.isArray(responseData.expenseDetails)
      ? [...responseData.expenseDetails]
      : prevForm.expenseDetails,
    approvalAndSubmission: {
      ...prevForm.approvalAndSubmission,
      ...responseData.approvalAndSubmission,
    },
    additionalInformation: {
      ...prevForm.additionalInformation,
      ...responseData.additionalInformation,
    },
  };
}
