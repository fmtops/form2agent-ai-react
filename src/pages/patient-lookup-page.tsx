import { useEffect, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";
import { useLayout } from "../contexts/LayoutContext";
import {
  FiltersType,
  MedicalCondition,
  PatientLookupBaseFormType,
} from "../models/patient-lookup-model";
import PatientLookupTable from "../components/patient-lookup/patient-lookup-table";
import PatientLookupFilter from "../components/patient-lookup/patient-lookup-filter";
import PatientLookupTitle from "../components/patient-lookup/patient-lookup-title";
import {
  DescriptionContext,
  FiltersDescriptionContext,
  PATIENT_LOOKUP_DESCRIPTION,
} from "../models/patient-lookup-context-model";
import {
  filterPatients,
  generatePatients,
  updateFilters,
} from "../utils/patient-lookup.utils";
import { DEFAULT_FILTERS_VALUES } from "../consts/patient-lookup.consts";
import { ANIMATION_CLEAR_DELAY } from "../consts/animations";

let patients: PatientLookupBaseFormType[] = generatePatients();
export default function PatientLookupPage() {
  const { isChatExpanded, isNavbarExpanded } = useLayout();
  const [filteredPatients, setFilteredPatients] =
    useState<PatientLookupBaseFormType[]>(patients);
  const [areFiltersOpenOnMobile, setAreFiltersOpenOnMobile] = useState(false);
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS_VALUES);
  const [updatedPatients, setUpdatedPatients] = useState<
    Partial<PatientLookupBaseFormType>[]
  >([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const setPageToUpdatedPatient = (id: string) => {
    const index = filteredPatients.findIndex((patient) => patient.id === id);
    if (index === -1) return;
    setPage(() => Math.floor(index / rowsPerPage));
  };

  const executeFormLogic = async (appData: string) => {
    let responseData = JSON.parse(appData);
    if (responseData.filters) {
      setFilters((prevFilters) => ({
        ...filters,
        ...responseData.filters,
      }));
    }
    if (responseData.patients) {
      handleUpdatePatients(responseData.patients);
    }
  };

  const handleUpdatePatients = (
    updatedPatients: Partial<PatientLookupBaseFormType>[]
  ) => {
    if (updatedPatients.length > 0) {
      setUpdatedPatients(updatedPatients);

      updatedPatients.forEach((updatedPatient) => {
        const { id, ...rest } = updatedPatient;
        const index = patients.findIndex((patient) => patient.id === id);
        if (index !== -1) {
          patients[index] = { ...patients[index], ...rest };
        }
      });
      onFilterPatients();
      if (updatedPatients[0].id) setPageToUpdatedPatient(updatedPatients[0].id);
    }
  };

  useEffect(() => {
    onFilterPatients();
  }, [filters]);

  const onFilterPatients = () => {
    setPage(0);
    setFilteredPatients(filterPatients([...patients], filters));
  };

  const handleMedicalConditionChange = (conditions: MedicalCondition[]) => {
    setFilters((prev) => updateFilters(prev, { medicalCondition: conditions }));
  };

  const handleGenderChange = (genders: string[]) => {
    setFilters((prev) => updateFilters(prev, { gender: genders }));
  };

  const handleFullnameFilterChange = (fullname: string) => {
    setFilters((prev) => updateFilters(prev, { fullName: fullname }));
  };

  const handleContactNumberFilterChange = (contactNumber: string) => {
    setFilters((prev) => updateFilters(prev, { contactNumber: contactNumber }));
  };

  const handleEmailFilterChange = (email: string) => {
    setFilters((prev) => updateFilters(prev, { emailAddress: email }));
  };

  const handleHomeAddressFilterChange = (homeAddress: string) => {
    setFilters((prev) => updateFilters(prev, { homeAddress: homeAddress }));
  };

  const handleDateChange = (dateOfBirth: Date | null) => {
    try {
      const date = dateOfBirth?.toLocaleDateString();
      setFilters((prev) => updateFilters(prev, { dateOfBirth: date ?? "" }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleEmergencyContactFilterChange = (emergencyContact: string) => {
    setFilters((prev) =>
      updateFilters(prev, { emergencyContactName: emergencyContact })
    );
  };

  const handleEmergencyContactRelationFilterChange = (
    emergencyContactRelation: string
  ) => {
    setFilters((prev) =>
      updateFilters(prev, {
        emergencyContactRelation: emergencyContactRelation,
      })
    );
  };

  const handleEmergencyContactNumberFilterChange = (
    emergencyContactNumber: string
  ) => {
    setFilters((prev) =>
      updateFilters(prev, { emergencyContactNumber: emergencyContactNumber })
    );
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS_VALUES);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (updatedPatients.length > 0) {
      timeoutId = setTimeout(
        () => setUpdatedPatients([]),
        ANIMATION_CLEAR_DELAY
      );
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updatedPatients]);

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

  // On larger screens, show filters to the right of the patients table
  const patientsAndFiltersRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "lg-chat:flex-row"
      : isChatExpanded
        ? "md-chat:flex-row"
        : isNavbarExpanded
          ? "lg:flex-row"
          : "md:flex-row";

  // On smaller screens, filters should show on top of the patients table
  const patientsAndFiltersClasses = `flex h-auto gap-4 w-full flex-col-reverse ${patientsAndFiltersRespClasses}`;

  return (
    <AudioProvider>
      <FormPageLayout
        title={
          <PatientLookupTitle
            setAreFiltersOpenOnMobile={() =>
              setAreFiltersOpenOnMobile((prev) => !prev)
            }
          />
        }
        subTitle="Explore how Form2Agent AI manages datasets. Look up patients by speaking with the AI assistant."
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription={PATIENT_LOOKUP_DESCRIPTION}
            formValues={stringifyValues({
              filters,
              patients: [],
            })}
            formContext={stringifyValues({
              filters: FiltersDescriptionContext,
              patients: DescriptionContext,
            })}
          />
        }
      >
        <div className={patientsAndFiltersClasses}>
          <PatientLookupTable
            patients={filteredPatients}
            updatedPatients={updatedPatients}
            page={page}
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
            handlePageChange={handlePageChange}
          />
          <PatientLookupFilter
            areFiltersOpenOnMobile={areFiltersOpenOnMobile}
            resetFilters={resetFilters}
            onCloseChat={() => setAreFiltersOpenOnMobile(false)}
            conditionFilter={filters.medicalCondition}
            onConditionFilterChange={handleMedicalConditionChange}
            genderFilter={filters.gender}
            onGenderFilterChange={handleGenderChange}
            setFullName={handleFullnameFilterChange}
            setContactNumber={handleContactNumberFilterChange}
            setEmailAddress={handleEmailFilterChange}
            setHomeAddress={handleHomeAddressFilterChange}
            setEmergencyContactName={handleEmergencyContactFilterChange}
            setEmergencyContactRelation={
              handleEmergencyContactRelationFilterChange
            }
            setEmergencyContactNumber={handleEmergencyContactNumberFilterChange}
            filters={filters}
            setSelectedDate={handleDateChange}
          />
        </div>
      </FormPageLayout>
    </AudioProvider>
  );
}
