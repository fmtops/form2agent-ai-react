import {
  HouseInspectionFormType,
  HouseInspectionRoom,
} from "../models/house-inspection-model";

export const BasicRoom: HouseInspectionRoom = {
  id: crypto.randomUUID(),
  name: "",
  size: "",
  conditionDescription: "",
  roomPhoto: null,
};

export const HOUSE_INSPECTION_FORM_VALUES: HouseInspectionFormType = {
  action: null,
  rooms: [BasicRoom],
};
