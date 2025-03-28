import {
  FormAction,
  GenderOptions,
  GenderOptionsOther,
} from "../consts/general-fields.consts";
import { DEFAULT_FILTERS_VALUES } from "../consts/patient-lookup.consts";
import { MedicalCondition } from "./patient-lookup-model";

export const DescriptionContext = {
  action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
  id: "Has to be string but CAN NOT be changed",
  fullName: "",
  dateOfBirth: "format(ISO date) confirmOrUpdate()",
  gender: `radio(${GenderOptions.join(", ")})`,
  contactNumber: "",
  emailAddress: "",
  homeAddress: "",
  emergencyContact: {
    name: "",
    relation: "",
    contactNumber: "",
  },
  medicalConditions: `radio(${Object.values(MedicalCondition).join(", ")})`,
};

export const PATIENT_LOOKUP_DESCRIPTION = `
Manage this electronic medical system panel to quickly get assistance for looking up patients. 
Help the doctor to filter patients. 
The default values for filters (for reseting): ${JSON.stringify(DEFAULT_FILTERS_VALUES)}
If user wants to update the patients, he needs to provide patient id and values to change.
Ignore the filter schema, refer to this schema to update patients instead: ${JSON.stringify(DescriptionContext)}.
The table should be an array containing all of the patients that user changes with only the changed values.
Don't ask the user to review or submit the form, it's not possible.
`;

export const FiltersDescriptionContext = {
  action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
  fullName: "",
  dateOfBirth: "format(ISO date) confirmOrUpdate()",
  gender: [`checkboxes(${GenderOptionsOther.join(", ")})`],
  contactNumber: "",
  emailAddress: "",
  homeAddress: "",
  emergencyContactNumber: "",
  emergencyContactRelation: "",
  emergencyContactName: "",
  medicalConditions: [
    `checkboxes(${Object.values(MedicalCondition).join(", ")})`,
  ],
};
