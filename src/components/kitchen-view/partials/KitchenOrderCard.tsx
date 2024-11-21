import { StyledToolTip } from "../../common/mui-styled/styled-tooltip";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { KitchenOrder } from "../../../types/Kitchen/Kitchen";
import { OrderProperty } from "../../ecommerce/order-card/order-property";
import KitchenOrderStatusChip from "./KitchenOrderStatusChip";
import KitchenOrderItemRow from "./KitchenOrderItemRow";
import SubmitButton from "../../common/form/submit-button";
import { KitchenOrderStatus } from "../../../models/kitchen-model";

export default function KitchenOrderCard({
  order,
  updatedValues,
  handleUpdateOrderStatus,
}: {
  order: KitchenOrder;
  updatedValues?: Partial<KitchenOrder>;
  handleUpdateOrderStatus: (
    orderNumber: number,
    status: KitchenOrderStatus
  ) => void;
}) {
  const onUpdateClick = () => {
    if (order.status === KitchenOrderStatus.Pending) {
      handleUpdateOrderStatus(order.orderNumber, KitchenOrderStatus.InProgress);
    } else if (order.status === KitchenOrderStatus.InProgress) {
      handleUpdateOrderStatus(order.orderNumber, KitchenOrderStatus.Completed);
    }
  };

  const getButtonValue = () => {
    if (order.status === KitchenOrderStatus.Pending) {
      return "Start";
    } else if (order.status === KitchenOrderStatus.InProgress) {
      return "Complete";
    }
    return "";
  };

  return (
    <div className="flex justify-between p-4 rounded-sm border-[1px] border-border-primary-light">
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 flex-col text-sm text-text-secondary-light ">
          Order
          <div className="flex gap-2 items-center text-fg-secondary-light">
            <span className="text-sm text-text-primary-light font-medium">
              #{order.orderNumber}
            </span>
            {order.orderNote && (
              <StyledToolTip placement="top" title={order.orderNote}>
                <ChatBubbleOutlineIcon
                  className={`${
                    Boolean(updatedValues?.orderNote)
                      ? "animate-pulse text-text-brand-light"
                      : ""
                  }`}
                />
              </StyledToolTip>
            )}
          </div>
        </div>
        <OrderProperty
          label="Customer"
          value={order.customerName}
          animate={Boolean(updatedValues?.customerName)}
        />
        <OrderProperty
          label="Instructions"
          value={order.instructions}
          animate={Boolean(updatedValues?.instructions)}
        />
        <OrderProperty
          label="Additional Notes"
          value={order.orderNote ?? "None"}
          animate={Boolean(updatedValues?.orderNote)}
        />

        {order.status !== KitchenOrderStatus.Completed && (
          <SubmitButton
            className="mt-4"
            value={getButtonValue()}
            onClick={onUpdateClick}
          />
        )}
      </div>
      <div className="flex flex-col text-right gap-3">
        <KitchenOrderStatusChip
          animate={Boolean(updatedValues?.status)}
          status={order.status}
        />
        <div
          className={`flex gap-1 flex-col text-sm text-text-secondary-light`}
        >
          Items
          {order.items.map((item) => (
            <KitchenOrderItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
