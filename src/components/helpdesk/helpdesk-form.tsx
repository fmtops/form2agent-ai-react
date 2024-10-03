import {
  Formik,
  Form,
  Field,
  FormikValues,
  FormikHelpers,
  FormikProps,
} from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import {
  DepartmentOptions,
  HelpdeskFormType,
  HelpdeskPriority,
} from "../../models/helpdesk-model";
import StyledField from "../common/form/styled-field";
import { SelectChangeEvent } from "@mui/material";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import {
  UploadButton,
  VisuallyHiddenInput,
} from "../../consts/helpdesk.consts";
import { SelectComponent } from "../common/form/select";
export interface HelpdeskFormProps {
  form: HelpdeskFormType;
  setForm: Dispatch<SetStateAction<HelpdeskFormType>>;
  formikRef: RefObject<FormikProps<HelpdeskFormType>>;
}

export default function HelpdeskForm({
  form,
  setForm,
  formikRef,
}: HelpdeskFormProps) {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues &
    FormikHelpers<HelpdeskFormType> & {
      setForm: Dispatch<SetStateAction<HelpdeskFormType>>;
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
        <h2 className={` font-medium mt-8 text-black`}>Request Details</h2>
        <div className="flex gap-4">
          <SelectComponent
            className="w-1/2"
            options={Object.values(DepartmentOptions)}
            name="department"
            placeholder="Department"
            value={values.department}
            onChange={handleDepartmentChange}
          />
          <StyledField
            name="supervisorEmail"
            type="email"
            placeholder="Supervisor Email"
            aria-label="Supervisor Email"
            className="w-1/2"
            onBlur={handleBlur}
          />
        </div>
        <div className=" text-base mt-4 ">Priority Level</div>
        <div
          role="group"
          aria-labelledby="my-radio-group"
          className="flex gap-6"
        >
          <label>
            <Field
              type="radio"
              name="priority"
              value={HelpdeskPriority.LOW}
              className="mr-2"
            />
            Low
          </label>
          <label>
            <Field
              type="radio"
              name="priority"
              value={HelpdeskPriority.MEDIUM}
              className="mr-2"
            />
            Medium
          </label>
          <label>
            <Field
              type="radio"
              name="priority"
              value={HelpdeskPriority.HIGH}
              className="mr-2"
            />
            High
          </label>
          <label>
            <Field
              type="radio"
              name="priority"
              value={HelpdeskPriority.URGENT}
              className="mr-2"
            />
            Urgent
          </label>
        </div>
        <StyledField
          name="subject"
          type="text"
          placeholder="Subject"
          aria-label="Subject"
          onBlur={handleBlur}
        />
        <StyledField
          name="description"
          type="text"
          as="textarea"
          placeholder="Description"
          aria-label="Description"
          className="h-24"
          onBlur={handleBlur}
        />
        <h2 className={`font-medium mt-8 text-black`}>Attachment</h2>
        {/* TODO add file upload #42104 */}
        <UploadButton
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<BackupOutlinedIcon />}
          className="bg-green-200 w-fit"
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </UploadButton>
      </Form>
    );
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<HelpdeskFormType>>
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
