import { useEffect, useRef, useState } from "react";
import InvoiceForm from "../components/invoice/invoice-form";
import ChatWindow from "../components/ai-chat/chat-window";
import { InvoiceAction, InvoiceFormType } from "../models/invoice-model";
import { DescriptionContext } from "../models/invoice-context-model";
import { INVOICE_FORM_VALUES } from "../consts/invoice.consts";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { mergeFormData } from "../utils/invoice.utils";
import { FormikProps } from "formik";

const InvoicePage = () => {
  const [form, setForm] = useState(INVOICE_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  useEffect(() => {
    setForm(INVOICE_FORM_VALUES);
  }, []);

  const handleSubmit = () => {
    setForm(INVOICE_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const formikInvoiceRef = useRef<FormikProps<InvoiceFormType>>(null);

  const performAction = (action: InvoiceAction) => {
    switch (action) {
      case InvoiceAction.Submit:
        handleSubmit();
        break;
      default:
        break;
    }
  };

  const executeFormLogic = async (appData: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...formikInvoiceRef.current?.values,
    }));
    let responseData = JSON.parse(appData);
    setForm((prevForm) => mergeFormData(prevForm, responseData));
    if (responseData.action) performAction(responseData.action);
  };

  return (
    <FormPageLayout
      title="Invoice Details"
      subTitle="Here you can provide more information or display invoice details."
      onSubmit={handleSubmit}
      chatElement={
        <ChatWindow
          executeFormLogic={executeFormLogic}
          formDescription="Add a new invoice to the system."
          formValues={stringifyValues(form)}
          formContext={stringifyValues(DescriptionContext)}
          setIsChatOpen={setIsChatOpen}
        />
      }
      isChatOpen={isChatOpen}
      isSuccessModalOpen={isSuccessModalOpen}
      onCloseModal={() => setIsSuccessModalOpen(false)}
    >
      <InvoiceForm form={form} setForm={setForm} formikRef={formikInvoiceRef} />
    </FormPageLayout>
  );
};

export default InvoicePage;
