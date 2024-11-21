import OrderCard from "./order-card/order-card";
import { Order } from "../../types/Ecommerce/Orders";
import { useEffect, useRef } from "react";
import { ORDER_SCROLL_DELAY_MS } from "../../consts/ecommerce.consts";
import StyledTablePagination from "../common/mui-styled/styled-table-pagination";

export default function OrdersTable({
  orders,
  page,
  rowsPerPage,
  handleRowsPerPageChange,
  handlePageChange,
  updatedOrders,
}: {
  orders: Order[];
  updatedOrders: Partial<Order>[];
  page: number;
  rowsPerPage: number;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => void;
}) {
  const firstUpdatedOrderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (updatedOrders.length > 0 && firstUpdatedOrderRef.current) {
      firstUpdatedOrderRef.current.scrollIntoView({ behavior: "smooth" });
      timeoutId = setTimeout(() => {
        firstUpdatedOrderRef.current?.scrollIntoView({ behavior: "smooth" });
      }, ORDER_SCROLL_DELAY_MS);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updatedOrders]);

  const ordersDivClasses =
    "flex-1 h-fit border-[1px] relative border-b-0 border-border-primary-light rounded-lg w-full";

  return orders.length > 0 ? (
    <div className={ordersDivClasses}>
      <StyledTablePagination
        className="!min-w-[350px]" // 350px is the approx. max width with no padding overlap
        count={orders.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelRowsPerPage={"Orders per page:"}
        classes={{
          toolbar: "!pl-2",
          select: "!mx-0",
          input: "!mx-2",
          actions: "!ml-2",
          selectLabel: `!block`, // the label would get hidden by default, but it fits just fine
        }}
      />
      {orders
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((order) => {
          const isFirstUpdated =
            updatedOrders.length > 0 &&
            order.order_number === updatedOrders[0].order_number;
          return (
            <OrderCard
              key={order.order_number}
              order={order}
              updatedValues={updatedOrders.find(
                (updatedOrder) =>
                  updatedOrder.order_number === order.order_number
              )}
              ref={isFirstUpdated ? firstUpdatedOrderRef : null}
            />
          );
        })}
    </div>
  ) : (
    <div className="p-4 h-fit text-lg font-medium text-text-primary-light flex gap-2 flex-col  w-full border-[1px] border-border-primary-light rounded-lg">
      No Results Found
      <span className=" text-md font-normal">
        We couldn't find any orders matching your criteria. Please adjust your
        filters and try again.
      </span>
    </div>
  );
}
