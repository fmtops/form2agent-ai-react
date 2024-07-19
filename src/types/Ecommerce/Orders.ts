export enum OrderStatus {
  Pending = "Pending",
  Shipping = "Shipping",
  Delivered = "Delivered",
  Canceled = "Canceled",
}

export enum DateFilters {
  ALL = "all",
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST_7_DAYS = "last7days",
  LAST_30_DAYS = "last30days",
}

export type Order = {
  order_number: number;
  status: OrderStatus;
  cost: number;
  discount: number;
  customer_name: string;
  item_count: number;
  orderDate: string;
  order_note?: string;
};
