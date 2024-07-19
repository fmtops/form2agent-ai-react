import { Order, DateFilters, OrderStatus } from "../types/Ecommerce/Orders";
import {
  isToday,
  isYesterday,
  isWithinLastWeek,
  isWithin30Days,
} from "../utils/dates.utils";
import { FiltersType } from "../models/ecommerce-model";

export const filterOrdersByDate = (
  orders: Order[],
  dateFilter: DateFilters
) => {
  let newFilteredOrders = [...orders];
  switch (dateFilter) {
    case DateFilters.TODAY:
      newFilteredOrders = newFilteredOrders.filter((order) =>
        isToday(order.orderDate)
      );
      break;
    case DateFilters.YESTERDAY:
      newFilteredOrders = newFilteredOrders.filter((order) =>
        isYesterday(order.orderDate)
      );
      break;
    case DateFilters.LAST_7_DAYS:
      newFilteredOrders = newFilteredOrders.filter((order) =>
        isWithinLastWeek(order.orderDate)
      );
      break;
    case DateFilters.LAST_30_DAYS:
      newFilteredOrders = newFilteredOrders.filter((order) =>
        isWithin30Days(order.orderDate)
      );
      break;
    default:
      break;
  }
  return newFilteredOrders;
};

export const filterOrdersByNumberOrCustomer = (
  orders: Order[],
  query: string
) => {
  return orders.filter(
    (order) =>
      order.order_number.toString().includes(query) ||
      order.customer_name.toLowerCase().includes(query.toLowerCase())
  );
};

const firstNames = [
  "John",
  "Jane",
  "David",
  "Emily",
  "Sarah",
  "Michael",
  "Jessica",
  "Christopher",
  "Ashley",
  "Matthew",
  "Jennifer",
  "Daniel",
  "Elizabeth",
  "Joseph",
  "Megan",
  "Brian",
  "Amanda",
  "William",
  "Lisa",
  "Robert",
  "Mary",
  "James",
  "Linda",
  "Thomas",
  "Barbara",
];
const lastNames = [
  "Smith",
  "Doe",
  "Lee",
  "Brown",
  "Jones",
  "Davis",
  "Wilson",
  "Rodriguez",
  "Williams",
  "Garcia",
  "Martinez",
  "Anderson",
  "Thomas",
  "Miller",
  "Wilson",
  "Rodriguez",
  "Garcia",
  "Jones",
  "Miller",
  "Davis",
];

export function generateOrders(): Order[] {
  const orders: Order[] = [];

  // Generate today's orders
  for (let i = 0; i < 12; i++) {
    orders.push(getOrder(i, orders.length, 0, 0));
  }

  // Generate yesterday's orders
  for (let i = 0; i < 12; i++) {
    orders.push(getOrder(i, orders.length, 0, 1));
  }
  // Generate last 7 days orders
  for (let i = 0; i < 12; i++) {
    orders.push(getOrder(i, orders.length, 5, 2));
  }

  // Generate last 30 days orders
  for (let i = 0; i < 12; i++) {
    orders.push(getOrder(i, orders.length, 21, 7));
  }

  // Generate remaining orders from the last 40 days
  for (let i = 0; i < 12; i++) {
    orders.push(getOrder(i, orders.length, 30, 30));
  }

  return orders;
}

function getStatus(index: number) {
  return Object.values(OrderStatus)[index % 4];
}

function getDate(period: number, sinceDays: number) {
  const today = new Date();
  const maxDay = today.getTime() - sinceDays * 24 * 60 * 60 * 1000; // today - sinceDays
  const minDay = maxDay - period * 24 * 60 * 60 * 1000; // maxDay - period
  const randomDay = Math.random() * (maxDay - minDay) + minDay; // random day within the period
  return new Date(randomDay).toISOString();
}

function getOrder(
  index: number,
  ordersLength: number,
  period: number,
  sinceDays: number
) {
  return {
    order_number: 1000 + ordersLength,
    status: getStatus(index),
    cost: parseFloat((Math.random() * 1000).toFixed(2)),
    discount: Math.floor(Math.random() * 21),
    customer_name: `${
      firstNames[Math.floor(Math.random() * firstNames.length)]
    } ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    item_count: Math.floor(Math.random() * 20) + 1,
    orderDate: getDate(period, sinceDays),
    order_note: index % 2 === 0 ? "Please wrap in gift paper" : undefined,
  };
}

export const dateFilterEnumToLabel = (dateFilter: DateFilters) => {
  switch (dateFilter) {
    case DateFilters.TODAY:
      return "Today";
    case DateFilters.YESTERDAY:
      return "Yesterday";
    case DateFilters.LAST_7_DAYS:
      return "Last 7 days";
    case DateFilters.LAST_30_DAYS:
      return "Last 30 days";
    default:
      return "All";
  }
};

export const dateFilterLabelToEnum = (label: string) => {
  switch (label) {
    case "Today":
      return DateFilters.TODAY;
    case "Yesterday":
      return DateFilters.YESTERDAY;
    case "Last 7 days":
      return DateFilters.LAST_7_DAYS;
    case "Last 30 days":
      return DateFilters.LAST_30_DAYS;
    default:
      return DateFilters.ALL;
  }
};

export const filterOrders = (
  orders: Order[],
  filters: FiltersType
): Order[] => {
  let newFilteredOrders: Order[] = [...orders];
  newFilteredOrders = newFilteredOrders.filter((order) =>
    filters.statusFilter.includes(order.status)
  );
  newFilteredOrders = filterOrdersByDate(newFilteredOrders, filters.dateFilter);
  newFilteredOrders = filterOrdersByNumberOrCustomer(
    newFilteredOrders,
    filters.querySearch
  );
  if (filters.amountFilter.min !== 0 && filters.amountFilter.min) {
    newFilteredOrders = newFilteredOrders.filter((order) => {
      return order.cost - order.discount >= filters.amountFilter.min!;
    });
  }
  if (filters.amountFilter.max !== 0 && filters.amountFilter.max) {
    newFilteredOrders = newFilteredOrders.filter((order) => {
      return order.cost - order.discount <= filters.amountFilter.max!;
    });
  }
  return newFilteredOrders;
};

export const updateFilters = (
  prevFilters: FiltersType,
  newFilters: Partial<FiltersType>
) => {
  return {
    ...prevFilters,
    ...newFilters,
  };
};
