import { DateFilters } from "../types/Ecommerce/Orders";
import { AmountFilterType } from "./ecommerce-model";

export const customerDefaultFilters: CustomerFilterType = {
  querySearch: "",
  totalAmountOfOrders: { min: null, max: null },
  totalValueOfOrders: { min: null, max: null },
  dateOfLastOrder: DateFilters.ALL,
};

export type CustomerFilterType = {
  querySearch: string;
  totalAmountOfOrders: AmountFilterType;
  totalValueOfOrders: AmountFilterType;
  dateOfLastOrder: DateFilters;
};

export type CustomerOrder = {
  customerNumber: number;
  customerFirstName: string;
  customerLastName: string;
  state: string;
  totalAmountOfOrders: number;
  totalValueOfOrders: number;
  dateOfLastOrder: Date;
};
