import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { Divider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import useDetectDevice from "../../hooks/useDetectDevice";
import { SelectComponent } from "../common/form/select";
import { GenderOptionsExtended } from "../../consts/general-fields.consts";
import {
  Countries,
  NoSurgeryClaimContextFormType,
} from "../../models/no-surgery-claim-context-model";
import { NoSurgeryPatientPersonalDataFormType } from "../../models/no-surgery-claim-model";

export interface NoSurgeryPatientInfoComponentProps {
  form: NoSurgeryPatientPersonalDataFormType;
  setForm: Dispatch<SetStateAction<NoSurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<NoSurgeryPatientPersonalDataFormType>>;
}

export const NoSurgeryPatientInfoComponent = ({
  form,
  setForm,
  formikRef,
}: NoSurgeryPatientInfoComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      patientInfo: {
        ...formikRef.current?.values,
      },
    }));
  };

  const handleGenderChange = (value: any) => {
    setForm((values) => ({
      ...values,
      patientInfo: {
        ...formikRef.current?.values,
        gender: value.target.value,
      },
    }));
  };

  const handleCountryChange = (value: any) => {
    setForm((values) => ({
      ...values,
      patientInfo: {
        ...formikRef.current?.values,
        country: value.target.value,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<NoSurgeryPatientPersonalDataFormType>>
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
          handleCountryChange={handleCountryChange}
          handleGenderChange={handleGenderChange}
          setForm={setForm}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: NoSurgeryPatientPersonalDataFormType;
  setForm: Dispatch<SetStateAction<NoSurgeryClaimContextFormType>>;
  handleBlur: () => void;
  handleGenderChange: (value: any) => void;
  handleCountryChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<NoSurgeryPatientPersonalDataFormType>;
const FormComponent = ({
  setValues,
  form,
  handleBlur,
  handleGenderChange,
  handleCountryChange,
}: FormComponentProps) => {
  const { isAndroid, isIOS } = useDetectDevice();
  const mobileDatePicker = isAndroid() || isIOS() ? "h-11 dateInputCalc-1" : "";
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Patient</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <div className="gap-4 grid grid-cols-1">
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<NoSurgeryPatientPersonalDataFormType>("fullName")}
                type="text"
                placeholder="Full Name"
                onBlur={handleBlur}
              />
              <SelectComponent
                options={GenderOptionsExtended}
                name={"gender"}
                placeholder={"Gender"}
                value={form.gender}
                onChange={handleGenderChange}
              />
            </div>
            <div className="grid gap-4 grid-cols-1">
              <div className="grid gap-4 grid-cols-2">
                <div>Date of birth: </div>
                <div> </div>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <StyledField
                  className={`text-text-placeholder-light ${mobileDatePicker}`}
                  name={nameof<NoSurgeryPatientPersonalDataFormType>(
                    "dateOfBirth"
                  )}
                  label="Date of birth"
                  type="date"
                  placeholder="Date of birth"
                  onBlur={handleBlur}
                />
                <SelectComponent
                  options={Countries}
                  name={nameof<NoSurgeryPatientPersonalDataFormType>("country")}
                  placeholder={"Country"}
                  value={form.country}
                  onChange={handleCountryChange}
                />
              </div>
            </div>
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
