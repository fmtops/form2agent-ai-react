import { DateFilters } from "../types/Ecommerce/Orders";
import { dateFilterEnumToLabel } from "../utils/orders.utils";
import { customerDefaultFilters } from "./customer-filter-model";

export const CustomerOrderDescriptionContext = {
  customerNumber: "Has to be number but CAN NOT be changed",
  customerFirstName: "can not be changed",
  customerLastName: "can not be changed",
  state: "can not be changed",
  totalAmountOfOrders: "number",
  totalValueOfOrders: "number",
  dateOfLastOrder: "number, can not be changed",
};

export const CUSTOMER_FILTERS_DESCRIPTION = `
Manage this orders panel to quickly get assistance for customers. 
Help the user to filter orders by . 
The default values for filters (for reseting): ${JSON.stringify(customerDefaultFilters)}
If user wants to update the orders, he needs to provide customerNumber and values to change.
Ignore the filter schema, refer to this schema to update orders instead: ${JSON.stringify(CustomerOrderDescriptionContext)}.
Orders should be an array containing all of the orders that user changes with only the changed values.
Don't ask the user to review or submit the form, it's not possible.
`;

export const CustomerFiltersDescriptionContext = {
  querySearch: "",
  totalAmountOfOrders: { min: "", max: "" },
  totalValueOfOrders: { min: "", max: "" },
  dateOfLastOrder: `radio(${Object.values(DateFilters)
    .map((filterEnum) => dateFilterEnumToLabel(filterEnum))
    .join(", ")})`,
};
