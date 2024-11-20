import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { SurgeryMedicalAdmissionFormType } from "../../models/surgery-claim-model";
import useDetectDevice from "../../hooks/useDetectDevice";
import { SurgeryClaimContextFormType } from "../../models/surgery-claim-context-model";
import { Divider } from "@mui/material";
import { TreatmentCenters } from "../../consts/patient-registration.consts";
import { SelectComponent } from "../common/form/select";
export interface MedicalAdmissionComponentProps {
  form: SurgeryMedicalAdmissionFormType;
  setForm: Dispatch<SetStateAction<SurgeryClaimContextFormType>>;
  formikRef: RefObject<FormikProps<SurgeryMedicalAdmissionFormType>>;
}
export const MedicalAdmissionComponent = ({
  form,
  setForm,
  formikRef,
}: MedicalAdmissionComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      medicalAdmission: {
        ...formikRef.current?.values,
      },
    }));
  };
  const handleMedicalCenterChange = (value: any) => {
    setForm((values) => ({
      ...values,
      medicalAdmission: {
        ...formikRef.current?.values,
        medicalCenter: value.target.value,
      },
    }));
  };
  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<SurgeryMedicalAdmissionFormType>>
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
          handleMedicalCenterChange={handleMedicalCenterChange}
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
  handleMedicalCenterChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<SurgeryMedicalAdmissionFormType>;

const FormComponent = ({
  setValues,
  form,
  handleBlur,
  values,
  handleMedicalCenterChange,
}: FormComponentProps) => {
  const { isAndroid, isIOS } = useDetectDevice();
  const mobileDatePicker = isAndroid() || isIOS() ? "h-11 dateInputCalc-1" : "";
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Hospital</div>
      <Form className="flex flex-col gap-y-4">
        <div className="gap-4 grid grid-cols-1">
          <div className="grid gap-4 grid-cols-1">
            <div className="grid gap-4 grid-cols-2">
              <div>Hospital Admission Date: </div>
              <div>Surgery Date: </div>
            </div>
            <div className="grid gap-4 grid-cols-2">
              <StyledField
                className={`text-text-placeholder-light ${mobileDatePicker}`}
                name={nameof<SurgeryMedicalAdmissionFormType>(
                  "hospitalAdmissionDate"
                )}
                label="Hospital Admission Date"
                type="date"
                placeholder="Hospital Admission Date"
                onBlur={handleBlur}
              />
              <StyledField
                className={`text-text-placeholder-light ${mobileDatePicker}`}
                name={nameof<SurgeryMedicalAdmissionFormType>("surgeryDate")}
                label="Surgery Date"
                type="date"
                placeholder="Surgery Date"
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1">
            <div className="grid gap-4 grid-cols-2">
              <div>Date of Discharge: </div>
              <div>Scheduled Follow-Up Date: </div>
            </div>
            <div className="grid gap-4 grid-cols-2">
              <StyledField
                className={`text-text-placeholder-light ${mobileDatePicker}`}
                name={nameof<SurgeryMedicalAdmissionFormType>(
                  "dateOfDischarge"
                )}
                label="Date of Discharge"
                type="date"
                placeholder="Date of Discharge"
                onBlur={handleBlur}
              />
              <StyledField
                className={`text-text-placeholder-light  ${mobileDatePicker}`}
                name={nameof<SurgeryMedicalAdmissionFormType>("followUpDate")}
                label="Scheduled Follow-Up Date"
                type="date"
                placeholder="Scheduled Follow-Up Date"
                onBlur={handleBlur}
              />
            </div>
          </div>
          <Divider />
          <div className="text-md font-medium">
            Patient Metrics at Admission
          </div>

          <div className="gap-4 grid grid-cols-2">
            <StyledField
              name={nameof<SurgeryMedicalAdmissionFormType>("bodyWeight")}
              type="text"
              placeholder="Body Weight"
              label="Body Weight"
              onBlur={handleBlur}
            />
            <StyledField
              name={nameof<SurgeryMedicalAdmissionFormType>("height")}
              type="text"
              placeholder="Height"
              label="Height"
              onBlur={handleBlur}
            />
          </div>
          <Divider />
          <div className="text-md font-medium">Treatment Facility</div>
          <div className="gap-4 grid grid-cols-2">
            <SelectComponent
              options={TreatmentCenters}
              name={nameof<SurgeryMedicalAdmissionFormType>("medicalCenter")}
              placeholder="Medical Center"
              value={form.medicalCenter}
              onChange={handleMedicalCenterChange}
            />
            <StyledField
              name={nameof<SurgeryMedicalAdmissionFormType>("leadSurgeon")}
              type="text"
              placeholder="Lead Surgeon"
              label="Lead Surgeon"
              onBlur={handleBlur}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};
