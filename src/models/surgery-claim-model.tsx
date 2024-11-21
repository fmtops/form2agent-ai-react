import { FormAction } from "../consts/general-fields.consts";

export type SurgeryClaimBaseFormType = {
  patientInfo: SurgeryPatientPersonalDataFormType;
  medicalAdmission: SurgeryMedicalAdmissionFormType;
  anesthesia: SurgeryAnesthesiaFormType;
  surgeryDetails: SurgeryDetailsFormType;
  claimSubmissionDetails: SubmissionDetailsFormType;
};

export type SyrgeryClaimFormType = {
  action: FormAction | null;
  pageIndex: number;
} & SurgeryClaimBaseFormType;

export enum SurgeryPageIndex {
  PatientInfo = "PatientInfo",
  MedicalAdmission = "MedicalAdmission",
  Anethesia = "Anethesia",
  SurgeryDetail = "Details",
  ClaimSubmissionDetail = "ClaimSubmissionDetail",
}

export type SurgeryPatientPersonalDataFormType = {
  fullName?: string;
  indentifier?: string;
  dateOfBirth?: string;
  gender?: string;
  homeAddress?: string;
  insuranceProvider?: string;
  policyNumber?: string;
  claimReferenceNumber?: string;
};

export type SurgeryMedicalAdmissionFormType = {
  hospitalAdmissionDate?: string;
  surgeryDate?: string;
  dateOfDischarge?: string;
  followUpDate?: string;
  bodyWeight?: string;
  height?: string;
  medicalCenter?: string;
  leadSurgeon?: string;
};

export type SurgeryAnesthesiaFormType = {
  anesthesiaType?: string;
  anestheologistName?: string;
  assistantName?: string;
  additionalSupportStaff?: string;
};

export type SurgeryDetailsFormType = {
  primaryProcedure?: string;
  additionalProcedures?: string;
};

export type SubmissionDetailsFormType = {
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  additionalNotes?: string;
};
