import { FormAction } from "../consts/general-fields.consts";

export const DescriptionContext = {
  action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
  rooms: [
    {
      name: "each time rooms are used, return all previous rooms too. if prompted with adding new item and have incomplete information, mark remaining fields with empty values and prompt user to fill them.",
      size: "each time rooms are used, return all previous rooms too, provide only numeric value, cut any currency symbols or other characters.",
      conditionDescription:
        "each time rooms are used, return all previous rooms too",
      roomPhoto: "each time rooms are used, return all previous rooms too",
    },
  ],
};
