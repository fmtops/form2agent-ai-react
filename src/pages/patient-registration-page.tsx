import { useEffect, useRef, useState } from "react";
import { PatientDataComponent } from "../components/patient-registration/patient-data-form";
import { ParentGuardianInformationComponent } from "../components/patient-registration/parent-guardian-information";
import { DiagnosisComponent } from "../components/patient-registration/diagnosis";
import {
  PATIENT_FORM_VALUES,
  PatientRegistrationSteps,
} from "../consts/patient-registration.consts";
import { ProgressBar } from "../components/common/progress-bar";
import SubmitButton from "../components/common/form/submit-button";
import { FamilyHistoryComponent } from "../components/patient-registration/family-history";
import {
  DiagnosisFormType,
  FamilyHistoryFormType,
  ParentGuardianInformationFormType,
  PatientPersonalDataFormType,
  PatientRegistrationFormType,
} from "../models/patient-registration-model";
import { PatientRegistrationContext } from "../models/patient-registration-context-model";
import ChatWindow from "../components/ai-chat/chat-window";
import { FormikProps } from "formik";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import {
  createNewFormObject,
  mergeFormData,
} from "../utils/patient-registration.utils";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import { Helmet } from "react-helmet-async";

export const PatientRegistrationPage = () => {
  const [patientRegistrationForm, setPatientRegistrationForm] =
    useState(PATIENT_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikPatientDataRef =
    useRef<FormikProps<PatientPersonalDataFormType>>(null);
  const formikParentGuardianInformationRef =
    useRef<FormikProps<ParentGuardianInformationFormType>>(null);
  const formikFamilyHistoryRef =
    useRef<FormikProps<FamilyHistoryFormType>>(null);
  const formikDiagnosisRef = useRef<FormikProps<DiagnosisFormType>>(null);
  const { pageIndex } = patientRegistrationForm;

  enum PatientRegistrationSection {
    Patient = 1,
    ParentGuardian = 2,
    FamilyHistory = 3,
    Diagnosis = 4,
  }

  const handleSubmit = () => {
    setPatientRegistrationForm(PATIENT_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const setPageIndex = (index: number) =>
    setPatientRegistrationForm((prev) => {
      return { ...prev, pageIndex: index };
    });

  const goToPage = (index: number) => {
    setPageIndex(index);
  };

  const handleNextStep = () => {
    updateForm();

    if (pageIndex === PatientRegistrationSteps.length) {
      handleSubmit();
      return;
    }
    setPageIndex(pageIndex + 1);
  };

  const handleBackStep = () => {
    updateForm();
    setPageIndex(pageIndex - 1);
  };

  useEffect(() => {
    setPatientRegistrationForm(PATIENT_FORM_VALUES);
  }, []);

  const updateForm = () => {
    setPatientRegistrationForm((prevForm) =>
      createNewFormObject(
        prevForm,
        formikPatientDataRef,
        formikParentGuardianInformationRef,
        formikFamilyHistoryRef,
        formikDiagnosisRef
      )
    );
  };

  const moveToEditedSection = (responseData: PatientRegistrationFormType) => {
    if (responseData.personalData) {
      goToPage(PatientRegistrationSection.Patient);
    } else if (responseData.parentGuardianInformation) {
      goToPage(PatientRegistrationSection.ParentGuardian);
    } else if (responseData.familyHistory) {
      goToPage(PatientRegistrationSection.FamilyHistory);
    } else if (responseData.diagnosis) {
      goToPage(PatientRegistrationSection.Diagnosis);
    }
  };

  const renderPage = () => {
    switch (pageIndex) {
      case PatientRegistrationSection.Patient:
        return (
          <PatientDataComponent
            form={patientRegistrationForm.personalData}
            setForm={setPatientRegistrationForm}
            formikRef={formikPatientDataRef}
          />
        );
      case PatientRegistrationSection.ParentGuardian:
        return (
          <ParentGuardianInformationComponent
            form={patientRegistrationForm.parentGuardianInformation}
            setForm={setPatientRegistrationForm}
            formikRef={formikParentGuardianInformationRef}
          />
        );
      case PatientRegistrationSection.FamilyHistory:
        return (
          <FamilyHistoryComponent
            form={patientRegistrationForm.familyHistory}
            setForm={setPatientRegistrationForm}
            formikRef={formikFamilyHistoryRef}
          />
        );
      case PatientRegistrationSection.Diagnosis:
        return (
          <DiagnosisComponent
            form={patientRegistrationForm.diagnosis}
            setForm={setPatientRegistrationForm}
            formikRef={formikDiagnosisRef}
          />
        );
      default:
        return <></>;
    }
  };

  const performAction = (action: FormAction) => {
    switch (action) {
      case FormAction.Submit:
        handleSubmit();
        break;
      default:
        break;
    }
  };

  const executeFormLogic = async (appData: string) => {
    updateForm();
    let responseData = JSON.parse(appData) as PatientRegistrationFormType;
    setPatientRegistrationForm((prevForm) =>
      mergeFormData(prevForm, responseData)
    );
    moveToEditedSection(responseData);
    if (responseData.action) performAction(responseData.action);
    if (responseData.pageIndex) goToPage(responseData.pageIndex);
  };

  return (
    <>
      <Helmet>
        <title>Simplify Patient Registration with Form2Agent AI</title>
        <meta
          name="description"
          content="Use Form2Agent AI for easy patient registration. Speak, upload a form photo, or paste details to quickly manage patient info."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Patient Registration"
          subTitle="Try Form2Agent AI with a multi-step patient registration form. Hold the button to speak with the assistant, upload a photo of a registration form or paste details into the chat to quickly add the patient information."
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription="Provide detailed health information to assist the doctor in patient's diagnosis and treatment planning."
              formValues={stringifyValues(patientRegistrationForm)}
              formContext={stringifyValues(PatientRegistrationContext)}
            />
          }
          isSuccessModalOpen={isSuccessModalOpen}
          onCloseModal={() => setIsSuccessModalOpen(false)}
        >
          <div className="flex flex-col gap-y-8">
            <ProgressBar
              steps={PatientRegistrationSteps}
              currentStep={pageIndex}
            />
            {renderPage()}
            <div className="flex flex-row-reverse justify-end gap-4">
              <SubmitButton
                value={
                  PatientRegistrationSteps.length === pageIndex
                    ? "Submit"
                    : "Next Step"
                }
                className="w-24 mt-4"
                onClick={handleNextStep}
              />
              {pageIndex > 1 && (
                <button
                  onClick={handleBackStep}
                  className={`py-[10px] mt-4 border rounded shadow-sm w-20 border-border-brand-light text-text-brand-light`}
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </FormPageLayout>
      </AudioProvider>
    </>
  );
};
