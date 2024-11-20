import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {
  SurgeryClaimContextFormType,
  SurgicalProcedures,
} from "../../models/surgery-claim-context-model";
import { SurgeryDetailsFormType } from "../../models/surgery-claim-model";
import { SelectComponent } from "../common/form/select";

export interface SurgeryDetailsComponentProps {
  form: SurgeryDetailsFormType;
  setForm: Dispatch<SetStateAction<SurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<SurgeryDetailsFormType>>;
}
export const SurgeryDetailsComponent = ({
  form,
  setForm,
  formikRef,
}: SurgeryDetailsComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      surgeryDetails: {
        ...formikRef.current?.values,
      },
    }));
  };

  const handlePrimarySurgicalChange = (value: any) => {
    setForm((values) => ({
      ...values,
      surgeryDetails: {
        ...formikRef.current?.values,
        primaryProcedure: value.target.value,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<SurgeryDetailsFormType>>
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
          handlePrimarySurgicalChange={handlePrimarySurgicalChange}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: SurgeryDetailsFormType;
  handlePrimarySurgicalChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<SurgeryDetailsFormType>;

const FormComponent = ({
  setValues,
  form,
  handleBlur,
  handlePrimarySurgicalChange,
}: FormComponentProps) => {
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Details of Procedures Performed</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <div className="gap-4 grid grid-cols-1">
            <SelectComponent
              options={SurgicalProcedures}
              name={nameof<SurgeryDetailsFormType>("primaryProcedure")}
              placeholder="Primary Surgical Procedure"
              value={form.primaryProcedure}
              onChange={handlePrimarySurgicalChange}
            />
            <StyledField
              name={nameof<SurgeryDetailsFormType>("additionalProcedures")}
              type="text"
              as="textarea"
              className="h-24"
              placeholder="Additional Procedures Conducted"
              onBlur={handleBlur}
            />
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
