import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import {
  DiagnosisFormType,
  PatientRegistrationFormType,
} from "../../models/patient-registration-model";
import StyledField from "../common/form/styled-field";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { RadioGroupComponent } from "../common/form/radio-group";
import {
  abnormalitiesAreas,
  cleftLipTypeOptions,
  cleftPalateTypeOptions,
  surgeryOptions,
} from "../../consts/patient-registration.consts";
import { CheckboxGroupComponent } from "../common/form/checkbox-group";
import { useLayout } from "../../contexts/LayoutContext";
import { YesNoOptions, YesNoIDKOptions } from "../../consts/general-fields.consts";

export interface DiagnosisComponentProps {
  form: DiagnosisFormType;
  setForm: Dispatch<SetStateAction<PatientRegistrationFormType>>;
  formikRef: RefObject<FormikProps<DiagnosisFormType>>;
}

export const DiagnosisComponent = ({
  form,
  setForm,
  formikRef,
}: DiagnosisComponentProps) => {
  const handleSurgeryBeforeChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        surgeryBefore: value,
        surgeryType: value === "No" ? "" : values.diagnosis.surgeryType,
      },
    }));
  };

  const handleSurgeryTypeChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        surgeryType: value,
      },
    }));
  };

  const handleLipTypeOfCleftLeftChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        lipTypeOfCleftLeft: value,
      },
    }));
  };

  const handleLipTypeOfCleftRightChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        lipTypeOfCleftRight: value,
      },
    }));
  };

  const handleAlveolusTypeOfCleftLeftChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        alveolusTypeOfCleftLeft: value,
      },
    }));
  };

  const handleAlveolusTypeOfCleftRightChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        alveolusTypeOfCleftRight: value,
      },
    }));
  };

  const handlePalateHardTypeOfCleftLeftChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        palateHardTypeOfCleftLeft: value,
      },
    }));
  };

  const handlePalateHardTypeOfCleftRightChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        palateHardTypeOfCleftRight: value,
      },
    }));
  };

  const handlePalateSoftTypeOfCleftLeftChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        palateSoftTypeOfCleft: value,
      },
    }));
  };

  const handleAdditionalCraniofacialDeformitiesChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        additionalCraniofacialDeformities: value,
      },
    }));
  };

  const handleAnyAllergiesChange = (value: any) => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
        anyAllergies: value,
      },
    }));
  };

  const handleAbnormalitiesChange = (value: any) => {
    setForm((values) => {
      const currentAbnormalities = values.diagnosis.abnormalities;

      const isSelected = currentAbnormalities?.includes(value);

      const newAbnormalities = isSelected
        ? currentAbnormalities?.filter((abnorm) => abnorm !== value)
        : [...(currentAbnormalities || []), value];

      return {
        ...values,

        diagnosis: {
          ...formikRef.current?.values,

          abnormalities: newAbnormalities,
        },
      };
    });
  };

  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      diagnosis: {
        ...formikRef.current?.values,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<DiagnosisFormType>>
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
          setForm={setForm}
          handleBlur={handleBlur}
          handleSurgeryBeforeChange={handleSurgeryBeforeChange}
          handleSurgeryTypeChange={handleSurgeryTypeChange}
          handleLipTypeOfCleftLeftChange={handleLipTypeOfCleftLeftChange}
          handleLipTypeOfCleftRightChange={handleLipTypeOfCleftRightChange}
          handleAlveolusTypeOfCleftLeftChange={
            handleAlveolusTypeOfCleftLeftChange
          }
          handleAlveolusTypeOfCleftRightChange={
            handleAlveolusTypeOfCleftRightChange
          }
          handlePalateHardTypeOfCleftLeftChange={
            handlePalateHardTypeOfCleftLeftChange
          }
          handlePalateHardTypeOfCleftRightChange={
            handlePalateHardTypeOfCleftRightChange
          }
          handlePalateSoftTypeOfCleftLeftChange={
            handlePalateSoftTypeOfCleftLeftChange
          }
          handleAdditionalCraniofacialDeformitiesChange={
            handleAdditionalCraniofacialDeformitiesChange
          }
          handleAnyAllergiesChange={handleAnyAllergiesChange}
          handleAbnormalitiesChange={handleAbnormalitiesChange}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: DiagnosisFormType;
  setForm: Dispatch<SetStateAction<PatientRegistrationFormType>>;
  handleBlur: () => void;
  handleSurgeryBeforeChange: (value: any) => void;
  handleSurgeryTypeChange: (value: any) => void;
  handleLipTypeOfCleftLeftChange: (value: any) => void;
  handleLipTypeOfCleftRightChange: (value: any) => void;
  handleAlveolusTypeOfCleftLeftChange: (value: any) => void;
  handleAlveolusTypeOfCleftRightChange: (value: any) => void;
  handlePalateHardTypeOfCleftLeftChange: (value: any) => void;
  handlePalateHardTypeOfCleftRightChange: (value: any) => void;
  handlePalateSoftTypeOfCleftLeftChange: (value: any) => void;
  handleAdditionalCraniofacialDeformitiesChange: (value: any) => void;
  handleAnyAllergiesChange: (value: any) => void;
  handleAbnormalitiesChange: (value: any) => void;
} & FormikValues &
  FormikHelpers<DiagnosisFormType>;

