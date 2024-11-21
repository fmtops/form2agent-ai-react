import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { NoSurgeryClaimContextFormType } from "../../models/no-surgery-claim-context-model";
import { NoSurgeryOutcomesFormType } from "../../models/no-surgery-claim-model";
import { RadioGroupComponent } from "../common/form/radio-group";
import { YesNoNotApplicableOptions } from "../../consts/general-fields.consts";
export interface OutcomesComponentProps {
  form: NoSurgeryOutcomesFormType;
  setForm: Dispatch<SetStateAction<NoSurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<NoSurgeryOutcomesFormType>>;
}
export const NoSurgeryOutcomesComponent = ({
  form,
  setForm,
  formikRef,
}: OutcomesComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      outcomes: {
        ...formikRef.current?.values,
      },
    }));
  };
  const handleHasConditionImprovedChange = (value: any) => {
    setForm((values) => ({
      ...values,
      outcomes: {
        ...formikRef.current?.values,
        patientProgress: value,
      },
    }));
  };
  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<NoSurgeryOutcomesFormType>>
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
          handleHasConditionImprovedChange={handleHasConditionImprovedChange}
          setForm={setForm}
          {...props}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: NoSurgeryOutcomesFormType;
  handleHasConditionImprovedChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<NoSurgeryOutcomesFormType>;
const FormComponent = ({
  setValues,
  form,
  handleBlur,
  values,
  handleHasConditionImprovedChange,
}: FormComponentProps) => {
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Outcomes and Recommendations</div>
      <Form className="flex flex-col gap-y-4">
        <div className="gap-4 grid grid-cols-1">
          <div className="grid gap-4 grid-cols-2">
            <div className="grid gap-4">
              <RadioGroupComponent
                options={YesNoNotApplicableOptions}
                label={"Has the patient’s condition improved"}
                onChange={handleHasConditionImprovedChange}
                value={form.patientProgress}
                variant="horizontal"
              />
            </div>
            <div className="grid gap-4">
              <StyledField
                name={nameof<NoSurgeryOutcomesFormType>("notes")}
                type="text"
                as="textarea"
                className="h-24"
                placeholder="Practitioner Comments"
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
