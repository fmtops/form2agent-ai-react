import { KitchenOrderStatus } from "./kitchen-model";

export const KitchenOrderDescriptionContext = {
  orderNumber: "Has to be number but CAN NOT be changed",
  status: `dropdown(${Object.values(KitchenOrderStatus)})`,
  customerName: "",
  instructions: "",
  orderNote: "If not provided set to null",
  items: [
    {
      name: "each time items are used, return all previous items too. if prompted with adding new item and have incomplete information, mark remaining fields with empty values and prompt user to fill them.",
      amount: "each time items are used, return all previous items too",
    },
  ],
};
export const CHAT_KITCHEN_DESCRIPTION = `
Manage this orders panel to quickly get assistance for kitchen orders. 
Help the user to update order statuses. 
If user wants to update the orders, he needs to provide order numbers and values to change.
Refer to this schema to update orders instead: ${JSON.stringify(KitchenOrderDescriptionContext)}.
Orders should be an array containing all of the orders that user changes with only the changed values.
Don't ask the user to review or submit the form, it's not possible.
`;