const FormComponent = ({
  isSubmitting,
  values,
  setValues,
  form,
  handleBlur,
  handleSurgeryBeforeChange,
  handleSurgeryTypeChange,
  handleLipTypeOfCleftLeftChange,
  handleLipTypeOfCleftRightChange,
  handleAlveolusTypeOfCleftLeftChange,
  handleAlveolusTypeOfCleftRightChange,
  handlePalateHardTypeOfCleftLeftChange,
  handlePalateHardTypeOfCleftRightChange,
  handlePalateSoftTypeOfCleftLeftChange,
  handleAdditionalCraniofacialDeformitiesChange,
  handleAnyAllergiesChange,
  handleAbnormalitiesChange,
}: FormComponentProps) => {
  const { isChatExpanded, isNavbarExpanded } = useLayout();

  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  const textFieldGridRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "md-chat:grid-cols-2"
      : isChatExpanded
        ? "sm-chat:grid-cols-2"
        : isNavbarExpanded
          ? "md:grid-cols-2"
          : "sm:grid-cols-2";

  const radioGridRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "md-chat:grid-cols-2"
      : isChatExpanded
        ? "sm-chat:grid-cols-2"
        : isNavbarExpanded
          ? "md:grid-cols-2"
          : "sm:grid-cols-2";

  const textFieldGridClasses = `gap-4 grid grid-cols-1 ${textFieldGridRespClasses}`;
  const radioGridClasses = `gap-4 max-w-2xl grid grid-cols-1 ${radioGridRespClasses}`;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Diagnosis</div>
      <Form className="flex flex-col gap-y-4">
        <div className={textFieldGridClasses}>
          <StyledField
            name="weight"
            type="text"
            placeholder="Weight (lb 1.00-400.00)"
            onBlur={handleBlur}
          />
          <StyledField
            name="height"
            type="text"
            placeholder="Height/Length (ft 1.00-8.00)"
            onBlur={handleBlur}
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoOptions}
            label={
              "Did the patient have any lip or palate surgery before this evaluation?"
            }
            onChange={handleSurgeryBeforeChange}
            value={form.surgeryBefore}
            variant="horizontal"
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={surgeryOptions}
            label={"If yes, pick the type of surgery the Patient had:"}
            onChange={handleSurgeryTypeChange}
            value={form.surgeryType}
            variant="horizontal"
            disabled={form.surgeryBefore !== "Yes"}
          />
        </div>
        <span className="font-medium text-md">
          Diagnosis: (Description of lip and palate at birth or before any
          surgeries)
        </span>
        <span className="font-medium text-sm">Lip - Type of Cleft Lip</span>
        <div className={radioGridClasses}>
          <div className={`py-2`}>
            <RadioGroupComponent
              options={cleftLipTypeOptions}
              label={"Patient's left:"}
              onChange={handleLipTypeOfCleftLeftChange}
              value={form.lipTypeOfCleftLeft}
              variant="vertical"
            />
          </div>
          <div className={`py-2`}>
            <RadioGroupComponent
              options={cleftLipTypeOptions}
              label={"Patient's right:"}
              onChange={handleLipTypeOfCleftRightChange}
              value={form.lipTypeOfCleftRight}
              variant="vertical"
            />
          </div>
        </div>
        <span className="font-medium text-sm">
          Alveolus - Type of Cleft Lip
        </span>
        <div className={radioGridClasses}>
          <div className={`py-2`}>
            <RadioGroupComponent
              options={cleftLipTypeOptions}
              label={"Patient's left:"}
              onChange={handleAlveolusTypeOfCleftLeftChange}
              value={form.alveolusTypeOfCleftLeft}
              variant="vertical"
            />
          </div>
          <div className={`py-2`}>
            <RadioGroupComponent
              options={cleftLipTypeOptions}
              label={"Patient's right:"}
              onChange={handleAlveolusTypeOfCleftRightChange}
              value={form.alveolusTypeOfCleftRight}
              variant="vertical"
            />
          </div>
        </div>
        <span className="font-medium text-sm">
          Hard Palete - Type of Cleft Palete
        </span>
        <div className={radioGridClasses}>
          <div className={`py-2`}>
            <RadioGroupComponent
              options={cleftPalateTypeOptions}
              label={"Patient's left:"}
              onChange={handlePalateHardTypeOfCleftLeftChange}
              value={form.palateHardTypeOfCleftLeft}
              variant="vertical"
            />
          </div>
          <div className={`py-2`}>
            <RadioGroupComponent
              options={cleftPalateTypeOptions}
              label={"Patient's right:"}
              onChange={handlePalateHardTypeOfCleftRightChange}
              value={form.palateHardTypeOfCleftRight}
              variant="vertical"
            />
          </div>
        </div>
        <span className="font-medium text-sm">
          Soft Palete - Type of Cleft Palete
        </span>
        <div className="flex">
          <div className={`py-2`}>
            <RadioGroupComponent
              options={cleftPalateTypeOptions}
              label={""}
              onChange={handlePalateSoftTypeOfCleftLeftChange}
              value={form.palateSoftTypeOfCleft}
              variant="vertical"
            />
          </div>
        </div>
        <div className="flex">
          <StyledField
            className={`w-full`}
            name="additionalCommentsOnDiagnosis"
            type="text"
            placeholder={"Additional comments on diagnosis (Optional)"}
            onBlur={handleBlur}
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoIDKOptions}
            label={"Are there additional craniofacial deformities?"}
            onChange={handleAdditionalCraniofacialDeformitiesChange}
            value={form.additionalCraniofacialDeformities}
            variant="horizontal"
          />
        </div>
        <div className={`py-2`}>
          <CheckboxGroupComponent
            isChatExpanded={isChatExpanded}
            isNavbarExpanded={isNavbarExpanded}
            options={abnormalitiesAreas}
            label={
              "Does this patient have any abnormalities in any of the following areas? (check all that may apply)"
            }
            onChange={handleAbnormalitiesChange}
            values={form.abnormalities || []}
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoIDKOptions}
            label={"Does patient have allergies?"}
            onChange={handleAnyAllergiesChange}
            value={form.anyAllergies}
            variant="horizontal"
          />
        </div>
        <div className={textFieldGridClasses}>
          <StyledField
            name="otherAllergies"
            type="text"
            placeholder={"Other Allergies (Optional)"}
            onBlur={handleBlur}
          />
          <StyledField
            name="medicationAllergies"
            type="text"
            placeholder={"Medication Allergies (Optional)"}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex">
          <StyledField
            className={`w-full`}
            name="otherHealthProblems"
            type="text"
            placeholder={"Other Health Problems (Optional)"}
            onBlur={handleBlur}
          />
        </div>
      </Form>
    </div>
  );
};
