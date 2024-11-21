import { getDateFromISO, getTimeFromISO } from "../helpers/time-helper";
import { CarAccidentFormType } from "../models/car-accident-model";

export const CAR_ACCIDENT_FORM_VALUES: CarAccidentFormType = {
  action: null,
  time: getTimeFromISO(),
  date: getDateFromISO(),
  location: "",
  accidentDescription: "",
  firstName: "",
  lastName: "",
  age: "",
  phone: "",
  firstNameFamilyGuardian: "",
  lastNameFamilyGuardian: "",
  ageFamilyGuardian: "",
  phoneNumberFamilyGuardian: "",
  firstNameOfficer: "",
  lastNameOfficer: "",
  badgeNumber: "",
  phoneOfficer: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleLicensePlate: "",
  vehicleYear: "",
  vehicleColor: "",
  vehicleInsuranceCompany: "",
  witnessName: "",
  witnessPhone: "",
  witnessAddress: "",
  witnessCity: "",
  witnessState: "",
  witnessPostalCode: "",
  witnessCountry: "",
  witnessInsuranceCompany: "",
};