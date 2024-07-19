import { FiltersType, defaultStatusFilter } from "../models/ecommerce-model";
import { DateFilters } from "../types/Ecommerce/Orders";

export const ORDER_SCROLL_DELAY_MS = 150;

export const DEFAULT_FILTERS_VALUES: FiltersType = {
  statusFilter: defaultStatusFilter,
  dateFilter: DateFilters.ALL,
  querySearch: "",
  amountFilter: { min: 0, max: 0 },
};
