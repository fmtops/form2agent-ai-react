import {
  FiltersType,
  MedicalCondition,
  PatientLookupFormType,
} from "../models/patient-lookup-model";
import { GenderOptionsOther } from "./general-fields.consts";

export const PATIENT_LOOKUP_FORM_VALUES: PatientLookupFormType = {
  action: null,
  fullName: "",
  dateOfBirth: "",
  gender: "",
  contactNumber: "",
  emailAddress: "",
  homeAddress: "",
  emergencyContact: {
    name: "",
    relation: "",
    contactNumber: "",
  },
  medicalCondition: "",
};
export const defaultGenderFilter = [...Object.values(GenderOptionsOther)];
export const defaultMedicalFilter = [...Object.values(MedicalCondition)];

export const DEFAULT_FILTERS_VALUES: FiltersType = {
  fullName: "",
  dateOfBirth: "",
  gender: defaultGenderFilter,
  contactNumber: "",
  emailAddress: "",
  homeAddress: "",
  emergencyContactName: "",
  emergencyContactRelation: "",
  emergencyContactNumber: "",
  medicalCondition: defaultMedicalFilter,
};
