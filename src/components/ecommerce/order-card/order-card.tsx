import { Order } from "../../../types/Ecommerce/Orders";
import { StyledToolTip } from "../../common/mui-styled/styled-tooltip";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import OrderStatus from "./order-status";
import { formatDate } from "../../../utils/dates.utils";
import { forwardRef } from "react";
import { FormProperty } from "../../common/form/form-property";

type OrderCardProps = {
  order: Order;
  updatedValues?: Partial<Order>;
};

const OrderCard = forwardRef<HTMLDivElement, OrderCardProps>(
  ({ order, updatedValues }, ref) => {
    return (
      <div
        ref={ref}
        className="flex justify-between p-4 border-b-[1px] border-b-border-primary-light"
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-1 flex-col text-sm text-text-secondary-light ">
            Order
            <div className="flex gap-2 items-center text-fg-secondary-light">
              <span className="text-sm text-text-primary-light font-medium">
                #{order.order_number} • {formatDate(order.orderDate)}
              </span>
              {order.order_note && (
                <StyledToolTip placement="top" title={order.order_note}>
                  <ChatBubbleOutlineIcon
                    className={`${
                      Boolean(updatedValues?.order_note)
                        ? "animate-pulse text-text-brand-light"
                        : ""
                    }`}
                  />
                </StyledToolTip>
              )}
            </div>
          </div>
          <FormProperty
            label="Customer"
            value={order.customer_name}
            animate={Boolean(updatedValues?.customer_name)}
          />
          <FormProperty
            label="Items"
            value={`${order.item_count} ${
              order.item_count === 1 ? "item" : "items"
            }`}
            animate={Boolean(updatedValues?.item_count)}
          />
        </div>
        <div className="flex flex-col text-right gap-3">
          <FormProperty
            label="Discount"
            value={`${order.discount !== 0 ? "-" : ""}$${Math.abs(
              order.discount
            )}`}
            animate={Boolean(updatedValues?.discount)}
          />

          <FormProperty
            label="Total"
            value={`$${(order.cost - Math.abs(order.discount)).toFixed(2)}`}
            animate={Boolean(updatedValues?.discount || updatedValues?.cost)}
            spanClassname=" text-lg font-medium"
          />
          <OrderStatus
            animate={Boolean(updatedValues?.status)}
            status={order.status}
          />
        </div>
      </div>
    );
  }
);

OrderCard.displayName = "OrderCard";

export default OrderCard;
