import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { Divider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import useDetectDevice from "../../hooks/useDetectDevice";
import { SurgeryPatientPersonalDataFormType } from "../../models/surgery-claim-model";
import {
  InsuranceProviders,
  SurgeryClaimContextFormType,
} from "../../models/surgery-claim-context-model";
import { SelectComponent } from "../common/form/select";
import { GenderOptionsExtended } from "../../consts/general-fields.consts";

export interface PatientInfoComponentProps {
  form: SurgeryPatientPersonalDataFormType;
  setForm: Dispatch<SetStateAction<SurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<SurgeryPatientPersonalDataFormType>>;
}

export const PatientInfoComponent = ({
  form,
  setForm,
  formikRef,
}: PatientInfoComponentProps) => {
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

  const handleInsuranceChange = (value: any) => {
    setForm((values) => ({
      ...values,
      patientInfo: {
        ...formikRef.current?.values,
        insuranceProvider: value.target.value,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<SurgeryPatientPersonalDataFormType>>
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
          handleInsuranceChange={handleInsuranceChange}
          handleGenderChange={handleGenderChange}
          setForm={setForm}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: SurgeryPatientPersonalDataFormType;
  setForm: Dispatch<SetStateAction<SurgeryClaimContextFormType>>;
  handleBlur: () => void;
  handleGenderChange: (value: any) => void;
  handleInsuranceChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<SurgeryPatientPersonalDataFormType>;
const FormComponent = ({
  setValues,
  form,
  handleBlur,
  handleGenderChange,
  handleInsuranceChange,
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
                name={nameof<SurgeryPatientPersonalDataFormType>("fullName")}
                type="text"
                placeholder="Full Name"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<SurgeryPatientPersonalDataFormType>("indentifier")}
                type="text"
                placeholder="Patient Identifier Number "
                onBlur={handleBlur}
              />
            </div>
            <div className="grid gap-4">
              <div>Date of birth: </div>
              <StyledField
                className={`text-text-placeholder-light w-1/2 md:w-1/4 ${mobileDatePicker}`}
                name={nameof<SurgeryPatientPersonalDataFormType>("dateOfBirth")}
                label="Date of birth"
                type="date"
                placeholder="Date of birth"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <SelectComponent
                options={GenderOptionsExtended}
                name={"gender"}
                placeholder={"Gender"}
                value={form.gender}
                onChange={handleGenderChange}
              />
              <StyledField
                name={nameof<SurgeryPatientPersonalDataFormType>("homeAddress")}
                type="text"
                placeholder="Address "
                onBlur={handleBlur}
              />
            </div>
            <Divider />
            <div className="text-md font-medium">Insurance</div>
            <div className="gap-4 grid grid-cols-2">
              <SelectComponent
                options={InsuranceProviders}
                name={nameof<SurgeryPatientPersonalDataFormType>(
                  "insuranceProvider"
                )}
                placeholder={"Insurance provider"}
                value={form.insuranceProvider}
                onChange={handleInsuranceChange}
              />
              <StyledField
                name={nameof<SurgeryPatientPersonalDataFormType>(
                  "policyNumber"
                )}
                type="text"
                placeholder="Policy ID"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<SurgeryPatientPersonalDataFormType>(
                  "claimReferenceNumber"
                )}
                type="text"
                placeholder="Claim Reference Number"
                onBlur={handleBlur}
              />
            </div>
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
