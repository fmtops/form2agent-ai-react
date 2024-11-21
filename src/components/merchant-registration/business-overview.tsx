import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  BusinessOverviewFormType as BusinessOverviewFormType,
  MerchantRegistrationFormType,
} from "../../models/merchant-registration-model";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { Divider } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import useDetectDevice from "../../hooks/useDetectDevice";

export interface BusinessOverviewComponentProps {
  form: BusinessOverviewFormType;
  setForm: Dispatch<SetStateAction<MerchantRegistrationFormType>>;
  formikRef: RefObject<FormikProps<BusinessOverviewFormType>>;
}
export const BusinessOverviewComponent = ({
  form,
  setForm,
  formikRef,
}: BusinessOverviewComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      businessOverview: {
        ...formikRef.current?.values,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<BusinessOverviewFormType>>
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
  form: BusinessOverviewFormType;
} & FormikValues &
  FormikHelpers<BusinessOverviewFormType>;

const FormComponent = ({ setValues, form, handleBlur }: FormComponentProps) => {
  const { isAndroid, isIOS } = useDetectDevice();
  const mobileDatePicker = isAndroid() || isIOS() ? "h-11 dateInputCalc-2" : "";
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Product & Sales</div>
      <p className={`text-textSecondary`}>
        Provide information about your product and sales overview
      </p>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <div className="gap-4 grid grid-cols-1">
            <div className="grid gap-4">
              <div>Business Opened Date: </div>
              <StyledField
                className={`text-text-placeholder-light w-1/2 md:w-1/4 ${mobileDatePicker}`}
                name={nameof<BusinessOverviewFormType>("businessOpenedDate")}
                label="Business Opened Date"
                type="date"
                placeholder="Business Opened Date"
                onBlur={handleBlur}
              />
            </div>

            <StyledField
              name={nameof<BusinessOverviewFormType>("productDescription")}
              type="text"
              as="textarea"
              className="h-24"
              placeholder="Product Description"
              onBlur={handleBlur}
            />
            <Divider />
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<BusinessOverviewFormType>("totalAnnualSales")}
                type="text"
                placeholder="Total Annual Sales ($)"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<BusinessOverviewFormType>("percentCardSales")}
                type="text"
                placeholder="Percent of Card Sales (%)"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<BusinessOverviewFormType>("maxAmountPerItem")}
                type="text"
                placeholder="Max Amount Per Item ($)"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<BusinessOverviewFormType>("averageAmountPerSale")}
                type="text"
                placeholder="Average Amount Per Sale ($)"
                onBlur={handleBlur}
              />
            </div>
            <Divider />
            <StyledField
              name={nameof<BusinessOverviewFormType>("returnPolicyDescription")}
              type="text"
              as="textarea"
              className="h-24"
              placeholder="Describe your Return / Guarantee / Refund Policy"
              onBlur={handleBlur}
            />
            <StyledField
              name={nameof<BusinessOverviewFormType>(
                "sellingProcessDescription"
              )}
              type="text"
              as="textarea"
              className="h-24"
              placeholder="Describe your selling process"
              onBlur={handleBlur}
            />
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
