import {
  HelpdeskPriority,
  DepartmentOptions,
  HelpdeskAction,
} from "./helpdesk-model";

export const HelpdeskDescriptionContext = {
  action: `Invisible field to perform some action/click/asks to do smth set this field to the action name - allowed actions are ${Object.keys(HelpdeskAction).join(", ")} or null`,
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  supervisorEmail: "",
  subject: "",
  description: "",
  priority: `Priority has to be one of the following: ${Object.values(
    HelpdeskPriority
  ).join(", ")}`,
  attachmentFile: "Optional attachment",
  department:
    "Department has to be one of the following: " +
    Object.values(DepartmentOptions).join(", "),
};
