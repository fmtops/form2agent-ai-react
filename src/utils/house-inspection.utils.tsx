import { HouseInspectionFormType } from "../models/house-inspection-model";

/**
 * @param prevForm - previous form data
 * @param responseData - response data to merge with the previous form data
 * @returns returns the merged form data
 * @description Used to merge the response data with the previous form data
 */
export function mergeFormData(
  prevForm: HouseInspectionFormType,
  responseData: Partial<HouseInspectionFormType>
): HouseInspectionFormType {
  return {
    ...prevForm,
    ...responseData,
    rooms: Array.isArray(responseData.rooms)
      ? [...responseData.rooms]
      : prevForm.rooms,
  };
}
