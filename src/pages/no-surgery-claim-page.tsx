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
  NoSurgeryClaimContext,
  NoSurgeryClaimSteps,
} from "../models/no-surgery-claim-context-model";
import {
  NoSurgeryClaimFormType,
  NoSurgeryGoalsFormType,
  NoSurgeryOutcomesFormType,
  NoSurgeryPatientPersonalDataFormType,
  NoSurgeryTreatmentOverviewFormType,
} from "../models/no-surgery-claim-model";
import {
  createNewFormObject,
  mergeFormData,
} from "../utils/no-surgery-claim.utils.";
import { NoSurgeryPatientInfoComponent } from "../components/no-surgery-claim/no-surgery-patient-info";
import { TreatmentOverviewComponent } from "../components/no-surgery-claim/no-surgery-treatment-overview";
import { NoSurgeryGoalsComponent } from "../components/no-surgery-claim/no-surgery-goals";
import { NoSurgeryOutcomesComponent } from "../components/no-surgery-claim/no-surgery-outcomes";
import { NO_SURGERY_CLAIM_FORM_VALUES } from "../consts/no-surgery.consts";

export const NoSurgeryClaimPage = () => {
  const [noSurgeryClaimForm, setNoSurgeryClaimForm] = useState(
    NO_SURGERY_CLAIM_FORM_VALUES
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikPersonalDataRef =
    useRef<FormikProps<NoSurgeryPatientPersonalDataFormType>>(null);
  const formikTratmentOverviewRef =
    useRef<FormikProps<NoSurgeryTreatmentOverviewFormType>>(null);
  const formikGoalsRef = useRef<FormikProps<NoSurgeryGoalsFormType>>(null);
  const formikOutcomessRef =
    useRef<FormikProps<NoSurgeryOutcomesFormType>>(null);
  const { pageIndex } = noSurgeryClaimForm;

  enum NoSurgeryClaimSection {
    Patient = 1,
    TreatmentOverview = 2,
    Goals = 3,
    Outcomes = 4,
  }

  const handleSubmit = () => {
    setNoSurgeryClaimForm(NO_SURGERY_CLAIM_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const setPageIndex = (index: number) =>
    setNoSurgeryClaimForm((prev) => {
      return { ...prev, pageIndex: index };
    });

  const goToPage = (index: number) => {
    setPageIndex(index);
  };

  const handleNextStep = () => {
    updateForm();

    if (pageIndex === NoSurgeryClaimSteps.length) {
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
    setNoSurgeryClaimForm(NO_SURGERY_CLAIM_FORM_VALUES);
  }, []);

  const updateForm = () => {
    setNoSurgeryClaimForm((prevForm) =>
      createNewFormObject(
        prevForm,
        formikPersonalDataRef,
        formikTratmentOverviewRef,
        formikGoalsRef,
        formikOutcomessRef
      )
    );
  };

  const moveToEditedSection = (responseData: NoSurgeryClaimFormType) => {
    if (responseData.patientInfo) {
      goToPage(NoSurgeryClaimSection.Patient);
    } else if (responseData.treatmentOverview) {
      goToPage(NoSurgeryClaimSection.TreatmentOverview);
    } else if (responseData.goals) {
      goToPage(NoSurgeryClaimSection.Goals);
    } else if (responseData.outcomes) {
      goToPage(NoSurgeryClaimSection.Outcomes);
    }
  };

  const renderPage = () => {
    switch (pageIndex) {
      case NoSurgeryClaimSection.Patient:
        return (
          <NoSurgeryPatientInfoComponent
            form={noSurgeryClaimForm.patientInfo}
            setForm={setNoSurgeryClaimForm}
            formikRef={formikPersonalDataRef}
          />
        );
      case NoSurgeryClaimSection.TreatmentOverview:
        return (
          <TreatmentOverviewComponent
            form={noSurgeryClaimForm.treatmentOverview}
            setForm={setNoSurgeryClaimForm}
            formikRef={formikTratmentOverviewRef}
          />
        );
      case NoSurgeryClaimSection.Goals:
        return (
          <NoSurgeryGoalsComponent
            form={noSurgeryClaimForm.goals}
            setForm={setNoSurgeryClaimForm}
            formikRef={formikGoalsRef}
          />
        );
      case NoSurgeryClaimSection.Outcomes:
        return (
          <NoSurgeryOutcomesComponent
            form={noSurgeryClaimForm.outcomes}
            setForm={setNoSurgeryClaimForm}
            formikRef={formikOutcomessRef}
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
    let responseData = JSON.parse(appData) as NoSurgeryClaimFormType;
    setNoSurgeryClaimForm((prevForm) => mergeFormData(prevForm, responseData));
    moveToEditedSection(responseData);
    if (responseData.action) performAction(responseData.action);
    if (responseData.pageIndex) goToPage(responseData.pageIndex);
  };

  return (
    <AudioProvider>
      <FormPageLayout
        title="Non Surgical Treatment Claim"
        subTitle="Try Form2Agent AI with a multi-step non-surgical treatment claim form. Hold the button to speak with the assistant, or paste details into the chat to quickly fill in the form."
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription="Provide detailed health information to assist the doctor in filling in non surgical treatment claim form."
            formValues={stringifyValues(noSurgeryClaimForm)}
            formContext={stringifyValues(NoSurgeryClaimContext)}
          />
        }
        isSuccessModalOpen={isSuccessModalOpen}
        onCloseModal={() => setIsSuccessModalOpen(false)}
      >
        <div className="flex flex-col gap-y-8">
          <ProgressBar steps={NoSurgeryClaimSteps} currentStep={pageIndex} />
          {renderPage()}
          <div className="flex flex-row-reverse justify-end gap-4">
            <SubmitButton
              value={
                NoSurgeryClaimSteps.length === pageIndex
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
  );
};
