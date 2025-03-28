import { useEffect, useRef } from "react";
import { ORDER_SCROLL_DELAY_MS } from "../../consts/ecommerce.consts";
import StyledTablePagination from "../common/mui-styled/styled-table-pagination";
import PatientLookupRecord from "./patient-lookup-record/patient-lookup-record";
import { PatientLookupBaseFormType } from "../../models/patient-lookup-model";

export default function PatientLookupTable({
  patients,
  page,
  rowsPerPage,
  handleRowsPerPageChange,
  handlePageChange,
  updatedPatients,
}: {
  patients: PatientLookupBaseFormType[];
  updatedPatients: Partial<PatientLookupBaseFormType>[];
  page: number;
  rowsPerPage: number;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => void;
}) {
  const firstUpdatedPatientRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (updatedPatients.length > 0 && firstUpdatedPatientRef.current) {
      firstUpdatedPatientRef.current.scrollIntoView({ behavior: "smooth" });
      timeoutId = setTimeout(() => {
        firstUpdatedPatientRef.current?.scrollIntoView({ behavior: "smooth" });
      }, ORDER_SCROLL_DELAY_MS);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updatedPatients]);

  const patientsDivClasses =
    "flex-1 h-fit border-[1px] relative border-b-0 border-border-primary-light rounded-lg w-full";

  return patients.length > 0 ? (
    <div className={patientsDivClasses}>
      <StyledTablePagination
        className="!min-w-[350px]" // 350px is the approx. max width with no padding overlap
        count={patients.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelRowsPerPage={"Patients per page:"}
        classes={{
          toolbar: "!pl-2",
          select: "!mx-0",
          input: "!mx-2",
          actions: "!ml-2",
          selectLabel: `!block`, // the label would get hidden by default, but it fits just fine
        }}
      />
      {patients
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((patient) => {
          const isFirstUpdated =
            updatedPatients.length > 0 && patient.id === updatedPatients[0].id;
          return (
            <PatientLookupRecord
              key={patient.id}
              patient={patient}
              updatedValues={updatedPatients.find(
                (updatedPatients) => updatedPatients.id === patient.id
              )}
              ref={isFirstUpdated ? firstUpdatedPatientRef : null}
            />
          );
        })}
    </div>
  ) : (
    <div className="p-4 h-fit text-lg font-medium text-text-primary-light flex gap-2 flex-col  w-full border-[1px] border-border-primary-light rounded-lg">
      No Results Found
      <span className=" text-md font-normal">
        We couldn't find any patients matching your criteria. Please adjust your
        filters and try again.
      </span>
    </div>
  );
}
