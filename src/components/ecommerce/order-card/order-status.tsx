import { OrderStatus as OrderStatusEnum } from "../../../types/Ecommerce/Orders";
import { Chip } from "@mui/material";

export default function OrderStatus({
  status,
  animate,
}: {
  status: OrderStatusEnum;
  animate?: boolean;
}) {
  const bgColor = (() => {
    switch (status) {
      case OrderStatusEnum.Shipping:
        return animate ? "#C2410C" : "#F97316";
      case OrderStatusEnum.Delivered:
        return animate ? "#047857" : "#10B981";
      case OrderStatusEnum.Canceled:
        return animate ? "#B91C1C" : "#EF4444";

      case OrderStatusEnum.Pending:
        return animate ? "#D1D5DB" : "#F3F4F6";
      default:
        return "";
    }
  })();

  return (
    <Chip
      label={status}
      className={`${animate ? "animate-pulse" : ""}`}
      style={{
        backgroundColor: bgColor,
        color: status === OrderStatusEnum.Pending ? "#111827" : "#fff",
      }}
    />
  );
}
