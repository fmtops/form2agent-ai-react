import { KitchenOrderStatus } from "../models/kitchen-model";
import { KitchenOrder } from "../types/Kitchen/Kitchen";

export const KitchenOrders: KitchenOrder[] = [
  {
    orderNumber: 1,
    status: KitchenOrderStatus.Pending,
    customerName: "John Doe",
    instructions: "No onions, extra ketchup",
    items: [
      {
        name: "Cheeseburger",
        amount: 1,
        id: 1,
      },
      {
        name: "Fries",
        amount: 2,
        id: 2,
      },
    ],
  },
  {
    orderNumber: 2,
    status: KitchenOrderStatus.InProgress,
    customerName: "Jane Doe",
    instructions: "No pickles",
    items: [
      {
        name: "Chicken Sandwich",
        amount: 1,
        id: 1,
      },
      {
        name: "Onion Rings",
        amount: 1,
        id: 2,
      },
    ],
  },
  {
    orderNumber: 3,
    status: KitchenOrderStatus.Completed,
    customerName: "John Smith",
    instructions: "Extra mayo",
    items: [
      {
        name: "Double Cheeseburger",
        amount: 1,
        id: 1,
      },
      {
        name: "Fries",
        amount: 1,
        id: 2,
      },
    ],
  },
  {
    orderNumber: 4,
    status: KitchenOrderStatus.Pending,
    customerName: "Jane Doe",
    instructions: "No tomatoes, extra cheese",
    items: [
      {
        name: "Veggie Burger",
        amount: 1,
        id: 1,
      },
      {
        name: "Sweet Potato Fries",
        amount: 1,
        id: 2,
      },
    ],
  },
  {
    orderNumber: 5,
    status: KitchenOrderStatus.InProgress,
    customerName: "Alice Brown",
    instructions: "No lettuce",
    items: [
      {
        name: "Chicken Sandwich",
        amount: 2,
        id: 1,
      },
      {
        name: "Fries",
        amount: 1,
        id: 2,
      },
    ],
  },
  {
    orderNumber: 6,
    status: KitchenOrderStatus.Completed,
    customerName: "Bob Johnson",
    instructions: "Extra pickles",
    items: [
      {
        name: "Cheeseburger",
        amount: 1,
        id: 1,
      },
      {
        name: "Onion Rings",
        amount: 1,
        id: 2,
      },
    ],
  },
  {
    orderNumber: 7,
    status: KitchenOrderStatus.Pending,
    customerName: "Charlie Davis",
    instructions: "No onions, extra ketchup",
    items: [
      {
        name: "Cheeseburger",
        amount: 1,
        id: 1,
      },
      {
        name: "Fries",
        amount: 2,
        id: 2,
      },
    ],
  },
];
