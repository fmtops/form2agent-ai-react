import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "../components/common/progress-bar";
import SubmitButton from "../components/common/form/submit-button";
import ChatWindow from "../components/ai-chat/chat-window";
import { FormikProps } from "formik";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import {
  SURGERY_CLAIM_FORM_VALUES,
  SurgeryClaimContext,
  SurgeryClaimSteps,
} from "../models/surgery-claim-context-model";
import {
  SubmissionDetailsFormType,
  SurgeryAnesthesiaFormType,
  SurgeryDetailsFormType,
  SurgeryMedicalAdmissionFormType,
  SurgeryPatientPersonalDataFormType,
  SyrgeryClaimFormType as SurgeryClaimFormType,
} from "../models/surgery-claim-model";
import {
  createNewFormObject,
  mergeFormData,
} from "../utils/surgery-claim.utils.";
import { PatientInfoComponent } from "../components/surgery-claim/surgery-patient-info";
import { MedicalAdmissionComponent } from "../components/surgery-claim/surgery-medical-admission";
import { AnesthesiaComponent } from "../components/surgery-claim/surgery-anesthesia";
import { SurgeryDetailsComponent } from "../components/surgery-claim/surgery-details-form";
import { ClaimDetailsComponent } from "../components/surgery-claim/surgery-claim-details";

export const SurgeryClaimPage = () => {
  const [surgeryClaimForm, setSurgeryClaimForm] = useState(
    SURGERY_CLAIM_FORM_VALUES
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikPersonalDataRef =
    useRef<FormikProps<SurgeryPatientPersonalDataFormType>>(null);
  const formikMedicalAdmissionRef =
    useRef<FormikProps<SurgeryMedicalAdmissionFormType>>(null);
  const formikAnesthesiaRef =
    useRef<FormikProps<SurgeryAnesthesiaFormType>>(null);
  const formikSurgeryDetailsRef =
    useRef<FormikProps<SurgeryDetailsFormType>>(null);
  const formikSubmissionDetailRef =
    useRef<FormikProps<SubmissionDetailsFormType>>(null);
  const { pageIndex } = surgeryClaimForm;

  enum SurgeryClaimSection {
    Patient = 1,
    MedicalAdmission = 2,
    Anesthesia = 3,
    Details = 4,
    SubmissionDetails = 5,
  }

  const handleSubmit = () => {
    setSurgeryClaimForm(SURGERY_CLAIM_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const setPageIndex = (index: number) =>
    setSurgeryClaimForm((prev) => {
      return { ...prev, pageIndex: index };
    });

  const goToPage = (index: number) => {
    setPageIndex(index);
  };

  const handleNextStep = () => {
    updateForm();

    if (pageIndex === SurgeryClaimSteps.length) {
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
    setSurgeryClaimForm(SURGERY_CLAIM_FORM_VALUES);
  }, []);

  const updateForm = () => {
    setSurgeryClaimForm((prevForm) =>
      createNewFormObject(
        prevForm,
        formikPersonalDataRef,
        formikMedicalAdmissionRef,
        formikAnesthesiaRef,
        formikSurgeryDetailsRef,
        formikSubmissionDetailRef
      )
    );
  };

  const moveToEditedSection = (responseData: SurgeryClaimFormType) => {
    if (responseData.patientInfo) {
      goToPage(SurgeryClaimSection.Patient);
    } else if (responseData.medicalAdmission) {
      goToPage(SurgeryClaimSection.MedicalAdmission);
    } else if (responseData.anesthesia) {
      goToPage(SurgeryClaimSection.Anesthesia);
    } else if (responseData.surgeryDetails) {
      goToPage(SurgeryClaimSection.Details);
    } else if (responseData.claimSubmissionDetails) {
      goToPage(SurgeryClaimSection.SubmissionDetails);
    }
  };

  const renderPage = () => {
    switch (pageIndex) {
      case SurgeryClaimSection.Patient:
        return (
          <PatientInfoComponent
            form={surgeryClaimForm.patientInfo}
            setForm={setSurgeryClaimForm}
            formikRef={formikPersonalDataRef}
          />
        );
      case SurgeryClaimSection.MedicalAdmission:
        return (
          <MedicalAdmissionComponent
            form={surgeryClaimForm.medicalAdmission}
            setForm={setSurgeryClaimForm}
            formikRef={formikMedicalAdmissionRef}
          />
        );
      case SurgeryClaimSection.Anesthesia:
        return (
          <AnesthesiaComponent
            form={surgeryClaimForm.anesthesia}
            setForm={setSurgeryClaimForm}
            formikRef={formikAnesthesiaRef}
          />
        );
      case SurgeryClaimSection.Details:
        return (
          <SurgeryDetailsComponent
            form={surgeryClaimForm.surgeryDetails}
            setForm={setSurgeryClaimForm}
            formikRef={formikSurgeryDetailsRef}
          />
        );
      case SurgeryClaimSection.SubmissionDetails:
        return (
          <ClaimDetailsComponent
            form={surgeryClaimForm.claimSubmissionDetails}
            setForm={setSurgeryClaimForm}
            formikRef={formikSubmissionDetailRef}
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
    let responseData = JSON.parse(appData) as SurgeryClaimFormType;
    setSurgeryClaimForm((prevForm) => mergeFormData(prevForm, responseData));
    moveToEditedSection(responseData);
    if (responseData.action) performAction(responseData.action);
    if (responseData.pageIndex) goToPage(responseData.pageIndex);
  };

  return (
    <AudioProvider>
      <FormPageLayout
        title="Surgery Claim"
        subTitle="Try Form2Agent AI with a multi-step surgery claim form. Hold the button to speak with the assistant, or paste details into the chat to quickly fill in the form."
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription="Provide detailed health information to assist the doctor in filling in surgery claim form."
            formValues={stringifyValues(surgeryClaimForm)}
            formContext={stringifyValues(SurgeryClaimContext)}
          />
        }
        isSuccessModalOpen={isSuccessModalOpen}
        onCloseModal={() => setIsSuccessModalOpen(false)}
      >
        <div className="flex flex-col gap-y-8">
          <ProgressBar steps={SurgeryClaimSteps} currentStep={pageIndex} />
          {renderPage()}
          <div className="flex flex-row-reverse justify-end gap-4">
            <SubmitButton
              value={
                SurgeryClaimSteps.length === pageIndex ? "Submit" : "Next Step"
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
  );
};
