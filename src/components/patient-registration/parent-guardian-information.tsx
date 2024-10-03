import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  ParentGuardianInformationFormType,
  PatientRegistrationFormType,
} from "../../models/patient-registration-model";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { RadioGroupComponent } from "../common/form/radio-group";
import {
  HearAboutTCOptions,
  HearAboutTCSourceValues,
  RelationshipOptions,
} from "../../consts/patient-registration.consts";
import { useLayout } from "../../contexts/LayoutContext";

export interface ParentGuardianInformationComponentProps {
  form: ParentGuardianInformationFormType;
  setForm: Dispatch<SetStateAction<PatientRegistrationFormType>>;
  formikRef: RefObject<FormikProps<ParentGuardianInformationFormType>>;
}
export const ParentGuardianInformationComponent = ({
  form,
  setForm,
  formikRef,
}: ParentGuardianInformationComponentProps) => {
  const [
    hearAboutTCSourcePlaceholderValue,
    setHearAboutTCSourcePlaceholderValue,
  ] = useState("");
  const handleRelationshipChange = (value: any) => {
    setForm((values) => ({
      ...values,
      parentGuardianInformation: {
        ...formikRef.current?.values,
        relationship: value,
      },
    }));
  };

  const handleHearAboutTCChange = (value: any) => {
    setForm((values) => ({
      ...values,
      parentGuardianInformation: {
        ...formikRef.current?.values,
        hearAboutTC: value,
        hearAboutTCSource: "",
      },
    }));
  };

  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      parentGuardianInformation: {
        ...formikRef.current?.values,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<ParentGuardianInformationFormType>>
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
          handleRelationshipChange={handleRelationshipChange}
          handleHearAboutTCChange={handleHearAboutTCChange}
          hearAboutTCSourcePlaceholderValue={hearAboutTCSourcePlaceholderValue}
          setHearAboutTCSourcePlaceholderValue={
            setHearAboutTCSourcePlaceholderValue
          }
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: ParentGuardianInformationFormType;
  handleRelationshipChange: (value: any) => void;
  handleHearAboutTCChange: (value: any) => void;
  hearAboutTCSourcePlaceholderValue: string;
  setHearAboutTCSourcePlaceholderValue: Dispatch<SetStateAction<string>>;
  handleBlur: () => void;
} & FormikValues &
  FormikHelpers<ParentGuardianInformationFormType>;

const FormComponent = ({
  setValues,
  form,
  handleRelationshipChange,
  handleHearAboutTCChange,
  hearAboutTCSourcePlaceholderValue,
  setHearAboutTCSourcePlaceholderValue,
  handleBlur,
}: FormComponentProps) => {
  const { isChatExpanded, isNavbarExpanded } = useLayout();

  useEffect(() => {
    setValues(form);
    setHearAboutTCSourcePlaceholderValue(
      HearAboutTCSourceValues[form.hearAboutTC || ""]
    );
  }, [form, setValues]);

  const nameGridRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "md-chat:grid-cols-2"
      : isChatExpanded
        ? "sm-chat:grid-cols-2"
        : isNavbarExpanded
          ? "md:grid-cols-2"
          : "sm:grid-cols-2";

  const otherFieldRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "md-chat:w-1/2"
      : isChatExpanded
        ? "sm-chat:w-1/2"
        : isNavbarExpanded
          ? "md:w-1/2"
          : "sm:w-1/2";

  const nameGridClasses = `gap-4 grid grid-cols-1 ${nameGridRespClasses}`;
  const otherFieldClasses = `w-full ${otherFieldRespClasses}`;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Parent/Guardian Information</div>
      <Form className="flex flex-col gap-y-4">
        <div className={nameGridClasses}>
          <StyledField
            name="parentGuardianFirstName"
            type="text"
            placeholder="First Name"
            onBlur={handleBlur}
          />
          <StyledField
            name="parentGuardianLastName"
            type="text"
            placeholder="Last Name"
            onBlur={handleBlur}
          />
        </div>
        <div className={`py-2`}>
          <RadioGroupComponent
            options={RelationshipOptions}
            label={"Relationship with Patient"}
            onChange={handleRelationshipChange}
            value={form.relationship}
            variant="horizontal"
          />
        </div>
        {form.relationship === "Other" && (
          <div className="flex gap-4">
            <StyledField
              className={otherFieldClasses}
              name="otherRelationship"
              type="text"
              placeholder="Relationship with Patient"
              onBlur={handleBlur}
            />
          </div>
        )}
        <div className={`py-2`}>
          <RadioGroupComponent
            options={HearAboutTCOptions}
            label={"How did the patient hear about the treatment center?"}
            onChange={handleHearAboutTCChange}
            value={form.hearAboutTC}
            variant="horizontal"
          />
        </div>
        <div className="flex gap-4">
          <StyledField
            className={otherFieldClasses}
            name="hearAboutTCSource"
            type="text"
            onBlur={handleBlur}
            placeholder={hearAboutTCSourcePlaceholderValue}
          />
        </div>
      </Form>
    </div>
  );
};
