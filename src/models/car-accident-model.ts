import { FormAction } from "../consts/general-fields.consts";

export type CarAccidentFormType = {
  action?: null | FormAction;
} & CarAccidentBaseFormType;

export type CarAccidentBaseFormType = {
  time?: string;
  date?: string;
  location?: string;
  accidentDescription?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  phone?: string;
} & CarAccidentFamilyGuardianFormType & CarAccidentOfficerFormType & CarAccidentVehicleFormType & CarAcciedntWitnessFormType;

export type CarAccidentOfficerFormType = {
  firstNameOfficer?: string;
  lastNameOfficer?: string;
  badgeNumber?: string;
  phoneOfficer?: string;
}

export type CarAccidentFamilyGuardianFormType = {
  firstNameFamilyGuardian?: string;
  lastNameFamilyGuardian?: string;
  ageFamilyGuardian?: string;
  phoneNumberFamilyGuardian?: string;
}

export type CarAccidentVehicleFormType = {
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleLicensePlate?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  vehicleInsuranceCompany?: string;
}

export type CarAcciedntWitnessFormType = {
  witnessName?: string;
  witnessPhone?: string;
  witnessAddress?: string;
  witnessCity?: string;
  witnessState?: string;
  witnessPostalCode?: string;
  witnessCountry?: string;
  witnessInsuranceCompany?: string;
}
