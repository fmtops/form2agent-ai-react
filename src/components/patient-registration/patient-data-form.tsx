import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import {
  GenderOptions,
  IPAD_LABEL_HIDE,
  IPAD_LABEL_SHOW,
  Partners,
  Race,
  TreatmentCenters,
} from "../../consts/patient-registration.consts";
import { RadioGroupComponent } from "../common/form/radio-group";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import StyledField from "../common/form/styled-field";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { SelectComponent } from "../common/form/select";
import {
  PatientPersonalDataFormType,
  PatientRegistrationFormType,
} from "../../models/patient-registration-model";
import useDetectDevice from "../../hooks/useDetectDevice";
import { useLayout } from "../../contexts/LayoutContext";
export interface PatientDataComponentProps {
  form: PatientPersonalDataFormType;
  setForm: Dispatch<SetStateAction<PatientRegistrationFormType>>;
  formikRef: RefObject<FormikProps<PatientPersonalDataFormType>>;
}
export const PatientDataComponent = ({
  form,
  setForm,
  formikRef,
}: PatientDataComponentProps) => {
  const handleGenderChange = (value: any) => {
    setForm((values) => ({
      ...values,
      personalData: {
        ...formikRef.current?.values,
        gender: value,
      },
    }));
  };

  const handleRaceChange = (value: any) => {
    setForm((values) => ({
      ...values,
      personalData: {
        ...formikRef.current?.values,
        race: value,
      },
    }));
  };

  const handlePartnerChange = (value: any) => {
    setForm((values) => ({
      ...values,
      personalData: {
        ...formikRef.current?.values,
        partner: value.target.value,
      },
    }));
  };
  const handleTreatmentCenterChange = (value: any) => {
    setForm((values) => ({
      ...values,
      personalData: {
        ...formikRef.current?.values,
        treatmentCenter: value.target.value,
      },
    }));
  };

  const handleDobUnknownChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((values) => ({
      ...values,
      personalData: {
        ...formikRef.current?.values,
        dobUnknown: event.target.checked,
        dob: "",
      },
    }));
  };

  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      personalData: {
        ...formikRef.current?.values,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<PatientPersonalDataFormType>>
          | undefined
      }
      validationSchema={null}
      initialValues={form}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setSubmitting(false);
        resetForm();
      }}
    >
      {(props) => (
        <FormComponent
          form={form}
          setForm={setForm}
          {...props}
          handleBlur={handleBlur}
          handleTreatmentCenterChange={handleTreatmentCenterChange}
          handleGenderChange={handleGenderChange}
          handlePartnerChange={handlePartnerChange}
          handleDobUnknownChange={handleDobUnknownChange}
          handleRaceChange={handleRaceChange}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  handleBlur: () => void;
  handlePartnerChange: (value: any) => void;
  handleTreatmentCenterChange: (value: any) => void;
  handleGenderChange: (value: any) => void;
  handleDobUnknownChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRaceChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<PatientPersonalDataFormType>;

const FormComponent = ({
  setValues,
  form,
  handleBlur,
  handlePartnerChange,
  handleTreatmentCenterChange,
  handleGenderChange,
  handleDobUnknownChange,
  handleRaceChange,
  values,
}: FormComponentProps) => {
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);
  const { isAndroid, isIOS } = useDetectDevice();
  const { isChatExpanded, isNavbarExpanded } = useLayout();

  const iPadLabelVisible =
    !isAndroid() &&
    IPAD_LABEL_HIDE > window.innerWidth &&
    window.innerWidth > IPAD_LABEL_SHOW
      ? "block"
      : "none";

  const pdGridRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "md-chat:grid-cols-2"
      : isChatExpanded
        ? "sm-chat:grid-cols-2"
        : isNavbarExpanded
          ? "md:grid-cols-2"
          : "sm:grid-cols-2";
  const bdGridRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "lg-chat:grid-cols-2"
      : isChatExpanded
        ? "md-chat:grid-cols-2"
        : isNavbarExpanded
          ? "lg:grid-cols-2"
          : "md:grid-cols-2";

  const personalDataGridClasses = `gap-4 grid grid-cols-1 ${pdGridRespClasses}`;
  const birthdateGridClasses = `gap-4 items-end grid grid-cols-1 ${bdGridRespClasses}`;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Personal Data</div>
      <Form className="flex flex-col gap-y-4">
        <div className={personalDataGridClasses}>
          <div className="relative mac-os-input">
            <div
              className="text-sm"
              style={{
                display: iPadLabelVisible,
              }}
            >
              Evaluation Date
            </div>
            <StyledField
              className={`w-full`}
              style={{ height: "44px", minWidth: "calc(100% - 26px)" }}
              name="evaluationDate"
              type="date"
              onBlur={handleBlur}
            />
            {(isAndroid() || isIOS()) && values.evaluationDate === "" && (
              <div
                className={`absolute top-1/2 ${
                  iPadLabelVisible === "block" ? "mt-[10px]" : ""
                } transform left-3 -translate-y-1/2 text-text-placeholder-light`}
                style={{ pointerEvents: "none" }}
              >
                Evaluation Date
              </div>
            )}
          </div>
          <SelectComponent
            options={Partners}
            name={"partner"}
            placeholder={"Partner"}
            value={form.partner}
            onChange={handlePartnerChange}
          />
          <SelectComponent
            options={TreatmentCenters}
            name={"treatmentCenter"}
            placeholder={"Treatment Center"}
            value={form.treatmentCenter}
            onChange={handleTreatmentCenterChange}
          />
          <StyledField
            name="patientRecordNumber"
            type="text"
            placeholder="Patient Record Number"
            onBlur={handleBlur}
          />
          <StyledField
            name="patientRecordNumberLocal"
            type="text"
            placeholder="Patient Record Number in Local Records"
            onBlur={handleBlur}
          />
          <StyledField
            name="firstName"
            type="text"
            placeholder="First Name"
            onBlur={handleBlur}
          />
          <StyledField
            name="lastName"
            type="text"
            placeholder="Last Name"
            onBlur={handleBlur}
          />
          <StyledField
            name="middleName"
            type="text"
            placeholder="Middle Name (Optional)"
            onBlur={handleBlur}
          />
          <span className="w-1/2"></span>
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={GenderOptions}
            label={"Gender"}
            onChange={handleGenderChange}
            value={form.gender}
            variant="horizontal"
          />
        </div>
        <div className={birthdateGridClasses}>
          <div className="relative h-fit mac-os-input">
            <div
              className="text-sm"
              style={{
                display: iPadLabelVisible,
              }}
            >
              Date of birth
            </div>
            <StyledField
              className={`w-full`}
              style={{ height: "44px", minWidth: "calc(100% - 26px)" }}
              name="dateOfBirth"
              type="date"
              placeholder="dd/mm/yyyy"
            />
            {(isAndroid() || isIOS()) && values.dateOfBirth === "" && (
              <div
                className={`absolute top-1/2  ${
                  iPadLabelVisible === "block" ? "mt-[10px]" : ""
                } transform left-3 -translate-y-1/2 text-text-placeholder-light`}
                style={{ pointerEvents: "none" }}
              >
                Date of Birth
              </div>
            )}
          </div>

          <FormGroup>
            <FormControlLabel
              className="checkbox-label"
              control={
                <Checkbox
                  checked={form.dobUnknown}
                  onChange={handleDobUnknownChange}
                />
              }
              label="Estimated birth date. Exact date unknown."
            />
          </FormGroup>
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={Race}
            label={"Race"}
            onChange={handleRaceChange}
            value={form.race}
            variant="horizontal"
          />
        </div>
        <div className={personalDataGridClasses}>
          <StyledField
            name="address"
            type="text"
            placeholder="Address"
            onBlur={handleBlur}
          />
          <StyledField
            name="postalCode"
            type="text"
            placeholder="Postal Code"
            onBlur={handleBlur}
          />
          <StyledField
            name="city"
            type="text"
            placeholder="City"
            onBlur={handleBlur}
          />
          <StyledField
            name="state"
            type="text"
            placeholder="State"
            onBlur={handleBlur}
          />
          <StyledField
            name="phone"
            type="text"
            placeholder="Phone 1 (+1-222-222-2222)"
            onBlur={handleBlur}
          />
          <StyledField
            name="phoneSecondary"
            type="text"
            placeholder="Phone 2 (+1-222-222-2222) (Optional)"
            onBlur={handleBlur}
          />
        </div>
      </Form>
    </div>
  );
};
