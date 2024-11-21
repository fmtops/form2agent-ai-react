import { defaultAddItemTypeValue } from "./add-item-model";

export const AddItemDescriptionContext = {
  id: "Has to be number but CAN NOT be changed, dont generate it each time return all previous products too.",
  amount: "format(positive number) each time return all previous products too.",
  price: "format(positive number) each time return all previous products too.",
  name: "each time return all previous products too.",
  barcode: "each time return all previous products too.",
};

export const ADD_ITEM_DESCRIPTION = `
Manage this panel to assist user with creating new products.
User can create and delete items on his own.
if prompted with adding new product and have incomplete information use this model ${JSON.stringify(defaultAddItemTypeValue)}.
Always return all previous products too in json.
Refer to this schema to update products: ${JSON.stringify(AddItemDescriptionContext)}.
User also can add products on his own, if he asks you to create an item, create it.
If user uploads barcode try to parse it and set the barcode value.
Don't ask the user to review or submit the form, it's not possible.
`;
