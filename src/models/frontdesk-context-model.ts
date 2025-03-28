import { FrontdeskItemCategory, FrontdeskMenuItem } from "./frontdesk-model";

export const FrontdeskOrderDescriptionContext = {
  id: "Has to be number but CAN NOT be changed",
  amount: "Has to be number and can be changed, cannot be negative",
};

export const Menu: FrontdeskMenuItem[] = [
  {
    id: 1,
    name: "Espresso",
    description: "A strong and bold coffee shot.",
    price: 2.5,
    category: FrontdeskItemCategory.Coffee,
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "With steamed milk and foam.",
    price: 3.5,
    category: FrontdeskItemCategory.Coffee,
  },
  {
    id: 3,
    name: "Green Tea",
    description: "A refreshing green tea.",
    price: 2.0,
    category: FrontdeskItemCategory.Tea,
  },
  {
    id: 4,
    name: "Blueberry Muffin",
    description: "A delicious blueberry muffin.",
    price: 2.5,
    category: FrontdeskItemCategory.Pastry,
  },
  {
    id: 5,
    name: "Turkey Sandwich",
    description: "A sandwich with turkey, lettuce, and tomato.",
    price: 5.0,
    category: FrontdeskItemCategory.Sandwich,
  },
  {
    id: 6,
    name: "Latte",
    description: "With steamed milk.",
    price: 3.0,
    category: FrontdeskItemCategory.Coffee,
  },
  {
    id: 7,
    name: "Black Tea",
    description: "A classic black tea.",
    price: 1.5,
    category: FrontdeskItemCategory.Tea,
  },
  {
    id: 8,
    name: "Croissant",
    description: "A buttery, flaky pastry.",
    price: 2.0,
    category: FrontdeskItemCategory.Pastry,
  },
  {
    id: 9,
    name: "Ham Sandwich",
    description: "A sandwich with ham, cheese, and lettuce.",
    price: 4.5,
    category: FrontdeskItemCategory.Sandwich,
  },
  {
    id: 10,
    name: "Hot Chocolate",
    description: "A warm and rich hot chocolate.",
    price: 2.5,
    category: FrontdeskItemCategory.Other,
  },
];

export const CHAT_FRONTDESK_DESCRIPTION = `
Manage this menu panel to quickly get assistance with selecting menu items.
Help the user to choose menu items and their quantity.
If user wants to delete the item, set it amount to 0.
User can select items only from this menu ${JSON.stringify(Menu)}.
Refer to this schema to update order: ${JSON.stringify(FrontdeskOrderDescriptionContext)}.
Menu selections should be an array containing all of the items that the user changes with only the changed values.
Don't ask the user to review or submit the form, it's not possible.
`;
