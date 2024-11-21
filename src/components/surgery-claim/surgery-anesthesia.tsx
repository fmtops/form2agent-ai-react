import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { Divider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { SurgeryAnesthesiaFormType } from "../../models/surgery-claim-model";
import {
  AdditionalSupportStaff,
  AnestheseologistNames,
  AnesthesiaTypes,
  SurgeryClaimContextFormType,
  SurgicalAssistantNames,
} from "../../models/surgery-claim-context-model";
import { SelectComponent } from "../common/form/select";

export interface AnesthesiaComponentProps {
  form: SurgeryAnesthesiaFormType;
  setForm: Dispatch<SetStateAction<SurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<SurgeryAnesthesiaFormType>>;
}

export const AnesthesiaComponent = ({
  form,
  setForm,
  formikRef,
}: AnesthesiaComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      anesthesia: {
        ...formikRef.current?.values,
      },
    }));
  };

  const handleAnesthesiaTypeChange = (value: any) => {
    setForm((values) => ({
      ...values,
      anesthesia: {
        ...formikRef.current?.values,
        anesthesiaType: value.target.value,
      },
    }));
  };

  const handleAnestheologistChange = (value: any) => {
    setForm((values) => ({
      ...values,
      anesthesia: {
        ...formikRef.current?.values,
        anestheologistName: value.target.value,
      },
    }));
  };

  const handleAssistantChange = (value: any) => {
    setForm((values) => ({
      ...values,
      anesthesia: {
        ...formikRef.current?.values,
        assistantName: value.target.value,
      },
    }));
  };

  const handleSupportChange = (value: any) => {
    setForm((values) => ({
      ...values,
      anesthesia: {
        ...formikRef.current?.values,
        additionalSupportStaff: value.target.value,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<SurgeryAnesthesiaFormType>>
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
          handleAnesthesiaTypeChange={handleAnesthesiaTypeChange}
          handleAnestheologistChange={handleAnestheologistChange}
          handleAssistantChange={handleAssistantChange}
          handleSupportChange={handleSupportChange}
          setForm={setForm}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: SurgeryAnesthesiaFormType;
  setForm: Dispatch<SetStateAction<SurgeryClaimContextFormType>>;
  handleBlur: () => void;
  handleAnesthesiaTypeChange: (value: any) => void;
  handleAnestheologistChange: (value: any) => void;
  handleAssistantChange: (value: any) => void;
  handleSupportChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<SurgeryAnesthesiaFormType>;
const FormComponent = ({
  setValues,
  form,
  handleBlur,
  handleAnesthesiaTypeChange,
  handleAnestheologistChange,
  handleAssistantChange,
  handleSupportChange,
}: FormComponentProps) => {
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Anesthesia</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <div className="gap-4 grid grid-cols-1">
            <div className="gap-4 grid grid-cols-2">
              <SelectComponent
                options={AnesthesiaTypes}
                name={nameof<SurgeryAnesthesiaFormType>("anesthesiaType")}
                placeholder={"Type of Anesthesia Used"}
                value={form.anesthesiaType}
                onChange={handleAnesthesiaTypeChange}
              />
              <SelectComponent
                options={AnestheseologistNames}
                name={nameof<SurgeryAnesthesiaFormType>("anestheologistName")}
                placeholder="Anesthesiologist Name"
                value={form.anestheologistName}
                onChange={handleAnestheologistChange}
              />
            </div>

            <Divider />
            <div className="text-md font-medium">Medical Team Members</div>
            <div className="gap-4 grid grid-cols-2">
              <SelectComponent
                options={SurgicalAssistantNames}
                name={nameof<SurgeryAnesthesiaFormType>("assistantName")}
                placeholder={"Surgical Assistant"}
                value={form.assistantName}
                onChange={handleAssistantChange}
              />
              <SelectComponent
                options={AdditionalSupportStaff}
                name={nameof<SurgeryAnesthesiaFormType>(
                  "additionalSupportStaff"
                )}
                placeholder="Additional Support Stuff"
                value={form.additionalSupportStaff}
                onChange={handleSupportChange}
              />
            </div>
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
