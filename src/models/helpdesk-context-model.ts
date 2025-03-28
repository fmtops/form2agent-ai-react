import { FormAction } from "../consts/general-fields.consts";
import { HelpdeskPriority, DepartmentOptions } from "./helpdesk-model";

export const HelpdeskDescriptionContext = {
  action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  supervisorEmail: "",
  subject: "",
  description: "",
  priority: `radio(${Object.values(HelpdeskPriority).join(", ")})`,
  attachmentFile: "file()",
  department: `dropdown(${Object.values(DepartmentOptions).join(", ")})`,
};
