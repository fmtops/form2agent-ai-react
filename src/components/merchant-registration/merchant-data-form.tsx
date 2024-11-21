import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import StyledField from "../common/form/styled-field";
import {
  MerchantGeneralInformationFormType,
  MerchantRegistrationFormType,
} from "../../models/merchant-registration-model";
import { useLayout } from "../../contexts/LayoutContext";
import { nameof } from "../../helpers/property-helper";
export interface MerchantDataComponentProps {
  form: MerchantGeneralInformationFormType;
  setForm: Dispatch<SetStateAction<MerchantRegistrationFormType>>;
  formikRef: RefObject<FormikProps<MerchantGeneralInformationFormType>>;
}
export const MerchantDataComponent = ({
  form,
  setForm,
  formikRef,
}: MerchantDataComponentProps) => {
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
          | RefObject<FormikProps<MerchantGeneralInformationFormType>>
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
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  handleBlur: () => void;
} & FormikValues &
  FormikHelpers<MerchantGeneralInformationFormType>;

const FormComponent = ({
  setValues,
  form,
  handleBlur,
  values,
}: FormComponentProps) => {
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Merchant</div>
      <Form className="flex flex-col gap-y-4">
        <div className="gap-4 grid grid-cols-1">
          <StyledField
            name={nameof<MerchantGeneralInformationFormType>("dba")}
            type="text"
            placeholder="Name / Doing Business As (DBA)"
            onBlur={handleBlur}
          />
          <div className="gap-4 grid grid-cols-2">
            <StyledField
              name={nameof<MerchantGeneralInformationFormType>("addressLine1")}
              type="text"
              placeholder="Address Line 1"
              label="Address Line 1"
              onBlur={handleBlur}
            />
            <StyledField
              name={nameof<MerchantGeneralInformationFormType>("addressLine2")}
              type="text"
              placeholder="Address Line 2 (Optional)"
              onBlur={handleBlur}
            />
          </div>
          <StyledField
            name={nameof<MerchantGeneralInformationFormType>("zipCode")}
            type="text"
            placeholder="Zip Code"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<MerchantGeneralInformationFormType>("city")}
            type="text"
            placeholder="City"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<MerchantGeneralInformationFormType>("state")}
            type="text"
            placeholder="State"
            onBlur={handleBlur}
          />
        </div>
      </Form>
    </div>
  );
};
