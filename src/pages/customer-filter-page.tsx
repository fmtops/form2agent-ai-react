import { useEffect, useState } from "react";
import { DateFilters } from "../types/Ecommerce/Orders";
import OrdersTable from "../components/ecommerce/orders-table";
import ChatWindow from "../components/ai-chat/chat-window";
import OrdersFilter from "../components/ecommerce/orders-filter";
import { AmountFilterType, defaultFilters } from "../models/ecommerce-model";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import OrdersTitle from "../components/ecommerce/orders-title";
import { AudioProvider } from "../contexts/AudioContext";
import { useLayout } from "../contexts/LayoutContext";
import {
  CUSTOMER_FILTERS_DESCRIPTION,
  CustomerFiltersDescriptionContext,
  CustomerOrderDescriptionContext,
} from "../models/customer-filter-context-model";
import {
  customerDefaultFilters,
  CustomerFilterType,
  CustomerOrder,
} from "../models/customer-filter-model";
import CustomerOrdersTable from "../components/customer-filter/customer-table";
import CustomerOrdersFilter from "../components/customer-filter/customer-filter";
import {
  filterCustomerOrders,
  generateCustomerOrders,
  updateCustomerFilters,
} from "../utils/customerOrder.utils";
import { dateFilterLabelToEnum } from "../utils/orders.utils";

export default function CustomerFilterPage() {
  const { isChatExpanded, isNavbarExpanded } = useLayout();
  const [filteredOrders, setFilteredOrders] = useState<CustomerOrder[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>(
    generateCustomerOrders()
  );
  const [areFiltersOpenOnMobile, setAreFiltersOpenOnMobile] = useState(false);
  const [filters, setFilters] = useState<CustomerFilterType>(
    customerDefaultFilters
  );
  const [updatedOrders, setUpdatedOrders] = useState<Partial<CustomerOrder>[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const setPageToUpdatedOrder = (orderNumber: number) => {
    const index = filteredOrders.findIndex(
      (order) => order.customerNumber === orderNumber
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
        totalAmountOfOrders: {
          ...prevFilters.totalAmountOfOrders,
          ...responseData.filters.totalAmountOfOrders,
        },
        dateOfLastOrder: dateFilterLabelToEnum(
          responseData.filters.dateOfLastOrder
        ),
        totalValueOfOrders: {
          ...prevFilters.totalValueOfOrders,
          ...responseData.filters.totalValueOfOrders,
        },
      }));
    }
    if (responseData.orders) {
      handleUpdateOrders(responseData.orders);
    }
  };

  const handleUpdateOrders = (updatedOrders: Partial<CustomerOrder>[]) => {
    if (updatedOrders.length > 0) {
      setUpdatedOrders(updatedOrders);

      updatedOrders.forEach((updatedOrder) => {
        const { customerNumber: orderNumber, ...rest } = updatedOrder;
        const index = orders.findIndex(
          (order) => order.customerNumber === orderNumber
        );
        if (index !== -1) {
          orders[index] = { ...orders[index], ...rest };
        }
      });
      onFilterOrders();
      if (updatedOrders[0].customerNumber)
        setPageToUpdatedOrder(updatedOrders[0].customerNumber);
    }
  };

  useEffect(() => {
    onFilterOrders();
  }, [filters]);

  const onFilterOrders = () => {
    setPage(0);
    setFilteredOrders(filterCustomerOrders([...orders], filters));
  };

  const handleTotalValueChange = (
    newAmountFilter: Partial<AmountFilterType>
  ) => {
    setFilters((prev) => {
      const totalValueOfOrders = {
        ...prev.totalValueOfOrders,
        ...newAmountFilter,
      };
      return updateCustomerFilters(prev, {
        totalValueOfOrders,
      });
    });
  };

  const handleTotalAmountChange = (
    newAmountFilter: Partial<AmountFilterType>
  ) => {
    setFilters((prev) => {
      const totalAmountOfOrders = {
        ...prev.totalAmountOfOrders,
        ...newAmountFilter,
      };
      return updateCustomerFilters(prev, {
        totalAmountOfOrders,
      });
    });
  };

  const handleSearchQueryChange = (querySearch: string) => {
    setFilters((prevFilters) =>
      updateCustomerFilters(prevFilters, { querySearch })
    );
  };

  const resetFilters = () => setFilters(customerDefaultFilters);

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

  const onDateFilterChange = (dateFilter: DateFilters) => {
    setFilters((prevFilters) =>
      updateCustomerFilters(prevFilters, { dateOfLastOrder: dateFilter })
    );
  };

  return (
    <AudioProvider>
      <FormPageLayout
        title={
          <OrdersTitle
            setAreFiltersOpenOnMobile={() =>
              setAreFiltersOpenOnMobile((prev) => !prev)
            }
            title="Customer Orders"
          />
        }
        subTitle="Explore how Form2Agent AI manages datasets. Get customer order details, search, and filter orders by speaking with the AI assistant."
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription={CUSTOMER_FILTERS_DESCRIPTION}
            formValues={stringifyValues({
              filters,
              orders: [],
            })}
            formContext={stringifyValues({
              filters: CustomerFiltersDescriptionContext,
              orders: CustomerOrderDescriptionContext,
            })}
          />
        }
      >
        <div className={ordersAndFiltersClasses}>
          <CustomerOrdersTable
            orders={filteredOrders}
            updatedOrders={updatedOrders}
            page={page}
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
            handlePageChange={handlePageChange}
          />
          <CustomerOrdersFilter
            areFiltersOpenOnMobile={areFiltersOpenOnMobile}
            dateFilter={filters.dateOfLastOrder}
            onDateFilterChange={onDateFilterChange}
            resetFilters={resetFilters}
            querySearch={filters.querySearch}
            setSearchQuery={handleSearchQueryChange}
            handleTotalValueChange={handleTotalValueChange}
            handleNumberOfOrdersFilterChange={handleTotalAmountChange}
            totalValueFilter={filters.totalValueOfOrders}
            numberOfOrdersFilter={filters.totalAmountOfOrders}
            onCloseChat={() => setAreFiltersOpenOnMobile(false)}
          />
        </div>
      </FormPageLayout>
    </AudioProvider>
  );
}
