import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OrderStatus, DateFilters } from "../../types/Ecommerce/Orders";
import StatusFilter from "./order-filters/status-filter";
import DateFilter from "./order-filters/date-filter";
import CloseIcon from "@mui/icons-material/Close";
import AmountFilter from "./order-filters/amount-filter";
import { AmountFilterType } from "../../models/ecommerce-model";
import { useLayout } from "../../contexts/LayoutContext";

export default function OrdersFilter({
  areFiltersOpenOnMobile,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  resetFilters,
  querySearch,
  setSearchQuery,
  handleAmountChange,
  amountFilter,
  onCloseChat,
}: {
  areFiltersOpenOnMobile: boolean;
  statusFilter: OrderStatus[];
  onStatusFilterChange: (status: OrderStatus[]) => void;
  dateFilter: DateFilters;
  onDateFilterChange: (date: DateFilters) => void;
  resetFilters: () => void;
  querySearch: string;
  setSearchQuery: (query: string) => void;
  handleAmountChange: ({ min, max }: { min?: number; max?: number }) => void;
  onCloseChat: () => void;
  amountFilter: Partial<AmountFilterType>;
}) {
  const { isChatExpanded, isNavbarExpanded } = useLayout();

  // when displayed next to orders, filters should take w-80 of space
  const filtersWidthRespClass =
    isChatExpanded && isNavbarExpanded
      ? "lg-chat:w-80"
      : isChatExpanded
        ? "md-chat:w-80"
        : isNavbarExpanded
          ? "lg:w-80"
          : "md:w-80";

  // filters should only be always visible on larger screens
  // on smaller screens, hide them unless toggled with a button
  const filtersRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "lg-chat:flex"
      : isChatExpanded
        ? "md-chat:flex"
        : isNavbarExpanded
          ? "lg:flex"
          : "md:flex";

  // the button for closing filters (x) should only be visible when you can hide the filters
  const closeButtonRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "lg-chat:hidden"
      : isChatExpanded
        ? "md-chat:hidden"
        : isNavbarExpanded
          ? "lg:hidden"
          : "md:hidden";

  const filtersClasses = `w-full ${filtersWidthRespClass} h-fit flex-col border-border-primary-light text-text-primary-light gap-7 p-4 pb-8 border-[1px] rounded-lg ${areFiltersOpenOnMobile ? "flex" : `hidden ${filtersRespClasses}`}`;

  return (
    <div className={filtersClasses}>
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        {areFiltersOpenOnMobile && (
          <div
            onClick={onCloseChat}
            className={`text-fg-primary-light ${closeButtonRespClasses}`}
          >
            <CloseIcon className="w-6 h-6" />
          </div>
        )}
      </div>
      <TextField
        placeholder="Search by order or customer"
        className="w-full"
        variant="outlined"
        size="small"
        value={querySearch}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <DateFilter
        dateFilter={dateFilter}
        onDateFilterChange={onDateFilterChange}
      />
      <StatusFilter
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
      />
      <AmountFilter
        value={amountFilter}
        handleAmountChange={handleAmountChange}
      />
      <button
        onClick={resetFilters}
        className="text-md text-text-brand-light font-medium flex gap-1 items-center"
      >
        <CloseIcon />
        Reset Filters
      </button>
    </div>
  );
}
