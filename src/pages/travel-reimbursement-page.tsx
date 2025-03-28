import { useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { FormikProps } from "formik";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import { mergeFormData } from "../utils/travel-reimbursement.utils";
import { TravelReimbursementFormType } from "../models/travel-reimbursement-model";
import { TRAVEL_REIMBURSEMENT_FORM_VALUES } from "../consts/travel-reimbursement.consts";
import { DescriptionContext } from "../models/travel-reimbursement-context-model";
import TravelReimbursementForm from "../components/travel-reimbursement/travel-reimbursement-form";
import { Helmet } from "react-helmet-async";
import { convertFileContentToStatus } from "../helpers/fetch-file-content";
import { FileFieldStatus } from "../consts/chat.consts";

const TravelReimbursementPage = () => {
  const [form, setForm] = useState(TRAVEL_REIMBURSEMENT_FORM_VALUES);
  const [fileInChat, setFileInChat] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  useEffect(() => {
    setForm(TRAVEL_REIMBURSEMENT_FORM_VALUES);
  }, []);

  const handleSubmit = () => {
    setForm(TRAVEL_REIMBURSEMENT_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const formikTravelReimbursementRef =
    useRef<FormikProps<TravelReimbursementFormType>>(null);

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
    setForm((prevForm) => ({
      ...prevForm,
      ...formikTravelReimbursementRef.current?.values,
    }));
    let responseData = JSON.parse(appData) as TravelReimbursementFormType;
    if (responseData.expenseDetails) {
      for (let i = 0; i < responseData.expenseDetails.length; i++) {
        let expense = responseData.expenseDetails[i];
        if (
          expense?.expenseAttachment?.receiptUploadAttachment ===
          FileFieldStatus.New
        ) {
          expense.expenseAttachment.receiptUploadAttachment = fileInChat;
          setFileInChat(null);
        }
        if (
          expense?.expenseAttachment?.invoiceUploadAttachment ===
          FileFieldStatus.New
        ) {
          expense.expenseAttachment.invoiceUploadAttachment = fileInChat;
          setFileInChat(null);
        }
        //The upload button does not show the file itself so we dont really need to store the file in the state
      }
    }
    setForm((prevForm) => mergeFormData(prevForm, responseData));
    if (responseData.action) performAction(responseData.action);
  };

  const onFileUpload = (newFile: string | null) => {
    setFileInChat(newFile);
  };
  return (
    <>
      <Helmet>
        <title>Transform Travel Reimbursement with Form2Agent AI</title>
        <meta
          name="description"
          content="Discover how Form2Agent AI simplifies managing travel reimbursement forms. Easily upload a photo or PDF, or speak directly with the assistant to quickly input your travel reimbursement details for efficient processing."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Travel Reimbursement"
          subTitle="See how Form2Agent AI manages travel reimbursement forms. Upload a photo or a PDF file of your travel reimbursement or hold the button to speak with the assistant and quickly add your travel reimbursement details."
          onSubmit={handleSubmit}
          chatElement={
            <ChatWindow
              onFileUpload={onFileUpload}
              executeFormLogic={executeFormLogic}
              formDescription="Add a new travel reimbursement to the system."
              formValues={stringifyValues({
                ...form,
                expenseDetails: form.expenseDetails.map((expense) => ({
                  ...expense,
                  expenseAttachment: {
                    receiptUploadAttachment: convertFileContentToStatus(
                      expense.expenseAttachment?.receiptUploadAttachment
                    ),
                    invoiceUploadAttachment: convertFileContentToStatus(
                      expense.expenseAttachment?.invoiceUploadAttachment
                    ),
                  },
                })),
              })}
              formContext={stringifyValues(DescriptionContext)}
            />
          }
          isSuccessModalOpen={isSuccessModalOpen}
          onCloseModal={() => setIsSuccessModalOpen(false)}
        >
          <TravelReimbursementForm
            form={form}
            setForm={setForm}
            formikRef={formikTravelReimbursementRef}
          />
        </FormPageLayout>
      </AudioProvider>
    </>
  );
};

export default TravelReimbursementPage;
