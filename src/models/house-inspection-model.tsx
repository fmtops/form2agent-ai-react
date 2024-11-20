import { FormAction } from "../consts/general-fields.consts";

export type HouseInspectionRoom = {
  name?: string;
  size?: string;
  conditionDescription?: string;
  roomPhoto?: File | null;
};

export type HouseInspectionBaseFormType = {
  rooms: HouseInspectionRoom[];
};

export type HouseInspectionFormType = {
  action: null | FormAction;
} & HouseInspectionBaseFormType;
