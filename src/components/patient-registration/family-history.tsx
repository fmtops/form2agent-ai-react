import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import {
  FamilyHistoryFormType,
  PatientRegistrationFormType,
} from "../../models/patient-registration-model";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { RadioGroupComponent } from "../common/form/radio-group";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { YesNoIDKOptions } from "../../consts/patient-registration.consts";
import { useLayout } from "../../contexts/LayoutContext";

export interface FamilyHistoryComponentProps {
  form: FamilyHistoryFormType;
  setForm: Dispatch<SetStateAction<PatientRegistrationFormType>>;
  formikRef: RefObject<FormikProps<FamilyHistoryFormType>>;
}

export const FamilyHistoryComponent = ({
  form,
  setForm,
  formikRef,
}: FamilyHistoryComponentProps) => {
  const setPregnancyUnknown = () => {
    setForm((values) => ({
      ...values,
      familyHistory: {
        ...formikRef.current?.values,
        lengthOfPregnancy: "",
        lengthOfPregnancyUnknown:
          !values.familyHistory.lengthOfPregnancyUnknown,
      },
    }));
  };

  const handleComplicationsDuringPregnancyChange = (value: any) => {
    setForm((values) => ({
      ...values,
      familyHistory: {
        ...formikRef.current?.values,
        complicationsDuringPregnancy: value,
      },
    }));
  };

  const handleComplicationsDuringBirthChange = (value: any) => {
    setForm((values) => ({
      ...values,
      familyHistory: {
        ...formikRef.current?.values,
        complicationsDuringBirth: value,
      },
    }));
  };

  const handleSmokingDuringPregnancyChange = (value: any) => {
    setForm((values) => ({
      ...values,
      familyHistory: {
        ...formikRef.current?.values,
        smokingDuringPregnancy: value,
      },
    }));
  };

  const handleAlcoholDuringPregnancyChange = (value: any) => {
    setForm((values) => ({
      ...values,
      familyHistory: {
        ...formikRef.current?.values,
        alcoholDuringPregnancy: value,
      },
    }));
  };

  const handleClefInCloseFamilyChange = (value: any) => {
    setForm((values) => ({
      ...values,
      familyHistory: {
        ...formikRef.current?.values,
        cleftInCloseFamily: value,
      },
    }));
  };

  const handleCleftInFurtherFamilyChange = (value: any) => {
    setForm((values) => ({
      ...values,
      familyHistory: {
        ...formikRef.current?.values,
        cleftInFurtherFamily: value,
      },
    }));
  };

  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      familyHistory: {
        ...formikRef.current?.values,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<FamilyHistoryFormType>>
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
          setPregnancyUnknown={setPregnancyUnknown}
          handleComplicationsDuringPregnancyChange={
            handleComplicationsDuringPregnancyChange
          }
          handleComplicationsDuringBirthChange={
            handleComplicationsDuringBirthChange
          }
          handleSmokingDuringPregnancyChange={
            handleSmokingDuringPregnancyChange
          }
          handleAlcoholDuringPregnancyChange={
            handleAlcoholDuringPregnancyChange
          }
          handleClefInCloseFamilyChange={handleClefInCloseFamilyChange}
          handleCleftInFurtherFamilyChange={handleCleftInFurtherFamilyChange}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: FamilyHistoryFormType;
  setForm: Dispatch<SetStateAction<PatientRegistrationFormType>>;
  setPregnancyUnknown: () => void;
  handleComplicationsDuringPregnancyChange: (value: any) => void;
  handleComplicationsDuringBirthChange: (value: any) => void;
  handleSmokingDuringPregnancyChange: (value: any) => void;
  handleAlcoholDuringPregnancyChange: (value: any) => void;
  handleClefInCloseFamilyChange: (value: any) => void;
  handleCleftInFurtherFamilyChange: (value: any) => void;
  handleBlur: () => void;
} & FormikValues &
  FormikHelpers<FamilyHistoryFormType>;

const FormComponent = ({
  setValues,
  form,
  setPregnancyUnknown,
  handleComplicationsDuringPregnancyChange,
  handleComplicationsDuringBirthChange,
  handleSmokingDuringPregnancyChange,
  handleAlcoholDuringPregnancyChange,
  handleClefInCloseFamilyChange,
  handleCleftInFurtherFamilyChange,
  handleBlur,
}: FormComponentProps) => {
  const { isChatExpanded, isNavbarExpanded } = useLayout();

  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  const pregnancyGridRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "md-chat:flex"
      : isChatExpanded
        ? "sm-chat:flex"
        : isNavbarExpanded
          ? "md:flex"
          : "sm:flex";

  const pregnancyGridClasses = `gap-4 grid grid-cols-1 ${pregnancyGridRespClasses}`;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Family History</div>
      <Form className="flex flex-col gap-y-4">
        <div className={pregnancyGridClasses}>
          <StyledField
            className="w-full max-w-96"
            name="lengthOfPregnancy"
            type="text"
            placeholder="Length of Pregnancy (0.0 month)"
            onBlur={handleBlur}
          />
          <FormGroup className=" w-1/2">
            <FormControlLabel
              className="checkbox-label"
              control={
                <Checkbox
                  checked={form.lengthOfPregnancyUnknown}
                  onChange={setPregnancyUnknown}
                />
              }
              label="Don't Know"
            />
          </FormGroup>
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoIDKOptions}
            label={"Did the mother have complications during pregnancy?"}
            onChange={handleComplicationsDuringPregnancyChange}
            value={form.complicationsDuringPregnancy}
            variant="horizontal"
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoIDKOptions}
            label={"Were there any complications during birth?"}
            onChange={handleComplicationsDuringBirthChange}
            value={form.complicationsDuringBirth}
            variant="horizontal"
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoIDKOptions}
            label={"Did the mother smoke during pregnancy?"}
            onChange={handleSmokingDuringPregnancyChange}
            value={form.smokingDuringPregnancy}
            variant="horizontal"
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoIDKOptions}
            label={"Did the mother consume alcohol during pregnancy?"}
            onChange={handleAlcoholDuringPregnancyChange}
            value={form.alcoholDuringPregnancy}
            variant="horizontal"
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoIDKOptions}
            label={
              "Do any of the patient's parents and/or siblings brothers/sisters have a cleft lip, cleft palate, or cleft involving the face?"
            }
            onChange={handleClefInCloseFamilyChange}
            value={form.cleftInCloseFamily}
            variant="horizontal"
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={YesNoIDKOptions}
            label={
              "Do any other relatives (cousins, aunts, uncles, grandparents) have a cleft lip, cleft palate, or cleft involving the face?"
            }
            onChange={handleCleftInFurtherFamilyChange}
            value={form.cleftInFurtherFamily}
            variant="horizontal"
          />
        </div>
      </Form>
    </div>
  );
};
