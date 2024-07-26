import {
  HelpdeskPriority,
  DepartmentOptions,
  HelpdeskAction,
} from "./helpdesk-model";

export const HelpdeskDescriptionContext = {
  action: `Allowed actions are ${Object.keys(HelpdeskAction).join(", ")} or null`,
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  supervisorEmail: "",
  subject: "",
  description: "",
  priority: `radio(${Object.values(HelpdeskPriority).join(", ")})`,
  attachmentFile: "optional()",
  department: `dropdown(${Object.values(DepartmentOptions).join(", ")})`,
};
