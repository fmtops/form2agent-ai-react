import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { AmountFilterType } from "../../models/ecommerce-model";
import { useLayout } from "../../contexts/LayoutContext";
import AmountFilter from "../ecommerce/order-filters/amount-filter";
import { DateFilters } from "../../types/Ecommerce/Orders";
import DateFilter from "../ecommerce/order-filters/date-filter";

export default function CustomerOrdersFilter({
  areFiltersOpenOnMobile,
  dateFilter,
  onDateFilterChange,
  resetFilters,
  querySearch,
  setSearchQuery,
  handleNumberOfOrdersFilterChange,
  numberOfOrdersFilter,
  totalValueFilter,
  handleTotalValueChange,
  onCloseChat,
}: {
  areFiltersOpenOnMobile: boolean;
  dateFilter: DateFilters;
  onDateFilterChange: (date: DateFilters) => void;
  resetFilters: () => void;
  onCloseChat: () => void;
  numberOfOrdersFilter: Partial<AmountFilterType>;
  handleNumberOfOrdersFilterChange: ({
    min,
    max,
  }: {
    min?: number;
    max?: number;
  }) => void;
  totalValueFilter: Partial<AmountFilterType>;
  handleTotalValueChange: ({
    min,
    max,
  }: {
    min?: number;
    max?: number;
  }) => void;
  querySearch: string;
  setSearchQuery: (query: string) => void;
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

  const filtersClasses = `w-full ${filtersWidthRespClass} min-w-160 h-fit flex-col border-border-primary-light text-text-primary-light gap-7 p-4 pb-8 border-[1px] rounded-lg ${areFiltersOpenOnMobile ? "flex" : `hidden ${filtersRespClasses}`}`;

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
        placeholder="Search by customer or state"
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
      <AmountFilter
        name="Number of Orders"
        value={numberOfOrdersFilter}
        handleAmountChange={handleNumberOfOrdersFilterChange}
        shouldRenderDollarSign={false}
      />
      <AmountFilter
        name="Total Value"
        value={totalValueFilter}
        handleAmountChange={handleTotalValueChange}
      />
      <DateFilter
        dateFilter={dateFilter}
        onDateFilterChange={onDateFilterChange}
        name="Date of Last Order"
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
