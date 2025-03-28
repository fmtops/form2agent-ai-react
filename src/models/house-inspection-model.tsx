import { FormAction } from "../consts/general-fields.consts";

export type HouseInspectionRoom = {
  id?: string;
  name: string;
  size: string;
  conditionDescription: string;
  roomPhoto?: string | null;
};

export type HouseInspectionBaseFormType = {
  rooms: HouseInspectionRoom[];
};

export type HouseInspectionFormType = {
  action: null | FormAction;
} & HouseInspectionBaseFormType;
