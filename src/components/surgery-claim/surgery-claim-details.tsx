import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { SurgeryClaimContextFormType } from "../../models/surgery-claim-context-model";
import { SubmissionDetailsFormType } from "../../models/surgery-claim-model";

export interface ClaimDetailsComponentProps {
  form: SubmissionDetailsFormType;
  setForm: Dispatch<SetStateAction<SurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<SubmissionDetailsFormType>>;
}

export const ClaimDetailsComponent = ({
  form,
  setForm,
  formikRef,
}: ClaimDetailsComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      surgeryClaimDetails: {
        ...formikRef.current?.values,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<SubmissionDetailsFormType>>
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
          setForm={setForm}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: SubmissionDetailsFormType;
  setForm: Dispatch<SetStateAction<SurgeryClaimContextFormType>>;
  handleBlur: () => void;
} & FormikValues &
  FormikHelpers<SubmissionDetailsFormType>;
const FormComponent = ({ setValues, form, handleBlur }: FormComponentProps) => {
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Claim Submission Details</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <div className="gap-4 grid grid-cols-1">
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<SubmissionDetailsFormType>("contactPersonName")}
                type="text"
                placeholder="Contact Person for Follow-up"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<SubmissionDetailsFormType>("contactPersonEmail")}
                type="text"
                placeholder="Contact Person Email"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<SubmissionDetailsFormType>("contactPersonPhone")}
                type="text"
                placeholder="Contact Person Phone number"
                onBlur={handleBlur}
              />
            </div>
            <StyledField
              name={nameof<SubmissionDetailsFormType>("additionalNotes")}
              type="text"
              as="textarea"
              placeholder="Additional Notes or Comments"
              onBlur={handleBlur}
            />
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
