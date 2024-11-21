import { RadioGroup, FormControlLabel } from "@mui/material";
import StyledRadio from "../../common/mui-styled/styled-radio";
import { DateFilters } from "../../../types/Ecommerce/Orders";

const DATE_FILTERS = [
  { label: "All", value: DateFilters.ALL },
  { label: "Today", value: DateFilters.TODAY },
  { label: "Yesterday", value: DateFilters.YESTERDAY },
  { label: "Last 7 days", value: DateFilters.LAST_7_DAYS },
  { label: "Last 30 days", value: DateFilters.LAST_30_DAYS },
];
export default function DateFilter({
  onDateFilterChange,
  dateFilter,
  name,
}: {
  onDateFilterChange: (date: DateFilters) => void;
  dateFilter: DateFilters;
  name?: string;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateFilterChange(event.target.value as DateFilters);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-medium mb-1">{name ?? "Date"}</span>
      <RadioGroup
        defaultValue={DATE_FILTERS[0].value}
        className="flex flex-col gap-2"
        value={dateFilter}
        onChange={handleChange}
      >
        {DATE_FILTERS.map((filter) => (
          <FormControlLabel
            key={filter.label}
            className="h-6"
            control={<StyledRadio size="small" />}
            label={filter.label}
            value={filter.value}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
