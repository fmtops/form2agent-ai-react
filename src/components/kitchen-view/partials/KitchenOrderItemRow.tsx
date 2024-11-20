import { KitchenOrder, KitchenOrderItem } from "../../../types/Kitchen/Kitchen";

export default function KitchenOrderItemRow({
  item,
}: {
  item: KitchenOrderItem;
}) {
  return (
    <span className="text-sm ">
      {item.name}:{" "}
      <span className="text-sm text-text-primary-light font-medium">
        {item.amount}x
      </span>
    </span>
  );
}
