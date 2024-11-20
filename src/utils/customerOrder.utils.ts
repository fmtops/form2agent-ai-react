import {
  CustomerFilterType,
  CustomerOrder,
} from "../models/customer-filter-model";
import { DateFilters } from "../types/Ecommerce/Orders";
import {
  isToday,
  isYesterday,
  isWithinLastWeek,
  isWithin30Days,
} from "./dates.utils";

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export const filterOrdersByDate = (
  orders: CustomerOrder[],
  dateFilter: DateFilters
) => {
  let newFilteredOrders = [...orders];
  switch (dateFilter) {
    case DateFilters.TODAY:
      newFilteredOrders = newFilteredOrders.filter((order) =>
        isToday(order.dateOfLastOrder.toISOString())
      );
      break;
    case DateFilters.YESTERDAY:
      newFilteredOrders = newFilteredOrders.filter((order) =>
        isYesterday(order.dateOfLastOrder.toISOString())
      );
      break;
    case DateFilters.LAST_7_DAYS:
      newFilteredOrders = newFilteredOrders.filter((order) =>
        isWithinLastWeek(order.dateOfLastOrder.toISOString())
      );
      break;
    case DateFilters.LAST_30_DAYS:
      newFilteredOrders = newFilteredOrders.filter((order) =>
        isWithin30Days(order.dateOfLastOrder.toISOString())
      );
      break;
    default:
      break;
  }
  return newFilteredOrders;
};

export const filterCustomerByQuery = (
  orders: CustomerOrder[],
  query: string
) => {
  return orders.filter(
    (order) =>
      order.customerLastName.toString().includes(query) ||
      order.customerFirstName.toLowerCase().includes(query.toLowerCase()) ||
      order.state.toLowerCase().includes(query.toLowerCase())
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
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export function generateCustomerOrders(): CustomerOrder[] {
  const orders: CustomerOrder[] = [];
  const maxAmountOfOrders = randomInt(100);
  for (let i = 0; i < maxAmountOfOrders + 1; i++) {
    orders.push(getOrder(i));
  }
  return orders;
}

function getDate(period: number, sinceDays: number) {
  const today = new Date();
  const maxDay = today.getTime() - sinceDays * 24 * 60 * 60 * 1000; // today - sinceDays
  const minDay = maxDay - period * 24 * 60 * 60 * 1000; // maxDay - period
  const randomDay = Math.random() * (maxDay - minDay) + minDay; // random day within the period
  return new Date(randomDay);
}

function getOrder(index: number): CustomerOrder {
  return {
    customerNumber: 1000 + index,
    customerFirstName: firstNames[randomInt(firstNames.length)],
    customerLastName: lastNames[randomInt(lastNames.length)],
    state: states[randomInt(states.length)],
    totalAmountOfOrders: randomInt(100),
    totalValueOfOrders: randomInt(1000),
    dateOfLastOrder: getDate(45, 0),
  };
}

export const filterCustomerOrders = (
  orders: CustomerOrder[],
  filters: CustomerFilterType
): CustomerOrder[] => {
  let newFilteredOrders: CustomerOrder[] = [...orders];
  newFilteredOrders = filterCustomerByQuery(
    newFilteredOrders,
    filters.querySearch
  );
  newFilteredOrders = filterOrdersByDate(
    newFilteredOrders,
    filters.dateOfLastOrder!
  );
  if (
    filters.totalAmountOfOrders.min !== 0 &&
    filters.totalAmountOfOrders.min
  ) {
    newFilteredOrders = newFilteredOrders.filter((order) => {
      return order.totalAmountOfOrders >= filters.totalAmountOfOrders.min!;
    });
  }
  if (
    filters.totalAmountOfOrders.max !== 0 &&
    filters.totalAmountOfOrders.max
  ) {
    newFilteredOrders = newFilteredOrders.filter((order) => {
      return order.totalAmountOfOrders <= filters.totalAmountOfOrders.max!;
    });
  }
  if (filters.totalValueOfOrders.min !== 0 && filters.totalValueOfOrders.min) {
    newFilteredOrders = newFilteredOrders.filter((order) => {
      return order.totalValueOfOrders >= filters.totalValueOfOrders.min!;
    });
  }
  if (filters.totalValueOfOrders.max !== 0 && filters.totalValueOfOrders.max) {
    newFilteredOrders = newFilteredOrders.filter((order) => {
      return order.totalValueOfOrders <= filters.totalValueOfOrders.max!;
    });
  }
  return newFilteredOrders;
};

export const updateCustomerFilters = (
  prevFilters: CustomerFilterType,
  newFilters: Partial<CustomerFilterType>
) => {
  return {
    ...prevFilters,
    ...newFilters,
  };
};
