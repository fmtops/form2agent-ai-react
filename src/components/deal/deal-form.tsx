import {
  Formik,
  Form,
  FormikValues,
  FormikHelpers,
  FormikProps,
  Field,
} from "formik";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import StyledField from "../common/form/styled-field";
import { InputAdornment, SelectChangeEvent, TextField } from "@mui/material";
import {
  Currency,
  DealFormType,
  DealStage,
  OrganisationData,
} from "../../models/deal-model";
import { SelectComponent } from "../common/form/select";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { OrganisationDatas, Organisations } from "../../consts/deal.consts";
import { DatepickerComponent } from "../common/form/datepicker";

export interface HelpdeskFormProps {
  form: DealFormType;
  setForm: Dispatch<SetStateAction<DealFormType>>;
  formikRef: RefObject<FormikProps<DealFormType>>;
}

export default function DealForm({
  form,
  setForm,
  formikRef,
}: HelpdeskFormProps) {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues &
    FormikHelpers<DealFormType> & {
      setForm: Dispatch<SetStateAction<DealFormType>>;
    }) => {
    const [selectedOrganisation, setSelectedOrganisation] =
      useState<OrganisationData>(
        OrganisationDatas.find(
          (organisation) => organisation.name === form.organization
        )!
      );
    useEffect(() => {
      setValues(form);
      if (form.organization !== selectedOrganisation?.name)
        setSelectedOrganisation(
          OrganisationDatas.find(
            (organisation) => organisation.name === form.organization
          )!
        );
    }, [form, setValues]);
    const handleCurrencyChange = (event: SelectChangeEvent) => {
      setForm(() => ({
        ...formikRef.current!.values,
        currency: event.target.value as string,
      }));
    };

    const handleOrganisationChange = (event: SelectChangeEvent) => {
      setForm(() => ({
        ...formikRef.current!.values,
        organization: event.target.value as string,
      }));
    };
    const handleStageChange = (event: SelectChangeEvent) => {
      setForm(() => ({
        ...formikRef.current!.values,
        stage: event.target.value as DealStage,
      }));
    };

    const handleBlur = () => {
      setForm((values) => ({
        ...values,
        ...formikRef.current?.values,
      }));
    };

    const handleStartingDateChange = (date: Date | null) => {
      try {
        const dateStr = date?.toISOString();
        setValues(() => ({
          ...form,
          startingDate: dateStr ?? "",
        }));
      } catch (e) {
        console.error(e);
      }
    };

    const handleClosingDateChange = (date: Date | null) => {
      try {
        const dateStr = date?.toISOString();
        setValues(() => ({
          ...form,
          closingDate: dateStr ?? "",
        }));
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <SelectComponent
            options={Organisations}
            name={"organisation"}
            placeholder={"Organisation"}
            value={form.organization}
            onChange={handleOrganisationChange}
          />
          <div className="flex gap-4">
            <StyledField
              name="value"
              type="text"
              className="w-1/2"
              value={selectedOrganisation?.contact}
              readOnly
            />
            <StyledField
              name="value"
              type="text"
              className="w-1/2"
              value={selectedOrganisation?.email}
              readOnly
            />
          </div>
          <StyledField
            name="value"
            type="text"
            value={selectedOrganisation?.address}
            readOnly
          />
          <h2 className={` font-medium text-black`}>Deal information</h2>
          <div className="flex gap-4">
            <TextField
              name="value"
              type="number"
              label="Value"
              placeholder="Value"
              aria-label="Value"
              className="p-2.5 px-3 rounded-md border-bg-active-light border-[1px] bg-white text-black w-1/2"
              onBlur={handleBlur}
              value={values?.value}
              onChange={(e) =>
                setValues(() => ({
                  ...form,
                  value: Number(e.target.value),
                }))
              }
            />
            <SelectComponent
              className="w-1/2"
              options={Object.values(Currency)}
              name="currency"
              placeholder="Currency"
              value={values.currency}
              onChange={handleCurrencyChange}
            />
          </div>
          <div className="flex gap-4">
            <Field name="probability">
              {({ field, form, meta }: any) => (
                <TextField
                  {...field}
                  {...form}
                  {...meta}
                  size="small"
                  type="number"
                  name="probability"
                  label="Probability"
                  placeholder="Probability"
                  aria-label="Probability"
                  onBlur={handleBlur}
                  className={`p-2.5 px-3 rounded-md border-bg-active-light border-[1px] bg-white text-black w-1/2 h-full`}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                    style: {
                      height: "48px",
                    },
                  }}
                />
              )}
            </Field>

            <SelectComponent
              className="w-1/2"
              options={Object.values(DealStage)}
              name="stage"
              placeholder="Deal stage"
              value={values.stage}
              onChange={handleStageChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative mac-os-input w-1/2">
              <div className="text-sm">Expected starting date</div>
              <DatepickerComponent
                value={form?.startingDate}
                handleDateChange={handleStartingDateChange}
              />
            </div>
            <div className="relative mac-os-input w-1/2">
              <div className="text-sm">Expected closing date</div>
              <DatepickerComponent
                value={form?.closingDate}
                handleDateChange={handleClosingDateChange}
              />
            </div>
          </div>

          <StyledField
            name="referedBy"
            type="referedBy"
            placeholder="Referred By"
            aria-label="Referred By"
            onBlur={handleBlur}
          />
          <StyledField
            name="note"
            type="text"
            placeholder="Note"
            aria-label="Note"
            className="h-24"
            as="textarea"
            onBlur={handleBlur}
          />
        </Form>
      </LocalizationProvider>
    );
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as RefObject<FormikProps<DealFormType>> | undefined
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
