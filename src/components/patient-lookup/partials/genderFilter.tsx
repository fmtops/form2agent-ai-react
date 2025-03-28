import { FormControlLabel } from "@mui/material";
import React, { useEffect } from "react";
import StyledCheckbox from "../../common/mui-styled/styled-checkbox";
import { GenderOptionsOther } from "../../../consts/general-fields.consts";
export default function GenderFilter({
  genderFilter,
  onGenderFilterChange,
}: {
  onGenderFilterChange: (status: string[]) => void;
  genderFilter: string[];
}) {
  const [checkedStatuses, setCheckedStatuses] = React.useState(
    GenderOptionsOther.map((x) => genderFilter.includes(x))
  );

  useEffect(() => {
    setCheckedStatuses(GenderOptionsOther.map((x) => genderFilter.includes(x)));
  }, [genderFilter]);

  const handleStatusChange = (index: number) => () => {
    setCheckedStatuses((prevCheckedStatuses) => {
      const newCheckedStatuses = [...prevCheckedStatuses];
      newCheckedStatuses[index] = !newCheckedStatuses[index];
      onGenderFilterChange(
        newCheckedStatuses
          .map((checked, index) => (checked ? GenderOptionsOther[index] : null))
          .filter(Boolean) as string[]
      );
      return newCheckedStatuses;
    });
  };

  const handleChangeAllStatuses = () => {
    setCheckedStatuses((prevCheckedStatuses) => {
      const newCheckedStatuses = [...prevCheckedStatuses];
      const allChecked = newCheckedStatuses.every(Boolean);

      onGenderFilterChange(allChecked ? [] : GenderOptionsOther);
      return newCheckedStatuses.map(() => !allChecked);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-medium mb-1">Gender</span>
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
      {GenderOptionsOther.map((statusFilter, index) => (
        <FormControlLabel
          key={statusFilter}
          label={statusFilter}
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
