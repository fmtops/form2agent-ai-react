export interface AddItemType {
  id?: string;
  amount: number;
  price: number;
  name: string;
  barcode: string;
  image: string | null;
}

export const defaultAddItemTypeValue: AddItemType = {
  id: undefined,
  amount: 0,
  price: 0,
  name: "",
  barcode: "",
  image: null,
};
