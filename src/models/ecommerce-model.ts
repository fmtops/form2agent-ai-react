import { DateFilters, OrderStatus } from "../types/Ecommerce/Orders";

export const defaultStatusFilter = [...Object.values(OrderStatus)];

export const defaultFilters = {
  statusFilter: defaultStatusFilter,
  dateFilter: DateFilters.ALL,
  querySearch: "",
  amountFilter: { min: 0, max: 0 },
};

export type AmountFilterType = {
  min: number | null;
  max: number | null;
};

export type FiltersType = {
  statusFilter: OrderStatus[];
  dateFilter: DateFilters;
  querySearch: string;
  amountFilter: AmountFilterType;
};
