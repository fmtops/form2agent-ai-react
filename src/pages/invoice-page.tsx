import { useEffect, useRef, useState } from "react";
import InvoiceForm from "../components/invoice/invoice-form";
import ChatWindow from "../components/ai-chat/chat-window";
import { InvoiceFormType } from "../models/invoice-model";
import { DescriptionContext } from "../models/invoice-context-model";
import { INVOICE_FORM_VALUES } from "../consts/invoice.consts";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { mergeFormData } from "../utils/invoice.utils";
import { FormikProps } from "formik";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";

const InvoicePage = () => {
  const [form, setForm] = useState(INVOICE_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  useEffect(() => {
    setForm(INVOICE_FORM_VALUES);
  }, []);

  const handleSubmit = () => {
    setForm(INVOICE_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const formikInvoiceRef = useRef<FormikProps<InvoiceFormType>>(null);

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
      ...formikInvoiceRef.current?.values,
    }));
    let responseData = JSON.parse(appData);
    setForm((prevForm) => mergeFormData(prevForm, responseData));
    if (responseData.action) performAction(responseData.action);
  };

  return (
    <AudioProvider>
      <FormPageLayout
        title="Invoice Details"
        subTitle="See how Form2Agent AI manages invoice forms with a dynamic number of item inputs. Upload a photo or a PDF file of your invoice or hold the button to speak with the assistant and quickly add your invoice details."
        onSubmit={handleSubmit}
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription="Add a new invoice to the system."
            formValues={stringifyValues(form)}
            formContext={stringifyValues(DescriptionContext)}
          />
        }
        isSuccessModalOpen={isSuccessModalOpen}
        onCloseModal={() => setIsSuccessModalOpen(false)}
      >
        <InvoiceForm
          form={form}
          setForm={setForm}
          formikRef={formikInvoiceRef}
        />
      </FormPageLayout>
    </AudioProvider>
  );
};

export default InvoicePage;
