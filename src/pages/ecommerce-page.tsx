import { useEffect, useState } from "react";
import { DateFilters, Order, OrderStatus } from "../types/Ecommerce/Orders";
import OrdersTable from "../components/ecommerce/orders-table";
import useResolutionCheck from "../hooks/useResolutionCheck";
import ChatWindow from "../components/ai-chat/chat-window";
import { AiChatService } from "../services/ai-chat-service";
import { ChatMessage } from "../types/api/AiChatServiceTypes";
import OrdersFilter from "../components/ecommerce/orders-filter";
import {
  dateFilterLabelToEnum,
  filterOrders,
  generateOrders,
  updateFilters,
} from "../utils/orders.utils";
import {
  CHAT_ECOMMERCE_DESCRIPTION,
  FiltersDescriptionContext,
  OrderDescriptionContext,
} from "../models/ecommerce-context-model";
import {
  AmountFilterType,
  FiltersType,
  defaultFilters,
} from "../models/ecommerce-model";
import { DEFAULT_FILTERS_VALUES } from "../consts/ecommerce.consts";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import OrdersTitle from "../components/ecommerce/orders-title";

let orders: Order[] = generateOrders();

export default function EcommercePage() {
  const aiChatService = new AiChatService();
  const { isResHigherThanMobile } = useResolutionCheck();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [isFiltersMobileOpen, setIsFiltersMobileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS_VALUES);
  const [updatedOrders, setUpdatedOrders] = useState<Partial<Order>[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const setPageToUpdatedOrder = (order_number: number) => {
    const index = filteredOrders.findIndex(
      (order) => order.order_number === order_number
    );
    if (index === -1) return;
    setPage(() => Math.floor(index / rowsPerPage));
  };

  const sendMessage = async (chatMessage: ChatMessage) => {
    let response;
    try {
      response = await aiChatService.sendMessage(chatMessage);
      let responseData = JSON.parse(response.model.appData);

      if (responseData.filters) {
        setFilters((prevFilters) => ({
          ...filters,
          ...responseData.filters,
          dateFilter: dateFilterLabelToEnum(responseData.filters.dateFilter),
          amountFilter: {
            ...prevFilters.amountFilter,
            ...responseData.filters.amountFilter,
          },
        }));
      }
      if (responseData.orders) {
        handleUpdateOrders(responseData.orders);
      }
    } catch (error) {
      console.log("error", error);
    }

    return response;
  };

  const handleUpdateOrders = (updatedOrders: Partial<Order>[]) => {
    if (updatedOrders.length > 0) {
      setUpdatedOrders(updatedOrders);

      updatedOrders.forEach((updatedOrder) => {
        const { order_number, ...rest } = updatedOrder;
        const index = orders.findIndex(
          (order) => order.order_number === order_number
        );
        if (index !== -1) {
          orders[index] = { ...orders[index], ...rest };
        }
      });
      onFilterOrders();
      if (updatedOrders[0].order_number)
        setPageToUpdatedOrder(updatedOrders[0].order_number);
    }
  };

  useEffect(() => {
    onFilterOrders();
  }, [filters]);

  const onFilterOrders = () => {
    setPage(0);
    setFilteredOrders(filterOrders([...orders], filters));
  };

  const handleStatusFilterChange = (statusFilter: OrderStatus[]) => {
    setFilters((prevFilters) => updateFilters(prevFilters, { statusFilter }));
  };

  const onDateFilterChange = (dateFilter: DateFilters) => {
    setFilters((prevFilters) => updateFilters(prevFilters, { dateFilter }));
  };

  const handleAmountChange = (newAmountFilter: Partial<AmountFilterType>) => {
    setFilters((prev) => {
      const amountFilter = { ...prev.amountFilter, ...newAmountFilter };
      return updateFilters(prev, {
        amountFilter,
      });
    });
  };

  const handleSearchQueryChange = (querySearch: string) => {
    setFilters((prevFilters) => updateFilters(prevFilters, { querySearch }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (updatedOrders.length > 0) {
      timeoutId = setTimeout(() => setUpdatedOrders([]), 1500);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updatedOrders]);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <FormPageLayout
      containerWidth={
        isResHigherThanMobile && isChatOpen ? "calc(100% - 387px)" : "100%"
      }
      title={
        <OrdersTitle
          setIsFiltersMobileOpen={() => setIsFiltersMobileOpen((prev) => !prev)}
        />
      }
      chatElement={
        <ChatWindow
          createNewChat={aiChatService.createNewChat}
          sendMessage={sendMessage}
          formDescription={CHAT_ECOMMERCE_DESCRIPTION}
          formValues={stringifyValues({
            filters,
            orders: [],
          })}
          formContext={stringifyValues({
            filters: FiltersDescriptionContext,
            orders: OrderDescriptionContext,
          })}
          setIsChatOpen={setIsChatOpen}
        />
      }
      isChatOpen={isChatOpen}
    >
      <div
        className={`flex h-auto gap-4 w-full ${
          isFiltersMobileOpen && !isResHigherThanMobile
            ? "flex-col-reverse"
            : ""
        }`}
      >
        <OrdersTable
          orders={filteredOrders}
          updatedOrders={updatedOrders}
          page={page}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          handlePageChange={handlePageChange}
        />
        <OrdersFilter
          isVisible={isFiltersMobileOpen || isResHigherThanMobile}
          dateFilter={filters.dateFilter}
          onDateFilterChange={onDateFilterChange}
          statusFilter={filters.statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          resetFilters={resetFilters}
          querySearch={filters.querySearch}
          setSearchQuery={handleSearchQueryChange}
          handleAmountChange={handleAmountChange}
          amountFilter={filters.amountFilter}
          onCloseChat={() => setIsFiltersMobileOpen(false)}
        />
      </div>
    </FormPageLayout>
  );
}
