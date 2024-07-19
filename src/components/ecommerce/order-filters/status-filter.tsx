import { FormControlLabel } from "@mui/material";
import React, { useEffect } from "react";
import { OrderStatus } from "../../../types/Ecommerce/Orders";
import StyledCheckbox from "../../common/mui-styled/styled-checkbox";
const STATUS_FILTERS = [
  ...Object.values(OrderStatus).map((status) => ({
    label: status,
  })),
];
export default function StatusFilter({
  statusFilter,
  onStatusFilterChange,
}: {
  onStatusFilterChange: (status: OrderStatus[]) => void;
  statusFilter: OrderStatus[];
}) {
  const [checkedStatuses, setCheckedStatuses] = React.useState(
    STATUS_FILTERS.map((filter) => statusFilter.includes(filter.label))
  );

  useEffect(() => {
    setCheckedStatuses(
      STATUS_FILTERS.map((filter) => statusFilter.includes(filter.label))
    );
  }, [statusFilter]);

  const handleStatusChange = (index: number) => () => {
    setCheckedStatuses((prevCheckedStatuses) => {
      const newCheckedStatuses = [...prevCheckedStatuses];
      newCheckedStatuses[index] = !newCheckedStatuses[index];
      onStatusFilterChange(
        newCheckedStatuses
          .map((checked, index) =>
            checked ? STATUS_FILTERS[index].label : null
          )
          .filter(Boolean) as OrderStatus[]
      );
      return newCheckedStatuses;
    });
  };

  const handleChangeAllStatuses = () => {
    setCheckedStatuses((prevCheckedStatuses) => {
      const newCheckedStatuses = [...prevCheckedStatuses];
      const allChecked = newCheckedStatuses.every(Boolean);

      onStatusFilterChange(
        allChecked
          ? []
          : STATUS_FILTERS.map(({ label }) => label as OrderStatus)
      );
      return newCheckedStatuses.map(() => !allChecked);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-medium mb-1">Order Status</span>
      <FormControlLabel
        label="All"
        className="h-6"
        control={
          <StyledCheckbox
            checked={checkedStatuses.every(Boolean)}
            indeterminate={
              checkedStatuses.some(Boolean) && !checkedStatuses.every(Boolean)
            }
            size="small"
            onChange={handleChangeAllStatuses}
          />
        }
      />
      {STATUS_FILTERS.map((statusFilter, index) => (
        <FormControlLabel
          key={statusFilter.label}
          label={statusFilter.label}
          className="h-6"
          control={
            <StyledCheckbox
              size="small"
              checked={checkedStatuses[index]}
              onChange={handleStatusChange(index)}
            />
          }
        />
      ))}
    </div>
  );
}
