import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { DepartmentOptions } from "../../models/helpdesk-model";
import StyledField from "../common/form/styled-field";
import { SelectChangeEvent } from "@mui/material";
import { CheckinFormType } from "../../models/checkin-model";
export interface HelpdeskFormProps {
  form: CheckinFormType;
  setForm: Dispatch<SetStateAction<CheckinFormType>>;
  formikRef: RefObject<FormikProps<CheckinFormType>>;
}

export default function CheckinForm({
  form,
  setForm,
  formikRef,
}: HelpdeskFormProps) {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues &
    FormikHelpers<CheckinFormType> & {
      setForm: Dispatch<SetStateAction<CheckinFormType>>;
    }) => {
    useEffect(() => {
      setValues(form);
    }, [form, setValues]);

    const handleDepartmentChange = (event: SelectChangeEvent) => {
      setForm(() => ({
        ...formikRef.current?.values,
        department: event.target.value as DepartmentOptions,
      }));
    };

    const handleBlur = () => {
      setForm((values) => ({
        ...values,
        ...formikRef.current?.values,
      }));
    };

    return (
      <Form className="flex flex-col gap-y-4">
        <h2 className={` font-medium text-black`}>Personal Information</h2>
        <div className="flex gap-4">
          <StyledField
            name="firstName"
            type="text"
            placeholder="First Name"
            aria-label="First Name"
            className="w-1/2"
            onBlur={handleBlur}
          />
          <StyledField
            name="lastName"
            type="text"
            placeholder="Last Name"
            aria-label="Last Name"
            className="w-1/2"
            onBlur={handleBlur}
          />
        </div>
        <StyledField
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          onBlur={handleBlur}
        />
        <StyledField
          name="contactNumber"
          type="text"
          placeholder="Contact Number"
          aria-label="Contact Number"
          onBlur={handleBlur}
        />
        <StyledField
          name="address"
          type="text"
          placeholder="Address"
          aria-label="Address"
          onBlur={handleBlur}
        />
      </Form>
    );
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<CheckinFormType>>
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
