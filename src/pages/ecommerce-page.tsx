import { useEffect, useState } from "react";
import { DateFilters, Order, OrderStatus } from "../types/Ecommerce/Orders";
import OrdersTable from "../components/ecommerce/orders-table";
import useResolutionCheck from "../hooks/useResolutionCheck";
import ChatWindow from "../components/ai-chat/chat-window";
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
import { AudioProvider } from "../contexts/AudioContext";
import { useLayout } from "../contexts/LayoutContext";
import { Helmet } from "react-helmet-async";
import { ANIMATION_CLEAR_DELAY } from "../consts/animations";

let orders: Order[] = generateOrders();

export default function EcommercePage() {
  const { isChatExpanded, isNavbarExpanded } = useLayout();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [areFiltersOpenOnMobile, setAreFiltersOpenOnMobile] = useState(false);
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

  const executeFormLogic = async (appData: string) => {
    let responseData = JSON.parse(appData);
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
      timeoutId = setTimeout(() => setUpdatedOrders([]), ANIMATION_CLEAR_DELAY);
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

  // On larger screens, show filters to the right of the orders table
  const ordersAndFiltersRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "lg-chat:flex-row"
      : isChatExpanded
        ? "md-chat:flex-row"
        : isNavbarExpanded
          ? "lg:flex-row"
          : "md:flex-row";

  // On smaller screens, filters should show on top of the orders table
  const ordersAndFiltersClasses = `flex h-auto gap-4 w-full flex-col-reverse ${ordersAndFiltersRespClasses}`;

  return (
    <>
      <Helmet>
        <title>Simplify Order Management with Form2Agent AI</title>
        <meta
          name="description"
          content="Discover the power of Form2Agent AI in managing your order datasets. Easily change order details, and search or filter orders using voice commands. Experience a streamlined, hands-free approach to efficient order management."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title={
            <OrdersTitle
              setAreFiltersOpenOnMobile={() =>
                setAreFiltersOpenOnMobile((prev) => !prev)
              }
            />
          }
          subTitle="Explore how Form2Agent AI manages datasets. Change order details, search, and filter orders by speaking with the AI assistant."
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription={CHAT_ECOMMERCE_DESCRIPTION}
              formValues={stringifyValues({
                filters,
                orders: [],
              })}
              formContext={stringifyValues({
                filters: FiltersDescriptionContext,
                orders: OrderDescriptionContext,
              })}
            />
          }
        >
          <div className={ordersAndFiltersClasses}>
            <OrdersTable
              orders={filteredOrders}
              updatedOrders={updatedOrders}
              page={page}
              rowsPerPage={rowsPerPage}
              handleRowsPerPageChange={handleRowsPerPageChange}
              handlePageChange={handlePageChange}
            />
            <OrdersFilter
              areFiltersOpenOnMobile={areFiltersOpenOnMobile}
              dateFilter={filters.dateFilter}
              onDateFilterChange={onDateFilterChange}
              statusFilter={filters.statusFilter}
              onStatusFilterChange={handleStatusFilterChange}
              resetFilters={resetFilters}
              querySearch={filters.querySearch}
              setSearchQuery={handleSearchQueryChange}
              handleAmountChange={handleAmountChange}
              amountFilter={filters.amountFilter}
              onCloseChat={() => setAreFiltersOpenOnMobile(false)}
            />
          </div>
        </FormPageLayout>
      </AudioProvider>
    </>
  );
}
