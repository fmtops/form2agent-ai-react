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
  PrAction,
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

export const PatientRegistrationPage = () => {
  const [patientRegistrationForm, setPatientRegistrationForm] =
    useState(PATIENT_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const formikPatientDataRef =
    useRef<FormikProps<PatientPersonalDataFormType>>(null);
  const formikParentGuardianInformationRef =
    useRef<FormikProps<ParentGuardianInformationFormType>>(null);
  const formikFamilyHistoryRef =
    useRef<FormikProps<FamilyHistoryFormType>>(null);
  const formikDiagnosisRef = useRef<FormikProps<DiagnosisFormType>>(null);
  const { pageIndex } = patientRegistrationForm;

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
      goToPage(1);
    } else if (responseData.parentGuardianInformation) {
      goToPage(2);
    } else if (responseData.familyHistory) {
      goToPage(3);
    } else if (responseData.diagnosis) {
      goToPage(4);
    }
  };

  const renderPage = () => {
    switch (pageIndex) {
      case 1:
        return (
          <PatientDataComponent
            form={patientRegistrationForm.personalData}
            setForm={setPatientRegistrationForm}
            formikRef={formikPatientDataRef}
          />
        );
      case 2:
        return (
          <ParentGuardianInformationComponent
            form={patientRegistrationForm.parentGuardianInformation}
            setForm={setPatientRegistrationForm}
            formikRef={formikParentGuardianInformationRef}
          />
        );
      case 3:
        return (
          <FamilyHistoryComponent
            form={patientRegistrationForm.familyHistory}
            setForm={setPatientRegistrationForm}
            formikRef={formikFamilyHistoryRef}
          />
        );
      case 4:
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

  const performAction = (action: PrAction) => {
    switch (action) {
      case PrAction.Submit:
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
    <AudioProvider>
      <FormPageLayout
        title="Patient Registration"
        subTitle="Try Form2Agent AI with a multi-step patient registration form. Hold the button to speak with the assistant, upload a photo of a registration form or paste details into the chat to quickly add the patient information."
        isChatOpen={isChatOpen}
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription="Provide detailed health information to assist the doctor in patient's diagnosis and treatment planning."
            formValues={stringifyValues(patientRegistrationForm)}
            formContext={stringifyValues(PatientRegistrationContext)}
            setIsChatOpen={setIsChatOpen}
          />
        }
        isSuccessModalOpen={isSuccessModalOpen}
        onCloseModal={() => setIsSuccessModalOpen(false)}
      >
        <div className="flex flex-col p-4 gap-y-8">
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
              className="w-24"
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
  );
};
