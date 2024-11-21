export enum FrontdeskItemCategory {
  Coffee = "Coffee",
  Tea = "Tea",
  Pastry = "Pastry",
  Sandwich = "Sandwich",
  Other = "Other",
}

export interface FrontdeskMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: FrontdeskItemCategory;
}

export interface FrontdeskOrderItem {
  id: number;
  amount: number;
  item: FrontdeskMenuItem;
}
