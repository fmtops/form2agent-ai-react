import { forwardRef } from "react";
import { CustomerOrder } from "../../../models/customer-filter-model";
import { OrderProperty } from "../../ecommerce/order-card/order-property";

type OrderCardProps = {
  order: CustomerOrder;
  updatedValues?: Partial<CustomerOrder>;
};

const formatDate = (date: Date | null): string => {
  if (!date) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

const CustomerOrderCard = forwardRef<HTMLDivElement, OrderCardProps>(
  ({ order, updatedValues }, ref) => {
    return (
      <div
        ref={ref}
        className="flex justify-between p-4 border-b-[1px] border-b-border-primary-light"
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-1 flex-col text-sm text-text-secondary-light ">
            Customer id
            <div className="flex gap-2 items-center text-fg-secondary-light">
              <span className="text-sm text-text-primary-light font-medium">
                #{order.customerNumber}
              </span>
            </div>
          </div>
          <OrderProperty
            label="Customer"
            value={order.customerFirstName + " " + order.customerLastName}
            animate={Boolean(
              updatedValues?.customerFirstName ||
                updatedValues?.customerLastName
            )}
          />
          <OrderProperty
            label="State"
            value={order.state}
            animate={Boolean(updatedValues?.state)}
          />
        </div>
        <div className="flex flex-col text-right gap-3">
          <OrderProperty
            label="Date of last order"
            value={`${formatDate(order.dateOfLastOrder)}`}
            animate={Boolean(updatedValues?.dateOfLastOrder)}
          />
          <OrderProperty
            label="Orders"
            value={`${order.totalAmountOfOrders} ${
              order.totalAmountOfOrders === 1 ? "order" : "orders"
            }`}
            animate={Boolean(updatedValues?.totalAmountOfOrders)}
          />
          <OrderProperty
            label="Total"
            value={`$${order.totalValueOfOrders.toFixed(2)}`}
            animate={Boolean(updatedValues?.totalValueOfOrders)}
            spanClassname=" text-lg font-medium"
          />
        </div>
      </div>
    );
  }
);

CustomerOrderCard.displayName = "OrderCard";

export default CustomerOrderCard;
