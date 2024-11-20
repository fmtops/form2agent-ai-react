import {
  Formik,
  Form,
  FieldArray,
  FormikValues,
  FormikHelpers,
  FormikProps,
} from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutline } from "@mui/icons-material";
import { InvoiceFormType } from "../../models/invoice-model";
import StyledField from "../common/form/styled-field";
export interface InvoiceFormProps {
  form: InvoiceFormType;
  setForm: Dispatch<SetStateAction<InvoiceFormType>>;
  formikRef: RefObject<FormikProps<InvoiceFormType>>;
}

const InvoiceForm = ({ form, setForm, formikRef }: InvoiceFormProps) => {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues & FormikHelpers<InvoiceFormType>) => {
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
        <h2 className={`text-text-primary-light font-medium`}>
          Invoice Information
        </h2>
        <div className="flex gap-4">
          <StyledField
            className={`w-1/2`}
            name="invoiceNumber"
            type="text"
            placeholder="Invoice Number"
            aria-label="Invoice Number"
            onBlur={handleBlur}
          />
          <StyledField
            className={`w-1/2`}
            name="invoiceDate"
            type="date"
            aria-label="Invoice Date"
            onBlur={handleBlur}
          />
        </div>
        <h2 className={`text-text-primary-light font-medium mt-4`}>
          Sender Details
        </h2>
        <StyledField
          name="from.companyName"
          type="text"
          placeholder="Company Name"
          aria-label="Company Name"
          onBlur={handleBlur}
        />
        <StyledField
          name="from.address"
          type="text"
          placeholder="Address"
          aria-label="Address"
          onBlur={handleBlur}
        />
        <div className="flex flex-wrap gap-y-4">
          <div className="w-full flex gap-4">
            <StyledField
              name="from.city"
              type="text"
              placeholder="City"
              aria-label="City"
              className="w-1/2"
              onBlur={handleBlur}
            />
            <StyledField
              name="from.state"
              type="text"
              placeholder="State"
              aria-label="State"
              className="w-1/2"
              onBlur={handleBlur}
            />
          </div>
          <div className="w-full flex gap-4">
            <StyledField
              name="from.postalCode"
              type="text"
              placeholder="Postal Code"
              aria-label="Postal Code"
              className="w-1/2"
              onBlur={handleBlur}
            />
            <StyledField
              name="from.country"
              type="text"
              placeholder="Country"
              aria-label="Country"
              className="w-1/2"
              onBlur={handleBlur}
            />
          </div>
        </div>

        <h2 className={`text-text-primary-light font-medium mt-4`}>
          Recipient Details
        </h2>
        <StyledField
          name="to.companyName"
          type="text"
          placeholder="Company Name"
          aria-label="Company Name"
          onBlur={handleBlur}
        />
        <StyledField
          name="to.address"
          type="text"
          placeholder="Address"
          aria-label="Address"
          onBlur={handleBlur}
        />
        <div className="w-full flex gap-4">
          <StyledField
            className="w-1/2"
            name="to.city"
            type="text"
            placeholder="City"
            aria-label="City"
            onBlur={handleBlur}
          />
          <StyledField
            className="w-1/2"
            name="to.state"
            type="text"
            placeholder="State"
            aria-label="State"
            onBlur={handleBlur}
          />
        </div>
        <div className="w-full flex gap-4">
          <StyledField
            className="w-1/2"
            name="to.postalCode"
            type="text"
            placeholder="Postal Code"
            aria-label="Postal Code"
            onBlur={handleBlur}
          />
          <StyledField
            className="w-1/2"
            name="to.country"
            type="text"
            placeholder="Country"
            aria-label="Country"
            onBlur={handleBlur}
          />
        </div>
        <h2 className={`text-text-primary-light font-medium mt-4`}>Products</h2>
        <FieldArray name="items">
          {({ remove, push }) => (
            <div>
              {values?.items?.length > 0 &&
                values.items.map((_: any, index: any) => (
                  <div
                    className="flex flex-wrap  items-center justify-between my-2 gap-x-3 gap-y-4"
                    key={index}
                  >
                    <div className="flex flex-wrap gap-4 items-center">
                      <StyledField
                        className={`flex-grow`}
                        name={`items.${index}.name`}
                        placeholder="Product Name"
                        aria-label={`Product Name.${index}`}
                        onBlur={handleBlur}
                      />
                      <StyledField
                        className={`min-w-16`}
                        name={`items.${index}.price`}
                        placeholder="Product Price"
                        aria-label={`Product Price.${index}`}
                        onBlur={handleBlur}
                      />
                      <StyledField // Added amount field
                        className={`min-w-32`}
                        name={`items.${index}.amount`}
                        placeholder="Amount"
                        aria-label={`Amount.${index}`}
                        onBlur={handleBlur}
                      />
                      <span className="font-bold">
                        Total: $
                        {Number(values.items[index].price) *
                          Number(values.items[index].amount) || 0}
                      </span>
                    </div>
                    <button
                      type="button"
                      className={` p-2  text-button-light`}
                      onClick={() => remove(index)}
                    >
                      <DeleteOutline />
                    </button>
                  </div>
                ))}

              <button
                className={`py-2 text-[#687EFF] flex items-center`}
                type="button"
                onClick={() => push({ name: "", price: "", amount: "" })} // Added amount
              >
                <AddIcon />
                Add Product
              </button>
              <div className="flex items-center py-4 font-bold">
                <span>
                  Total Cost: $
                  {values?.items?.length > 0 &&
                    values.items.reduce(
                      (sum: any, item: any) =>
                        sum + (Number(item.price) * Number(item.amount) || 0),
                      0
                    )}
                </span>
              </div>
            </div>
          )}
        </FieldArray>
      </Form>
    );
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<InvoiceFormType>>
          | undefined
      }
      initialValues={form}
      onSubmit={async (_, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setSubmitting(false);
        resetForm();
      }}
    >
      {(props) => <FormComponent {...props} />}
    </Formik>
  );
};

export default InvoiceForm;
