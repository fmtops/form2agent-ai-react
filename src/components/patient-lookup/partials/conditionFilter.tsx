import { FormControlLabel } from "@mui/material";
import React, { useEffect } from "react";
import StyledCheckbox from "../../common/mui-styled/styled-checkbox";
import { MedicalCondition } from "../../../models/patient-lookup-model";
const CONDITION_FILTERS = [
  ...Object.values(MedicalCondition).map((status) => ({
    label: status,
  })),
];
export default function ConditionFilter({
  conditionFilter,
  onConditionFilterChange,
}: {
  onConditionFilterChange: (status: MedicalCondition[]) => void;
  conditionFilter: MedicalCondition[];
}) {
  const [checkedStatuses, setCheckedStatuses] = React.useState(
    CONDITION_FILTERS.map((filter) => conditionFilter.includes(filter.label))
  );

  useEffect(() => {
    setCheckedStatuses(
      CONDITION_FILTERS.map((filter) => conditionFilter.includes(filter.label))
    );
  }, [conditionFilter]);

  const handleStatusChange = (index: number) => () => {
    setCheckedStatuses((prevCheckedStatuses) => {
      const newCheckedStatuses = [...prevCheckedStatuses];
      newCheckedStatuses[index] = !newCheckedStatuses[index];
      onConditionFilterChange(
        newCheckedStatuses
          .map((checked, index) =>
            checked ? CONDITION_FILTERS[index].label : null
          )
          .filter(Boolean) as MedicalCondition[]
      );
      return newCheckedStatuses;
    });
  };

  const handleChangeAllStatuses = () => {
    setCheckedStatuses((prevCheckedStatuses) => {
      const newCheckedStatuses = [...prevCheckedStatuses];
      const allChecked = newCheckedStatuses.every(Boolean);

      onConditionFilterChange(
        allChecked
          ? []
          : CONDITION_FILTERS.map(({ label }) => label as MedicalCondition)
      );
      return newCheckedStatuses.map(() => !allChecked);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-medium mb-1">Medical condition</span>
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
      {CONDITION_FILTERS.map((statusFilter, index) => (
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
