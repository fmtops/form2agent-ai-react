import { DateFilters, OrderStatus } from "../types/Ecommerce/Orders";
import { dateFilterEnumToLabel } from "../utils/orders.utils";
import { defaultFilters } from "./ecommerce-model";

export const OrderDescriptionContext = {
  order_number: "Has to be number but CAN NOT be changed",
  status: `dropdown(${Object.values(OrderStatus)})`,
  cost: "number",
  discount: "number",
  customer_name: "",
  item_count: "",
  orderDate: "",
  order_note: "If not provided set to null",
};

export const CHAT_ECOMMERCE_DESCRIPTION = `
Manage this orders panel to quickly get assistance for ecommerce orders. 
Help the user to filter orders by status, date, amount, and search query. 
The default values for filters (for reseting): ${JSON.stringify(defaultFilters)}
If user wants to update the orders, he needs to provide order numbers and values to change.
Ignore the filter schema, refer to this schema to update orders instead: ${JSON.stringify(OrderDescriptionContext)}.
Orders should be an array containing all of the orders that user changes with only the changed values.
Don't ask the user to review or submit the form, it's not possible.
`;

export const FiltersDescriptionContext = {
  statusFilter: `checkboxes(${Object.values(OrderStatus).join(", ")})`,
  dateFilter: `radio(${Object.values(DateFilters)
    .map((filterEnum) => dateFilterEnumToLabel(filterEnum))
    .join(", ")})`,
  querySearch: "Search is done by order number or customer name",
  amountFilter: { min: "", max: "" },
};
