import { FormAction } from "../consts/general-fields.consts";

export type HelpdeskBaseFormType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  supervisorEmail?: string;
  subject?: string;
  description?: string;
  priority?: HelpdeskPriority;
  department?: DepartmentOptions | "";
  attachmentFile?: string | null;
};

export type HelpdeskFormType = {
  action?: null | FormAction;
} & HelpdeskBaseFormType;

export enum DepartmentOptions {
  ADMINISTRATION = "Administration",
  FINANCE = "Finance",
  IT = "IT",
  DEVELOPMENT = "Development",
  DEVOPS = "DevOps",
  PROJECTMANAGEMENT = "Project Management",
  QA = "QA",
  UX_UI = "UX/UI",
}

export enum HelpdeskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  URGENT = "Urgent",
}
