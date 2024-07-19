import { DateFilters, OrderStatus } from "../types/Ecommerce/Orders";
import { dateFilterEnumToLabel } from "../utils/orders.utils";
import { defaultFilters } from "./ecommerce-model";

export const OrderDescriptionContext = {
  order_number: "Has to be number but CAN NOT be changed",
  status: `Has to be one of the following: ${Object.values(OrderStatus)}`,
  cost: "number",
  discount: "number",
  customer_name: "",
  item_count: "",
  orderDate: "",
  order_note: "If not provided set to null",
};

export const CHAT_ECOMMERCE_DESCRIPTION = `
Manage this orders panel to quickly get assistance for Ecommerce orders. By filtering and updating current orders.
If asked for search/look/find for use querySearch filter.
The default values for filters if asked for reseting: ${JSON.stringify(
  defaultFilters
)}
If user wants to update the orders he needs to provide order number and value to change which has to be: ${JSON.stringify(
  OrderDescriptionContext
)}
Orders should be an array containing all of the orders that user changes with values only changed.
`;

export const FiltersDescriptionContext = {
  statusFilter: `Status has to be array of the following values: ${Object.values(
    OrderStatus
  ).join(", ")}`,
  dateFilter: `Date has to be one of the following: ${Object.values(DateFilters)
    .map((filterEnum) => dateFilterEnumToLabel(filterEnum))
    .join(", ")}`,
  querySearch: "Search is done by order number or customer name",
  amountFilter: { min: "", max: "" },
};
