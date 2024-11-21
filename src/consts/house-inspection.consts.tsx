import { HouseInspectionFormType } from "../models/house-inspection-model";

export const HOUSE_INSPECTION_FORM_VALUES: HouseInspectionFormType = {
  action: null,
  rooms: [
    {
      name: "",
      size: "",
      conditionDescription: "",
      roomPhoto: null,
    },
  ],
};
