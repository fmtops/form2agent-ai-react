import { FormAction } from "../consts/general-fields.consts";

// List of Medical Conditions
export enum MedicalCondition {
  Diabetes = "Diabetes",
  Hypertension = "Hypertension",
  Asthma = "Asthma",
  Allergies = "Allergies",
  Other = "Other",
}

// Type for Emergency Contact Information
export type EmergencyContactInfo = {
  name: string;
  relation: string;
  contactNumber: string;
};

// Type for Patient Information
export type PatientLookupBaseFormType = {
  id?: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  emailAddress: string;
  homeAddress: string;
  emergencyContact: EmergencyContactInfo;
  medicalCondition: string;
};

export type PatientLookupFormType = {
  action?: null | FormAction;
} & PatientLookupBaseFormType;

export type FiltersType = {
  fullName: string;
  dateOfBirth: string;
  gender: string[];
  contactNumber: string;
  emailAddress: string;
  homeAddress: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactNumber: string;
  medicalCondition: MedicalCondition[];
};
