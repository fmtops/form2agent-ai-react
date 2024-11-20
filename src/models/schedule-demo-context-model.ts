import { ScheduleDemoAction } from "./schedule-demo-model";

export const ScheduleDemoDescriptionContext = {
  action: `Allowed actions are ${Object.keys(ScheduleDemoAction).join(", ")} or null`,
  firstName: "",
  email: "",
  company: "",
  projectDetails: "Details of the project the user wants to discuss",
};
