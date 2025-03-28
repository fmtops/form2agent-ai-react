import { FormAction } from "../consts/general-fields.consts";
import { BasicRoom } from "../consts/house-inspection.consts";

export const DescriptionContext = {
  action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
  rooms: [
    {
      id: "each time rooms are used, return all previous rooms too, cannot be changed. For newly added rooms, set to random unique guid",
      name: "each time rooms are used, return all previous rooms too. if prompted with adding new item and have incomplete information, mark remaining fields with empty values and prompt user to fill them.",
      size: "each time rooms are used, return all previous rooms too, provide only numeric value, cut any currency symbols or other characters.",
      conditionDescription:
        "each time rooms are used, return all previous rooms too",
      roomPhoto:
        "file(), each time rooms are used, return all previous rooms too",
    },
  ],
};

export const ROOM_FORM_DESCRIPTION = `
Manage this panel to assist user with having room inspections.
User can create and delete rooms on his own.
if prompted with adding new rooms and have incomplete information use this model ${JSON.stringify(BasicRoom)}.
Always return all previous rooms too in json.
User also can add rooms on his own, if he asks you to create a room, create it.
`;
