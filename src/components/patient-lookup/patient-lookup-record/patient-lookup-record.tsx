import { formatDate } from "../../../utils/dates.utils";
import { forwardRef } from "react";

import { PatientLookupBaseFormType } from "../../../models/patient-lookup-model";
import { FormProperty } from "../../common/form/form-property";

type PatientLookupRecordProps = {
  patient: PatientLookupBaseFormType;
  updatedValues?: Partial<PatientLookupBaseFormType>;
};

const PatientLookupRecord = forwardRef<
  HTMLDivElement,
  PatientLookupRecordProps
>(({ patient, updatedValues }, ref) => {
  return (
    <div ref={ref} className="border-b-[1px] border-b-border-primary-light">
      <div className="flex justify-between p-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-1 flex-col text-sm text-text-secondary-light ">
            Patient
            <div className="flex gap-2 items-center text-fg-secondary-light">
              <span className="text-sm text-text-primary-light font-medium">
                {patient.id} • {patient.fullName}
              </span>
            </div>
          </div>
          <FormProperty
            label="Full Name"
            value={patient.fullName}
            animate={Boolean(updatedValues?.fullName)}
          />
          <FormProperty
            label="Date of Birth"
            value={formatDate(patient?.dateOfBirth)?.toString() ?? ""}
            animate={Boolean(updatedValues?.dateOfBirth)}
          />
          <FormProperty
            label="Medical condition"
            value={patient.medicalCondition}
            animate={Boolean(updatedValues?.medicalCondition)}
          />
        </div>

        <div className="flex flex-col text-right gap-3">
          <FormProperty
            label="Gender"
            value={patient.gender}
            animate={Boolean(updatedValues?.gender)}
          />
          <FormProperty
            label="Address"
            value={patient.homeAddress}
            animate={Boolean(updatedValues?.homeAddress)}
          />
          <FormProperty
            label="Phone Number"
            value={patient.contactNumber}
            animate={Boolean(updatedValues?.contactNumber)}
          />
          <FormProperty
            label="Email"
            value={patient.emailAddress}
            animate={Boolean(updatedValues?.emailAddress)}
          />
        </div>
      </div>
      <div className=" p-4">
        <h3 className="text-text-primary-light">Emergency contact</h3>
        <div className="flex flex-row justify-between">
          <FormProperty
            label="Name"
            value={patient.emergencyContact.name}
            animate={Boolean(updatedValues?.emergencyContact?.name)}
          />
          <FormProperty
            label="Relation"
            value={patient.emergencyContact.relation}
            animate={Boolean(updatedValues?.emergencyContact?.relation)}
          />
          <FormProperty
            label="Contact Number"
            value={patient.emergencyContact.contactNumber}
            animate={Boolean(updatedValues?.emergencyContact?.contactNumber)}
          />
        </div>
      </div>
    </div>
  );
});

PatientLookupRecord.displayName = "PatientLookupRecord";

export default PatientLookupRecord;
