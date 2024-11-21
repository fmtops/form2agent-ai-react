import { KitchenOrderStatus } from "../../models/kitchen-model";

export type KitchenOrderItem = {
  id: number;
  name: string;
  amount: number;
};

export type KitchenOrder = {
  orderNumber: number;
  status: KitchenOrderStatus;
  customerName: string;
  instructions: string;
  orderNote?: string;
  items: KitchenOrderItem[];
};
