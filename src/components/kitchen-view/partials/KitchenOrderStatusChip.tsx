import { KitchenOrderStatus } from "../../../models/kitchen-model";
import { Chip } from "@mui/material";

export default function KitchenOrderStatusChip({
  status,
  animate,
}: {
  status: KitchenOrderStatus;
  animate?: boolean;
}) {
  const bgColor = (() => {
    switch (status) {
      case KitchenOrderStatus.InProgress:
        return animate ? "#C2410C" : "#F97316";
      case KitchenOrderStatus.Completed:
        return animate ? "#047857" : "#10B981";
      case KitchenOrderStatus.Pending:
        return animate ? "#D1D5DB" : "#F3F4F6";
      default:
        return "";
    }
  })();

  return (
    <Chip
      label={status}
      className={`w-[200px] ${animate ? "animate-pulse" : ""}`}
      style={{
        backgroundColor: bgColor,
        color: status === KitchenOrderStatus.Pending ? "#111827" : "#fff",
      }}
    />
  );
}
