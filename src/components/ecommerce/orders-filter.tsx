import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OrderStatus, DateFilters } from "../../types/Ecommerce/Orders";
import StatusFilter from "./order-filters/status-filter";
import DateFilter from "./order-filters/date-filter";
import CloseIcon from "@mui/icons-material/Close";
import AmountFilter from "./order-filters/amount-filter";
import { AmountFilterType } from "../../models/ecommerce-model";

export default function OrdersFilter({
  isVisible,
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
  isVisible: boolean;
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
  return (
    <div
      className={`flex w-full md:w-80 h-fit flex-col border-border-primary-light text-text-primary-light gap-7 p-4 pb-8 border-[1px] rounded-lg ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        {isVisible && (
          <div
            onClick={onCloseChat}
            className="md:hidden text-fg-primary-light"
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
