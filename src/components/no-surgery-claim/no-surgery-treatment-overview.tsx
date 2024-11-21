import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {
  Languages,
  NoSurgeryClaimContextFormType,
} from "../../models/no-surgery-claim-context-model";
import { NoSurgeryTreatmentOverviewFormType } from "../../models/no-surgery-claim-model";
import { Divider } from "@mui/material";
import useDetectDevice from "../../hooks/useDetectDevice";
import { TreatmentCenters } from "../../consts/patient-registration.consts";
import { SelectComponent } from "../common/form/select";

export interface TreatmentOverviewComponentProps {
  form: NoSurgeryTreatmentOverviewFormType;
  setForm: Dispatch<SetStateAction<NoSurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<NoSurgeryTreatmentOverviewFormType>>;
}

export const TreatmentOverviewComponent = ({
  form,
  setForm,
  formikRef,
}: TreatmentOverviewComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      treatmentOverview: {
        ...formikRef.current?.values,
      },
    }));
  };

  const handleTreatmentChange = (value: any) => {
    setForm((values) => ({
      ...values,
      treatmentOverview: {
        ...formikRef.current?.values,
        treatmentCenter: value.target.value,
      },
    }));
  };

  const handleLanguageChange = (value: any) => {
    setForm((values) => ({
      ...values,
      treatmentOverview: {
        ...formikRef.current?.values,
        language: value.target.value,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<NoSurgeryTreatmentOverviewFormType>>
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
          {...props}
          form={form}
          handleTreatmentChange={handleTreatmentChange}
          handleLanguageChange={handleLanguageChange}
          setForm={setForm}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: NoSurgeryTreatmentOverviewFormType;
  setForm: Dispatch<SetStateAction<NoSurgeryClaimContextFormType>>;
  handleBlur: () => void;
  handleTreatmentChange: (value: any) => void;
  handleLanguageChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<NoSurgeryTreatmentOverviewFormType>;
const FormComponent = ({
  setValues,
  form,
  handleBlur,
  handleLanguageChange,
  handleTreatmentChange,
}: FormComponentProps) => {
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  const { isAndroid, isIOS } = useDetectDevice();
  const mobileDatePicker = isAndroid() || isIOS() ? "h-11 dateInputCalc-1" : "";

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Treatment Overview</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <div className="gap-4 grid grid-cols-1">
            <div className="gap-4 grid grid-cols-2">
              <SelectComponent
                options={TreatmentCenters}
                name={nameof<NoSurgeryTreatmentOverviewFormType>(
                  "treatmentCenter"
                )}
                placeholder={"Treatment Facility"}
                value={form.treatmentCenter}
                onChange={handleTreatmentChange}
              />
              <StyledField
                name={nameof<NoSurgeryTreatmentOverviewFormType>(
                  "practicionerName"
                )}
                type="text"
                placeholder="Practitioner’s Full Name"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <SelectComponent
                options={Languages}
                name={nameof<NoSurgeryTreatmentOverviewFormType>("language")}
                placeholder={"Language of Therapy"}
                value={form.language}
                onChange={handleLanguageChange}
              />
            </div>
            <Divider />
            <div className="text-md font-medium">Treatment Period</div>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-4">
                <div>Start Date: </div>
                <StyledField
                  className={`text-text-placeholder-light ${mobileDatePicker}`}
                  name={nameof<NoSurgeryTreatmentOverviewFormType>(
                    "startTreatmentDate"
                  )}
                  label="Start Date"
                  type="date"
                  placeholder="Start Date"
                  onBlur={handleBlur}
                />
              </div>
              <div className="grid gap-4">
                <div>End Date: </div>
                <StyledField
                  className={`text-text-placeholder-light  ${mobileDatePicker}`}
                  name={nameof<NoSurgeryTreatmentOverviewFormType>(
                    "endTreatmentDate"
                  )}
                  label="End Date"
                  type="date"
                  placeholder="End Date"
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<NoSurgeryTreatmentOverviewFormType>(
                  "totalNumberOfSessions"
                )}
                type="text"
                placeholder="Total Number of Sessions Completed"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<NoSurgeryTreatmentOverviewFormType>(
                  "telesessionsNumber"
                )}
                type="text"
                placeholder="Telehealth Sessions"
                onBlur={handleBlur}
              />
            </div>
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
