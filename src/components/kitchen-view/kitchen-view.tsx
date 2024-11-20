import { KitchenOrder } from "../../types/Kitchen/Kitchen";
import KitchenOrderCard from "./partials/KitchenOrderCard";
import { KitchenOrderStatus } from "../../models/kitchen-model";

export default function KitchenView({
  orders,
  updatedOrders,
  handleUpdateOrderStatus,
}: {
  orders: KitchenOrder[];
  updatedOrders: Partial<KitchenOrder>[];
  handleUpdateOrderStatus: (
    orderNumber: number,
    status: KitchenOrderStatus
  ) => void;
}) {
  const ordersDivClasses =
    "grid gap-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] w-full";

  return (
    <div className={ordersDivClasses}>
      {orders.map((order) => {
        return (
          <KitchenOrderCard
            key={order.orderNumber}
            handleUpdateOrderStatus={handleUpdateOrderStatus}
            order={order}
            updatedValues={updatedOrders.find(
              (updatedOrder) => updatedOrder.orderNumber === order.orderNumber
            )}
          />
        );
      })}
    </div>
  );
}
