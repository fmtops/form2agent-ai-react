import {
  FormAction,
  GenderOptions,
  GenderOptionsExtended,
} from "../consts/general-fields.consts";
import { TreatmentCenters } from "../consts/patient-registration.consts";
import {
  SurgeryClaimBaseFormType,
  SurgeryPageIndex,
} from "./surgery-claim-model";

export type SurgeryClaimContextFormType = SurgeryClaimBaseFormType & {
  action: string | null;
  pageIndex: number;
};

export const InsuranceProviders = [
  "Aetna",
  "Anthem",
  "Blue Cross Blue Shield",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "UnitedHealthcare",
];

export const AnesthesiaTypes = [
  "General",
  "Local",
  "Regional",
  "Monitored Anesthesia Care (MAC)",
];

export const AnestheseologistNames = [
  "Dr. John Doe",
  "Dr. Jane Doe",
  "Dr. Michael Smith",
  "Dr. Sarah Johnson",
];

export const SurgicalAssistantNames = [
  "Dr. John Doe",
  "Dr. Jane Doe",
  "Dr. Michael Smith",
  "Dr. Sarah Johnson",
];

export const AdditionalSupportStaff = [
  "Nurse",
  "Surgical Technologist",
  "Anesthesia Technologist",
  "Nurse Anesthetist",
];

export const SurgicalProcedures = [
  "Laparoscopic Cholecystectomy",
  "Laparoscopic Appendectomy",
  "Laparoscopic Hernia Repair",
  "Laparoscopic Nissen Fundoplication",
];

export const SurgeryClaimContext = {
  action: `Invisible field. Fill only when user says one of the following: ${Object.keys(FormAction).join(", ")} or null.`,
  pageIndex: `Page number. Set according to currently reached section: 
    ${Object.keys(SurgeryPageIndex)
      .map((key, index) => `${index + 1} = ${key}`)
      .join(", ")}.`,
  patientInfo: {
    fullName: "",
    indentifier: "",
    dateOfBirth: "",
    gender: `radio(${GenderOptionsExtended.join(", ")})`,
    homeAddress: "",
    insuranceProvider: `radio(${InsuranceProviders.join(", ")})`,
    policyNumber: "",
    claimReferenceNumber: "",
  },
  medicalAdmission: {
    hospitalAdmissionDate: "",
    surgeryDate: "",
    dateOfDischarge: "",
    followUpDate: "",
    bodyWeight: "",
    height: "",
    medicalCenter: `dropdown(${TreatmentCenters.join(", ")})`,
    leadSurgeon: "",
  },
  anesthesia: {
    anesthesiaType: `radio(${AnesthesiaTypes.join(", ")})`,
    anestheologistName: `radio(${AnestheseologistNames.join(", ")})`,
    assistantName: `radio(${SurgicalAssistantNames.join(", ")})`,
    additionalSupportStaff: `radio(${AdditionalSupportStaff.join(", ")})`,
  },
  surgeryDetails: {
    primaryProcedure: `radio(${SurgicalProcedures.join(", ")})`,
    additionalProcedures: "",
  },
  claimSubmissionDetails: {
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhone: "format(+1-222-222-2222)",
    additionalNotes: "optional(), end of form",
  },
};

export const SurgeryClaimSteps: string[] = [
  "Patient Data",
  "Medical Admission",
  "Anesthesia Information",
  "Details",
  "Submission Details",
];

export const SURGERY_CLAIM_FORM_VALUES: SurgeryClaimContextFormType = {
  action: null,
  pageIndex: 1,
  patientInfo: {
    fullName: "",
    indentifier: "",
    dateOfBirth: "",
    gender: "",
    homeAddress: "",
    insuranceProvider: "",
    policyNumber: "",
    claimReferenceNumber: "",
  },
  medicalAdmission: {
    hospitalAdmissionDate: "",
    surgeryDate: "",
    dateOfDischarge: "",
    followUpDate: "",
    bodyWeight: "",
    height: "",
    medicalCenter: "",
    leadSurgeon: "",
  },
  anesthesia: {
    anesthesiaType: "",
    anestheologistName: "",
    assistantName: "",
    additionalSupportStaff: "",
  },
  surgeryDetails: {
    primaryProcedure: "",
    additionalProcedures: "",
  },
  claimSubmissionDetails: {
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    additionalNotes: "",
  },
};
