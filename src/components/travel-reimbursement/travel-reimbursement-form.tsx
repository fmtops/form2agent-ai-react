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
import {
  ExpenseCategories,
  TravelReimbursementFormType,
} from "../../models/travel-reimbursement-model";
import StyledField from "../common/form/styled-field";
import {
  UploadButton,
  VisuallyHiddenInput,
} from "../../consts/helpdesk.consts";
import { Divider, SelectChangeEvent } from "@mui/material";
import { CloudDone, UploadOutlined } from "@mui/icons-material";
import useDetectDevice from "../../hooks/useDetectDevice";
import { SelectComponent } from "../common/form/select";

export interface TravelReimbursementFormProps {
  form: TravelReimbursementFormType;
  setForm: Dispatch<SetStateAction<TravelReimbursementFormType>>;
  formikRef: RefObject<FormikProps<TravelReimbursementFormType>>;
}

const TravelReimbursementForm = ({
  form,
  setForm,
  formikRef,
}: TravelReimbursementFormProps) => {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues & FormikHelpers<TravelReimbursementFormType>) => {
    const { isAndroid, isIOS } = useDetectDevice();
    const mobileDatePickerFull =
      isAndroid() || isIOS() ? "h-11 dateInputCalc-1" : "";
    const mobileDatePickerHalf =
      isAndroid() || isIOS() ? "h-11 dateInputCalc-2" : "";
    useEffect(() => {
      setValues(form);
    }, [form, setValues]);

    const handleUpload = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
      type: string
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        if (type === "receipt") {
          if (e.target.files) {
            form.expenseDetails[
              index
            ].expenseAttachment!.receiptUploadAttachment = file.name;
          }
        } else if (type === "invoice") {
          if (e.target.files) {
            form.expenseDetails[
              index
            ].expenseAttachment!.invoiceUploadAttachment = file.name;
          }
        }
        handleBlur();
      }
    };

    const handleAddItem = () => {
      form.expenseDetails.push({
        id: crypto.randomUUID(),
        dateOfExpense: "",
        vendorServiceProvider: "",
        expenseAmount: "",
        currency: "",
        paymentMethod: "",
        invoiceReceiptNumber: "",
        expenseCategory: "",
        expenseAttachment: {
          receiptUploadAttachment: "",
          invoiceUploadAttachment: "",
        },
      });
      handleBlur();
    };

    const handleRemoveItem = (index: number) => {
      form.expenseDetails.splice(index, 1);
      handleBlur();
    };

    const handleExpenseCategoryChange = (
      event: SelectChangeEvent,
      index: number
    ) => {
      let updatedForm = formikRef.current!.values;
      updatedForm.expenseDetails[index].expenseCategory = event.target
        .value as string;
      setForm(updatedForm);
      handleBlur();
    };

    const handleBlur = () => {
      setForm((values) => ({
        ...values,
        ...formikRef.current?.values,
      }));
    };

    return (
      <Form className="flex flex-col gap-y-4">
        <h2 className="text-text-primary-light font-medium">
          Personal Information
        </h2>
        <div className="flex gap-4">
          <StyledField
            className="w-1/2"
            name="personalInformation.fullName"
            type="text"
            placeholder="Full Name"
            aria-label="Full Name"
            onBlur={handleBlur}
          />
          <StyledField
            className="w-1/2"
            name="personalInformation.department"
            type="text"
            placeholder="Department"
            aria-label="Department"
            onBlur={handleBlur}
          />
        </div>
        <div className="flex gap-4">
          <StyledField
            className="w-1/2"
            name="personalInformation.positionTitle"
            type="text"
            placeholder="Position Title"
            aria-label="Position Title"
            onBlur={handleBlur}
          />
          <StyledField
            className="w-1/2"
            name="personalInformation.emailAddress"
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            onBlur={handleBlur}
          />
        </div>
        <div className="flex gap-4">
          <StyledField
            className="w-1/2"
            name="personalInformation.contactNumber"
            type="text"
            placeholder="Contact Number"
            aria-label="Contact Number"
            onBlur={handleBlur}
          />
          <StyledField
            className="w-1/2"
            name="personalInformation.bankAccountNumber"
            type="text"
            placeholder="Bank Account Number"
            aria-label="Bank Account Number"
            onBlur={handleBlur}
          />
        </div>

        <h2 className="text-text-primary-light font-medium mt-4">
          Travel Details
        </h2>
        <StyledField
          name="travelDetails.travelDestination"
          type="text"
          placeholder="Travel Desination"
          aria-label="Travel Destination"
          onBlur={handleBlur}
        />
        <StyledField
          name="travelDetails.purposeOfTravel"
          type="text"
          placeholder="Purpose of Travel"
          aria-label="Purpose of Travel"
          onBlur={handleBlur}
        />
        <div className="flex gap-4">
          <StyledField
            className={`w-1/2 ${mobileDatePickerHalf}`}
            name="travelDetails.dateOfDeparture"
            type="date"
            aria-label="Date of Departure"
            onBlur={handleBlur}
          />
          <StyledField
            className={`w-1/2 ${mobileDatePickerHalf}`}
            name="travelDetails.dateOfReturn"
            type="date"
            aria-label="Date of Return"
            onBlur={handleBlur}
          />
        </div>
        <h2 className="text-text-primary-light font-medium mt-4">
          Expense Details
        </h2>
        <FieldArray name="expenseDetails">
          {({ remove, push }) => (
            <div>
              {values?.expenseDetails?.length > 0 &&
                values.expenseDetails.map((item: any, index: any) => (
                  <div key={"expenseDetails." + item.id}>
                    <div className="flex flex-wrap items-center justify-between my-2 gap-x-4 gap-y-4">
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <StyledField
                            className={`flex-grow ${mobileDatePickerFull}`}
                            name={`expenseDetails.${index}.dateOfExpense`}
                            type="date"
                            placeholder="Date of Expense"
                            aria-label={`Date of Expense.${index}`}
                            onBlur={handleBlur}
                          />
                          <StyledField
                            className="flex-grow"
                            name={`expenseDetails.${index}.vendorServiceProvider`}
                            type="text"
                            placeholder="Vendor/Service Provider"
                            aria-label={`Vendor/Service Provider.${index}`}
                            onBlur={handleBlur}
                          />
                          <StyledField
                            className="min-w-16"
                            name={`expenseDetails.${index}.expenseAmount`}
                            type="text"
                            placeholder="Expense Amount"
                            aria-label={`Expense Amount.${index}`}
                            onBlur={handleBlur}
                          />
                          <StyledField
                            className="min-w-16"
                            name={`expenseDetails.${index}.currency`}
                            type="text"
                            placeholder="Currency"
                            aria-label={`Currency.${index}`}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <StyledField
                            className="min-w-16"
                            name={`expenseDetails.${index}.paymentMethod`}
                            type="text"
                            placeholder="Payment Method"
                            aria-label={`Payment Method.${index}`}
                            onBlur={handleBlur}
                          />
                          <StyledField
                            className="min-w-16"
                            name={`expenseDetails.${index}.invoiceReceiptNumber`}
                            type="text"
                            placeholder="Invoice/Receipt Number"
                            aria-label={`Invoice/Receipt Number.${index}`}
                            onBlur={handleBlur}
                          />
                          <SelectComponent
                            className={`min-w-16 ${mobileDatePickerFull}`}
                            options={Object.values(ExpenseCategories)}
                            name={`expenseDetails.${index}.expenseCategory`}
                            placeholder="Expense Category"
                            value={values.expenseDetails[index].expenseCategory}
                            onChange={(event) =>
                              handleExpenseCategoryChange(event, index)
                            }
                          />
                        </div>
                        <div className="flex gap-4">
                          <UploadButton
                            component="label"
                            role={undefined}
                            variant="outlined"
                            startIcon={
                              form.expenseDetails[index]?.expenseAttachment
                                ?.receiptUploadAttachment ? (
                                <CloudDone color="success" />
                              ) : (
                                <UploadOutlined />
                              )
                            }
                            tabIndex={-1}
                            className="bg-green-200 w-fit"
                          >
                            {form.expenseDetails[index]?.expenseAttachment
                              ?.receiptUploadAttachment
                              ? "Receipt uploaded"
                              : "Upload receipt"}
                            <VisuallyHiddenInput
                              type="file"
                              onChange={(e) =>
                                handleUpload(e, index, "receipt")
                              }
                            />
                          </UploadButton>
                          <UploadButton
                            component="label"
                            role={undefined}
                            variant="outlined"
                            startIcon={
                              form.expenseDetails[index]?.expenseAttachment
                                ?.invoiceUploadAttachment ? (
                                <CloudDone color="success" />
                              ) : (
                                <UploadOutlined />
                              )
                            }
                            tabIndex={-1}
                            className="bg-green-200 w-fit"
                          >
                            {form.expenseDetails[index]?.expenseAttachment
                              ?.invoiceUploadAttachment
                              ? "Invoice uploaded"
                              : "Upload invoice"}
                            <VisuallyHiddenInput
                              type="file"
                              onChange={(e) =>
                                handleUpload(e, index, "invoice")
                              }
                            />
                          </UploadButton>
                        </div>
                      </div>
                      <button
                        className="pr-4 text-button-light"
                        type="button"
                        onClick={() => {
                          remove(index);
                          handleRemoveItem(index);
                        }}
                      >
                        <DeleteOutline />
                      </button>
                    </div>
                    <Divider />
                  </div>
                ))}
              <button
                className={`py-2 text-[#687EFF] flex items-center ${mobileDatePickerFull}`}
                type="button"
                onClick={() => {
                  push({
                    dateOfExpense: "",
                    vendorServiceProvider: "",
                    expenseAmount: "",
                    currency: "",
                    paymentMethod: "",
                    invoiceReceiptNumber: "",
                    expenseCategory: "",
                    expenseAttachment: {
                      receiptUploadAttachment: "",
                      invoiceUploadAttachment: "",
                    },
                  });
                  handleAddItem();
                }}
              >
                <AddIcon />
                Add Expense
              </button>
            </div>
          )}
        </FieldArray>
        <h2 className="text-text-primary-light font-medium mt-4">
          Supervisor Approval
        </h2>
        <div className="flex gap-4">
          <StyledField
            className="w-1/2"
            name="approvalAndSubmission.approvingManagerName"
            type="text"
            placeholder="Approving Manager Name"
            aria-label="Approving Manager Name"
            onBlur={handleBlur}
          />
          <StyledField
            className="w-1/2"
            name="approvalAndSubmission.approvingManagerEmail"
            type="email"
            placeholder="Approving Manager Email"
            aria-label="Approving Manager Email"
            onBlur={handleBlur}
          />
        </div>

        <h2 className="text-text-primary-light font-medium mt-4">
          Additional Information
        </h2>
        <StyledField
          name="additionalInformation.notesComments"
          type="text"
          as="textarea"
          placeholder="Notes/Comments"
          aria-label="Notes/Comments"
          onBlur={handleBlur}
        />
      </Form>
    );
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<TravelReimbursementFormType>>
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

export default TravelReimbursementForm;
