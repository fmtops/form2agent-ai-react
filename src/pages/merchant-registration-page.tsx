import { useEffect, useRef, useState } from "react";
import { MerchantDataComponent } from "../components/merchant-registration/merchant-data-form";
import { BusinessOverviewComponent } from "../components/merchant-registration/business-overview";
import {
  MERCHANT_FORM_VALUES,
  MerchantRegistrationSteps,
} from "../consts/merchant-registration.consts";
import { ProgressBar } from "../components/common/progress-bar";
import SubmitButton from "../components/common/form/submit-button";
import { PrimaryOwnerComponent } from "../components/merchant-registration/primary-owner";
import {
  BusinessOverviewFormType,
  MerchantGeneralInformationFormType,
  MerchantRegistrationFormType,
  PrimaryOwnerFormType,
} from "../models/merchant-registration-model";
import { MerchantRegistrationContext } from "../models/merchant-registration-context-model";
import ChatWindow from "../components/ai-chat/chat-window";
import { FormikProps } from "formik";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import {
  createNewFormObject,
  mergeFormData,
} from "../utils/merchant-registration.utils";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import { Helmet } from "react-helmet-async";

export const MerchantRegistrationPage = () => {
  const [merchantRegistrationForm, setMerchantRegistrationForm] =
    useState(MERCHANT_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikGeneralInformationRef =
    useRef<FormikProps<MerchantGeneralInformationFormType>>(null);
  const formikBusinessOverviewRef =
    useRef<FormikProps<BusinessOverviewFormType>>(null);
  const formikPrimaryOwnerRef = useRef<FormikProps<PrimaryOwnerFormType>>(null);
  const { pageIndex } = merchantRegistrationForm;

  enum MerchantRegistrationSection {
    Merchant = 1,
    ProductAndSales = 2,
    Owner = 3,
  }

  const handleSubmit = () => {
    setMerchantRegistrationForm(MERCHANT_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const setPageIndex = (index: number) =>
    setMerchantRegistrationForm((prev) => {
      return { ...prev, pageIndex: index };
    });

  const goToPage = (index: number) => {
    setPageIndex(index);
  };

  const handleNextStep = () => {
    updateForm();

    if (pageIndex === MerchantRegistrationSteps.length) {
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
    setMerchantRegistrationForm(MERCHANT_FORM_VALUES);
  }, []);

  const updateForm = () => {
    setMerchantRegistrationForm((prevForm) =>
      createNewFormObject(
        prevForm,
        formikGeneralInformationRef,
        formikBusinessOverviewRef,
        formikPrimaryOwnerRef
      )
    );
  };

  const moveToEditedSection = (responseData: MerchantRegistrationFormType) => {
    if (responseData.generalInformation) {
      goToPage(MerchantRegistrationSection.Merchant);
    } else if (responseData.businessOverview) {
      goToPage(MerchantRegistrationSection.ProductAndSales);
    } else if (responseData.primaryOwner) {
      goToPage(MerchantRegistrationSection.Owner);
    }
  };

  const renderPage = () => {
    switch (pageIndex) {
      case MerchantRegistrationSection.Merchant:
        return (
          <MerchantDataComponent
            form={merchantRegistrationForm.generalInformation}
            setForm={setMerchantRegistrationForm}
            formikRef={formikGeneralInformationRef}
          />
        );
      case MerchantRegistrationSection.ProductAndSales:
        return (
          <BusinessOverviewComponent
            form={merchantRegistrationForm.businessOverview}
            setForm={setMerchantRegistrationForm}
            formikRef={formikBusinessOverviewRef}
          />
        );
      case MerchantRegistrationSection.Owner:
        return (
          <PrimaryOwnerComponent
            form={merchantRegistrationForm.primaryOwner}
            setForm={setMerchantRegistrationForm}
            formikRef={formikPrimaryOwnerRef}
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
    let responseData = JSON.parse(appData) as MerchantRegistrationFormType;
    setMerchantRegistrationForm((prevForm) =>
      mergeFormData(prevForm, responseData)
    );
    moveToEditedSection(responseData);
    if (responseData.action) performAction(responseData.action);
    if (responseData.pageIndex) goToPage(responseData.pageIndex);
  };

  return (
    <>
      <Helmet>
        <title>Streamline Merchant Registration with Form2Agent AI</title>
        <meta
          name="description"
          content="Experience effortless merchant registration using Form2Agent AI's multi-step form. Simply hold the button to interact with the assistant, upload a photo of your registration form, or paste the details into the chat to swiftly input merchant information."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Merchant Registration"
          subTitle="Try Form2Agent AI with a multi-step merchant registration form. Hold the button to speak with the assistant, upload a photo of a registration form or paste details into the chat to quickly add the merchant information."
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription="Provide detailed business information to assist the merchant in business's application and sales planning."
              formValues={stringifyValues(merchantRegistrationForm)}
              formContext={stringifyValues(MerchantRegistrationContext)}
            />
          }
          isSuccessModalOpen={isSuccessModalOpen}
          onCloseModal={() => setIsSuccessModalOpen(false)}
        >
          <div className="flex flex-col gap-y-8">
            <ProgressBar
              steps={MerchantRegistrationSteps}
              currentStep={pageIndex}
            />
            {renderPage()}
            <div className="flex flex-row-reverse justify-end gap-4">
              <SubmitButton
                value={
                  MerchantRegistrationSteps.length === pageIndex
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
