import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { nameof } from "../../helpers/property-helper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { SelectComponent } from "../common/form/select";
import {
  GoalsForTreatments,
  NoSurgeryClaimContextFormType,
  TherapyFrequency,
  Treatments,
} from "../../models/no-surgery-claim-context-model";
import { NoSurgeryGoalsFormType } from "../../models/no-surgery-claim-model";

export interface NoSurgeryGoalsComponentProps {
  form: NoSurgeryGoalsFormType;
  setForm: Dispatch<SetStateAction<NoSurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<NoSurgeryGoalsFormType>>;
}
export const NoSurgeryGoalsComponent = ({
  form,
  setForm,
  formikRef,
}: NoSurgeryGoalsComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      goals: {
        ...formikRef.current?.values,
      },
    }));
  };

  const handleFrequencyChange = (value: any) => {
    setForm((values) => ({
      ...values,
      goals: {
        ...formikRef.current?.values,
        frequency: value.target.value,
      },
    }));
  };
  const handleTreatmentChange = (value: any) => {
    setForm((values) => ({
      ...values,
      goals: {
        ...formikRef.current?.values,
        treatmentModel: value.target.value,
      },
    }));
  };
  const handleGoalsChange = (value: any) => {
    setForm((values) => ({
      ...values,
      goals: {
        ...formikRef.current?.values,
        goalsForTreatment: value.target.value,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<NoSurgeryGoalsFormType>>
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
          handleTreatmentChange={handleTreatmentChange}
          handleFrequencyChange={handleFrequencyChange}
          handleGoalsChange={handleGoalsChange}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: NoSurgeryGoalsFormType;
  handleTreatmentChange: (value: any) => void;
  handleFrequencyChange: (value: any) => void;
  handleGoalsChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<NoSurgeryGoalsFormType>;

const FormComponent = ({
  setValues,
  form,
  handleBlur,
  handleTreatmentChange,
  handleFrequencyChange,
  handleGoalsChange,
}: FormComponentProps) => {
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Therapy Structure and Goals</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <div className="gap-4 grid grid-cols-1">
            <div className="gap-4 grid grid-cols-2">
              <SelectComponent
                options={Treatments}
                name={nameof<NoSurgeryGoalsFormType>("treatmentModel")}
                placeholder="Treatment Model Used"
                value={form.treatmentModel}
                onChange={handleTreatmentChange}
              />
              <SelectComponent
                options={TherapyFrequency}
                name={nameof<NoSurgeryGoalsFormType>("frequency")}
                placeholder="Frequency of Therapy"
                value={form.frequency}
                onChange={handleFrequencyChange}
              />
            </div>
            <SelectComponent
              options={GoalsForTreatments}
              name={nameof<NoSurgeryGoalsFormType>("goalsForTreatment")}
              placeholder="Goals for Treatment"
              value={form.goalsForTreatment}
              onChange={handleGoalsChange}
            />
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
