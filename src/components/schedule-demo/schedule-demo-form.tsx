import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { ScheduleDemoFormType } from "../../models/schedule-demo-model";
import StyledField from "../common/form/styled-field";
export interface ScheduleDemoFormProps {
  form: ScheduleDemoFormType;
  setForm: Dispatch<SetStateAction<ScheduleDemoFormType>>;
  formikRef: RefObject<FormikProps<ScheduleDemoFormType>>;
}

export default function ScheduleDemoForm({
  form,
  setForm,
  formikRef,
}: ScheduleDemoFormProps) {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues &
    FormikHelpers<ScheduleDemoFormType> & {
      setForm: Dispatch<SetStateAction<ScheduleDemoFormType>>;
    }) => {
    useEffect(() => {
      setValues(form);
    }, [form, setValues]);

    const handleBlur = () => {
      setForm((values) => ({
        ...values,
        ...formikRef.current?.values,
      }));
    };

    return (
      <Form className="flex flex-col gap-y-4">
        <h2 className={`font-medium text-black`}>Contact form</h2>
        <p className={`text-textSecondary`}>
          Want to see our product in action? Fill out the form to schedule your
          demo.
        </p>
        <div className="flex gap-4">
          <StyledField
            name="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="w-1/2"
            onBlur={handleBlur}
          />
          <StyledField
            name="firstName"
            type="text"
            placeholder="Name"
            aria-label="Name"
            className="w-1/2"
            onBlur={handleBlur}
          />
        </div>
        <StyledField
          name="company"
          type="text"
          placeholder="Company"
          aria-label="Company"
          onBlur={handleBlur}
        />
        <StyledField
          name="projectDetails"
          type="text"
          as="textarea"
          placeholder="Details of Your Project"
          aria-label="Details of Your Project"
          className="h-24"
          onBlur={handleBlur}
        />
      </Form>
    );
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<ScheduleDemoFormType>>
          | undefined
      }
      initialValues={form}
      onSubmit={async (_, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setSubmitting(false);
        resetForm();
      }}
    >
      {(props) => <FormComponent {...props} setForm={setForm} />}
    </Formik>
  );
}
