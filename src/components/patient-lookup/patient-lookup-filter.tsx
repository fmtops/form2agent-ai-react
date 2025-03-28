import CloseIcon from "@mui/icons-material/Close";
import { useLayout } from "../../contexts/LayoutContext";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  FiltersType,
  MedicalCondition,
} from "../../models/patient-lookup-model";
import GenderFilter from "./partials/genderFilter";
import ConditionFilter from "./partials/conditionFilter";
import { DatepickerComponent } from "../common/form/datepicker";

export default function PatientsFilter({
  areFiltersOpenOnMobile,
  resetFilters,
  filters,
  conditionFilter,
  onConditionFilterChange,
  genderFilter,
  onGenderFilterChange,
  onCloseChat,
  setFullName,
  setContactNumber,
  setEmailAddress,
  setHomeAddress,
  setEmergencyContactName,
  setEmergencyContactRelation,
  setEmergencyContactNumber,
  setSelectedDate,
}: {
  areFiltersOpenOnMobile: boolean;
  resetFilters: () => void;
  filters: FiltersType;
  onCloseChat: () => void;
  conditionFilter: MedicalCondition[];
  onConditionFilterChange: (status: MedicalCondition[]) => void;
  genderFilter: string[];
  onGenderFilterChange: (status: string[]) => void;
  setFullName: (fullName: string) => void;
  setContactNumber: (contactNumber: string) => void;
  setEmailAddress: (emailAddress: string) => void;
  setHomeAddress: (homeAddress: string) => void;
  setEmergencyContactName: (emergencyContactName: string) => void;
  setEmergencyContactRelation: (emergencyContactRelation: string) => void;
  setEmergencyContactNumber: (emergencyContactNumber: string) => void;
  setSelectedDate: (newDate: Date | null) => void;
}) {
  const { isChatExpanded, isNavbarExpanded } = useLayout();

  // when displayed next to patients, filters should take w-80 of space
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

  const filtersClasses = `w-full ${filtersWidthRespClass} min-w-160  h-fit flex-col border-border-primary-light text-text-primary-light gap-7 p-4 pb-8 border-[1px] rounded-lg ${areFiltersOpenOnMobile ? "flex" : `hidden ${filtersRespClasses}`}`;

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
        placeholder="Full Name"
        className="w-full"
        variant="outlined"
        size="small"
        value={filters.fullName}
        onChange={(e) => setFullName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <DatepickerComponent
        label="Date of Birth"
        value={filters.dateOfBirth}
        hasDefaultColor
        handleDateChange={setSelectedDate}
      />

      <GenderFilter
        genderFilter={genderFilter}
        onGenderFilterChange={onGenderFilterChange}
      />
      <TextField
        placeholder="Contact number"
        className="w-full"
        variant="outlined"
        size="small"
        value={filters.contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        placeholder="Email address"
        className="w-full"
        variant="outlined"
        size="small"
        value={filters.emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        placeholder="Home address"
        className="w-full"
        variant="outlined"
        size="small"
        value={filters.homeAddress}
        onChange={(e) => setHomeAddress(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        placeholder="Emergency contact name"
        className="w-full"
        variant="outlined"
        size="small"
        value={filters.emergencyContactName}
        onChange={(e) => setEmergencyContactName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        placeholder="Emergency relation"
        className="w-full"
        variant="outlined"
        size="small"
        value={filters.emergencyContactRelation}
        onChange={(e) => setEmergencyContactRelation(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        placeholder="Emergency contact number"
        className="w-full"
        variant="outlined"
        size="small"
        value={filters.emergencyContactNumber}
        onChange={(e) => setEmergencyContactNumber(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <ConditionFilter
        conditionFilter={conditionFilter}
        onConditionFilterChange={onConditionFilterChange}
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
